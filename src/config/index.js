export const env = {
  // Prioritize Cloudflare Pages runtime config, then fallback to Vite env, then localhost
  API_BASE_URL:
    window.__ENV?.CF_API_BASE_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8080/api",
};

// This will be replaced by Cloudflare Pages with the actual runtime values
window.__ENV = {
  CF_API_BASE_URL: "{{CF_API_BASE_URL}}",
};
