import 'dotenv/config';
import crypto from 'node:crypto';
import express from 'express';
import cors from 'cors';

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

app.get('/api/health', (_req, res) => {
  json(res, 200, { ok: true });
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

