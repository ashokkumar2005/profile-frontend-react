// Base URL: use VITE_API_URL from .env if set, else fallback to localhost:5000
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export { BASE_URL };

// Helper: fetch with a timeout so loading never hangs forever
const fetchWithTimeout = async (url, options = {}, timeoutMs = 8000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
};

// GET USERS (profile data for public homepage)
export const getUsers = async () => {
  const res = await fetchWithTimeout(`${BASE_URL}/api/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

// GET PROJECTS
export const getProjects = async () => {
  const res = await fetchWithTimeout(`${BASE_URL}/api/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};

// LOGIN
export const loginUser = async (data) => {
  const res = await fetchWithTimeout(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};
