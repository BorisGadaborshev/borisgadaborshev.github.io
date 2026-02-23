require('dotenv/config');
const crypto = require('node:crypto');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function yookassaAuthHeader() {
  const shopId = requireEnv('YOOKASSA_SHOP_ID');
  const secretKey = requireEnv('YOOKASSA_SECRET_KEY');
  const token = Buffer.from(`${shopId}:${secretKey}`).toString('base64');
  return `Basic ${token}`;
}

function json(res, status, body) {
  res.status(status).json(body);
}

const PROMPT_QUALITY_SYSTEM_PROMPT = `Ты senior AI Prompt Engineer.
Твоя задача: оценить качество пользовательского промпта и вернуть структурированную обратную связь.

Правила анализа:
1) Оцени промпт по шкале 0-100.
2) Дай короткий вердикт в 1 предложении (на русском).
3) Опиши слабые стороны в 2-4 коротких абзацах (на русском).
4) Дай 4 точечных рекомендации по улучшению (каждая рекомендация с новой строки).
5) Сформируй улучшенный вариант промпта на русском, сохраняя изначальную задачу пользователя.
6) Не придумывай факты, которых нет в промпте.
7) Ответ верни ТОЛЬКО валидным JSON без markdown и пояснений.

Формат JSON:
{
  "score": <number 0..100>,
  "verdict": "<string>",
  "weaknesses": "<string>",
  "recommendations": ["<string>", "<string>", "<string>", "<string>"],
  "improvedPrompt": "<string>"
}`;

function aiAuthHeader() {
  const token = requireEnv('LLM_API_KEY') || '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';
  return `Bearer ${token}`;
}

function getAiConfig() {
  return {
    url: process.env.LLM_API_URL || 'https://openrouter.ai/api/v1/chat/completions',
    model: process.env.LLM_MODEL || 'openai/gpt-4o-mini',
  };
}

function extractJsonPayload(rawContent) {
  const trimmed = String(rawContent || '').trim();
  if (!trimmed) return null;

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = fenced ? fenced[1] : trimmed;
  const firstBrace = candidate.indexOf('{');
  const lastBrace = candidate.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) return null;

  const maybeJson = candidate.slice(firstBrace, lastBrace + 1);
  try {
    return JSON.parse(maybeJson);
  } catch {
    return null;
  }
}

app.get('/api/health', (_req, res) => {
  json(res, 200, {
    ok: true,
    llmConfigured: Boolean(process.env.LLM_API_KEY),
    llmUrlConfigured: Boolean(process.env.LLM_API_URL),
    llmModelConfigured: Boolean(process.env.LLM_MODEL),
    yooKassaConfigured: Boolean(process.env.YOOKASSA_SHOP_ID && process.env.YOOKASSA_SECRET_KEY),
  });
});

app.get('/', (_req, res) => {
  json(res, 200, {
    ok: true,
    service: 'livpic-api',
    health: '/api/health',
  });
});

app.post('/api/prompt-quality/analyze', async (req, res) => {
  try {
    const inputPrompt = typeof req.body?.prompt === 'string' ? req.body.prompt.trim() : '';
    if (!inputPrompt) {
      return json(res, 400, { error: 'bad_request', message: 'Prompt is required.' });
    }

    const { url, model } = getAiConfig();

    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: aiAuthHeader(),
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          { role: 'system', content: PROMPT_QUALITY_SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Оцени этот промпт и верни JSON по формату:\n\n${inputPrompt}`,
          },
        ],
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      return json(res, resp.status, { error: 'llm_error', details: data });
    }

    const content = data?.choices?.[0]?.message?.content;
    const parsed = extractJsonPayload(content);
    if (!parsed) {
      return json(res, 502, {
        error: 'invalid_llm_response',
        message: 'LLM response is not valid JSON.',
        raw: content,
      });
    }

    const score = Number(parsed?.score);
    const verdict = typeof parsed?.verdict === 'string' ? parsed.verdict : '';
    const weaknesses = typeof parsed?.weaknesses === 'string' ? parsed.weaknesses : '';
    const recommendations = Array.isArray(parsed?.recommendations)
      ? parsed.recommendations.filter((x) => typeof x === 'string').slice(0, 6)
      : [];
    const improvedPrompt =
      typeof parsed?.improvedPrompt === 'string' ? parsed.improvedPrompt : '';

    return json(res, 200, {
      score: Number.isFinite(score) ? Math.max(0, Math.min(100, score)) : 0,
      verdict,
      weaknesses,
      recommendations,
      improvedPrompt,
    });
  } catch (e) {
    return json(res, 500, { error: 'server_error', message: e?.message || String(e) });
  }
});

app.post('/api/yookassa/create-payment', async (req, res) => {
  try {
    const amount = typeof req.body?.amount === 'string' ? req.body.amount : '10.00';
    const description =
      typeof req.body?.description === 'string' ? req.body.description : 'Liv Pic — тестовая оплата';

    // Return URL must be on your frontend domain.
    const returnUrl =
      typeof req.body?.returnUrl === 'string'
        ? req.body.returnUrl
        : process.env.APP_RETURN_URL || 'http://localhost:3000/?yookassaReturn=1';

    const idempotenceKey = crypto.randomUUID();

    const payload = {
      amount: { value: amount, currency: 'RUB' },
      capture: true,
      description,
      confirmation: {
        type: 'redirect',
        return_url: returnUrl,
      },
    };

    const resp = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': idempotenceKey,
        Authorization: yookassaAuthHeader(),
      },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();
    if (!resp.ok) {
      return json(res, resp.status, { error: 'yookassa_error', details: data });
    }

    const confirmationUrl = data?.confirmation?.confirmation_url;
    const paymentId = data?.id;
    if (!confirmationUrl || !paymentId) {
      return json(res, 500, { error: 'unexpected_yookassa_response', details: data });
    }

    return json(res, 200, { paymentId, confirmationUrl, status: data.status });
  } catch (e) {
    return json(res, 500, { error: 'server_error', message: e?.message || String(e) });
  }
});

app.get('/api/yookassa/payments/:id', async (req, res) => {
  try {
    const paymentId = req.params.id;

    const resp = await fetch(`https://api.yookassa.ru/v3/payments/${paymentId}`, {
      headers: {
        Authorization: yookassaAuthHeader(),
      },
    });
    const data = await resp.json();
    if (!resp.ok) {
      return json(res, resp.status, { error: 'yookassa_error', details: data });
    }

    return json(res, 200, {
      id: data.id,
      status: data.status,
      paid: data.paid,
      amount: data.amount,
      description: data.description,
    });
  } catch (e) {
    return json(res, 500, { error: 'server_error', message: e?.message || String(e) });
  }
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[server] listening on http://localhost:${port}`);
});

