const { geminiApiKey, geminiModel } = require("../config/env");
const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com";
const API_VERSIONS = ["v1", "v1beta"];
const DISCOVERY_TTL_MS = 10 * 60 * 1000;
const modelDiscoveryCache = {
  expiresAt: 0,
  plans: [],
};

const buildHttpError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const normalizeModelName = (name) => name.replace(/^models\//, "");

const getPreferredModels = (models) => {
  const unique = [...new Set(models)];
  const configured = unique.find((model) => model === geminiModel);
  const flash = unique.find((model) => /flash/i.test(model));
  const first = unique[0];
  return [configured, flash, first].filter((model, index, arr) => model && arr.indexOf(model) === index);
};

const discoverModelPlans = async () => {
  if (Date.now() < modelDiscoveryCache.expiresAt && modelDiscoveryCache.plans.length > 0) {
    return modelDiscoveryCache.plans;
  }

  const plans = [];
  for (const version of API_VERSIONS) {
    const listEndpoint = `${GEMINI_BASE_URL}/${version}/models?key=${geminiApiKey}`;
    const response = await fetch(listEndpoint);
    if (!response.ok) {
      continue;
    }

    const payload = await response.json();
    const compatible = (payload.models || [])
      .filter((model) => (model.supportedGenerationMethods || []).includes("generateContent"))
      .map((model) => normalizeModelName(model.name));
    const preferred = getPreferredModels(compatible);
    preferred.forEach((model) => plans.push({ version, model }));
  }

  if (plans.length > 0) {
    modelDiscoveryCache.expiresAt = Date.now() + DISCOVERY_TTL_MS;
    modelDiscoveryCache.plans = plans;
    return plans;
  }

  return [];
};

const createFallbackPlans = () => {
  const modelsToTry = [geminiModel, "gemini-2.0-flash", "gemini-1.5-flash"].filter(
    (value, index, arr) => value && arr.indexOf(value) === index
  );
  const plans = [];
  API_VERSIONS.forEach((version) => {
    modelsToTry.forEach((model) => {
      plans.push({ version, model });
    });
  });
  return plans;
};

const getGenerationPlans = async () => {
  const discovered = await discoverModelPlans();
  const fallback = createFallbackPlans();
  const combined = [...discovered, ...fallback];
  return combined.filter(
    (plan, index, arr) =>
      arr.findIndex((p) => p.version === plan.version && p.model === plan.model) === index
  );
};

const getSingleWordAIResponse = async (question) => {
  if (typeof question !== "string" || !question.trim()) {
    throw buildHttpError("AI must be a non-empty question string", 400);
  }

  if (!geminiApiKey) {
    throw buildHttpError("GEMINI_API_KEY is not configured", 500);
  }

  const prompt = `Answer with exactly one word. Question: ${question}`;
  const generationPlans = await getGenerationPlans();
  let lastError = "Gemini request failed";
  let lastStatusCode = 502;

  for (const plan of generationPlans) {
    const endpoint = `${GEMINI_BASE_URL}/${plan.version}/models/${plan.model}:generateContent?key=${geminiApiKey}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0 },
      }),
    });

    if (!response.ok) {
      lastStatusCode = response.status;
      const errorBody = await response.text();
      if (response.status === 429) {
        lastError = "Gemini quota exceeded. Retry after a minute or use a key/project with available quota.";
      } else if (response.status === 404) {
        lastError = "Requested Gemini model is unavailable for this API version/key.";
      } else {
        lastError = `Gemini request failed with status ${response.status}: ${errorBody}`;
      }
      continue;
    }

    const result = await response.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text || typeof text !== "string") {
      throw new Error("Invalid response from Gemini API");
    }

    return text.trim().split(/\s+/)[0];
  }

  throw buildHttpError(`Gemini API error: ${lastError}`, lastStatusCode);
};

module.exports = {
  getSingleWordAIResponse,
};
