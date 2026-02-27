# BFHL API

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and set:

- `OFFICIAL_EMAIL` (your Chitkara email)
- `GEMINI_API_KEY` (from https://aistudio.google.com)
- optional `PORT`, `GEMINI_MODEL`

Run:

```bash
npm start
```

## Project Structure (separate feature files)

- `src/services/fibonacci.service.js`
- `src/services/prime.service.js`
- `src/services/lcm.service.js`
- `src/services/hcf.service.js`
- `src/services/ai.service.js`
- `src/controllers/bfhl.controller.js`
- `src/controllers/health.controller.js`
- `src/routes/bfhl.routes.js`
- `src/routes/health.routes.js`

## Postman Testing

Base URL: `http://localhost:3000`

For all POST requests:

1. Method: `POST`
2. URL: `http://localhost:3000/bfhl`
3. Headers:
   - `Content-Type: application/json`
4. Body tab -> `raw` -> `JSON`

### 1) Fibonacci

Request body:

```json
{
  "fibonacci": 7
}
```

Expected:

```json
{
  "is_success": true,
  "official_email": "YOUR CHITKARA EMAIL",
  "data": [0, 1, 1, 2, 3, 5, 8]
}
```

### 2) Prime filter

Request body:

```json
{
  "prime": [2, 4, 7, 9, 11]
}
```

Expected:

```json
{
  "is_success": true,
  "official_email": "YOUR CHITKARA EMAIL",
  "data": [2, 7, 11]
}
```

### 3) LCM

Request body:

```json
{
  "lcm": [12, 18, 24]
}
```

Expected:

```json
{
  "is_success": true,
  "official_email": "YOUR CHITKARA EMAIL",
  "data": 72
}
```

### 4) HCF

Request body:

```json
{
  "hcf": [24, 36, 60]
}
```

Expected:

```json
{
  "is_success": true,
  "official_email": "YOUR CHITKARA EMAIL",
  "data": 12
}
```

### 5) AI (Gemini)

Request body:

```json
{
  "AI": "What is the capital city of Maharashtra?"
}
```

Expected shape:

```json
{
  "is_success": true,
  "official_email": "YOUR CHITKARA EMAIL",
  "data": "Mumbai"
}
```

Note: AI output is forced to one word, but depends on Gemini response.

## Health Endpoint

Method: `GET`
URL: `http://localhost:3000/health`

Expected:

```json
{
  "is_success": true,
  "official_email": "YOUR CHITKARA EMAIL"
}
```

## Error response shape

```json
{
  "is_success": false,
  "official_email": "YOUR CHITKARA EMAIL",
  "error": "..."
}
```