# AI Software Factory Demo

A small task-list app built with React and Vite, with an Express health endpoint.

## Project structure

```text
frontend/
  src/
  tests/
backend/
  src/
  tests/
package.json
jest.config.js
.github/workflows/ci.yml
```

## Run locally

```bash
npm install
npm run dev
```

The frontend is served at `http://localhost:5173`. To run the API separately,
start a second terminal and run `npm run start:backend`; the endpoint is
available at `http://localhost:3001/api/health`.

Run tests with `npm test` and create a production frontend build with
`npm run build`.
