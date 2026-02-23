# Railway Deploy (Backend) + GitHub Pages (Frontend)

## 1) Deploy backend to Railway

- Create a new Railway project from this repository.
- Service type: Node.js.
- Build command: `npm install`
- Start command: `npm start`

The project already contains:
- `railway.json`
- `package.json` script: `"start": "node server/index.js"`

## 2) Set Railway Variables

Copy and fill these variables in Railway service settings:

```env
PORT=4000
YOOKASSA_SHOP_ID=your_shop_id
YOOKASSA_SECRET_KEY=your_secret_key
LLM_API_URL=https://openrouter.ai/api/v1/chat/completions
LLM_MODEL=openai/gpt-4o-mini
LLM_API_KEY=your_llm_api_key
APP_RETURN_URL=https://borisgadaborshev.github.io/?yookassaReturn=1
```

Then verify backend:
- `GET https://<your-railway-domain>.up.railway.app/api/health`

## 3) Configure frontend for production

Set in `.env.production`:

```env
VITE_APP_MODE=prompt-check
VITE_API_BASE_URL=https://<your-railway-domain>.up.railway.app
```

## 4) Build and publish frontend

```bash
npm run build
git add -A
git commit -m "Configure production API base URL for Railway backend"
git push
```

`docs/` is the published static bundle for GitHub Pages.
