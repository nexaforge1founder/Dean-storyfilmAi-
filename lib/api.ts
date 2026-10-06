import type { AudioAsset, CreateJobResponse, GenerateMovieResult, HealthResponse, MovieRecord, RenderJob, V5GenerateRequest } from "./types";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://dean-storyfilmai-backend.onrender.com").replace(/\/$/, "");
const USER_KEY = "dean_storyfilm_user_id";

export function getUserId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(USER_KEY);
}
export function setUserId(id: string): void {
  if (typeof window !== "undefined") window.localStorage.setItem(USER_KEY, id);
}
export function clearUserId(): void {
  if (typeof window !== "undefined") window.localStorage.removeItem(USER_KEY);
}

export class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(message: string, status: number, body?: unknown) { super(message); this.name = "ApiError"; this.status = status; this.body = body; }
}

async function request<T>(path: string, init: RequestInit = {}, options: { user?: boolean } = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (options.user !== false) {
    const userId = getUserId();
    if (userId) headers.set("X-User-ID", userId);
  }
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 30000);
  try {
    const res = await fetch(`${API_BASE}${path}`, { ...init, headers, signal: init.signal ?? controller.signal, cache: "no-store" });
    const text = await res.text();
    let body: any = {};
    try { body = text ? JSON.parse(text) : {}; } catch { body = { raw: text }; }
    if (!res.ok) throw new ApiError(body?.detail || body?.error || res.statusText || "Request failed", res.status, body);
    return body as T;
  } catch (e) {
    if (e instanceof ApiError) throw e;
    if (e instanceof DOMException && e.name === "AbortError") throw new ApiError("The request timed out. The render job may still be running; check the Render Queue.", 408);
    throw new ApiError(e instanceof Error ? e.message : "Network request failed.", 0);
  } finally { window.clearTimeout(timeout); }
}

export const api = {
  baseUrl: API_BASE,
  health: () => request<HealthResponse>("/health", {}, { user: false }),
  createMovieJob: (payload: { title: string; script: V5GenerateRequest["script"]; fps?: number }) => request<CreateJobResponse>("/jobs/movie", { method: "POST", body: JSON.stringify(payload) }),
  createNovelJob: (payload: { title?: string; text: string; genre?: string; content_type?: string; target_minutes?: number; fps?: number }) => request<CreateJobResponse>("/jobs/novel", { method: "POST", body: JSON.stringify(payload) }),
  listJobs: (limit = 50) => request<{ jobs: RenderJob[] }>(`/jobs?limit=${limit}`),
  getJob: (jobId: string) => request<RenderJob>(`/jobs/${encodeURIComponent(jobId)}`),
  jobEventsUrl: (jobId: string) => `${API_BASE}/jobs/${encodeURIComponent(jobId)}/events`,
  jobVideoUrl: (jobId: string) => `${API_BASE}/jobs/${encodeURIComponent(jobId)}/video`,
  listMovies: (limit = 50) => request<{ movies: MovieRecord[]; persistent: boolean }>(`/movies?limit=${limit}`),
  getMovie: (movieId: string) => request<MovieRecord>(`/movies/${encodeURIComponent(movieId)}`),
  movieVideoUrl: (movieId: string) => `${API_BASE}/movies/${encodeURIComponent(movieId)}/video`,
  uploadAudio: async (file: File, assetType = "sound_effect") => {
    const form = new FormData(); form.append("file", file); form.append("asset_type", assetType);
    return request<AudioAsset>("/audio/assets", { method: "POST", body: form });
  },
  listAudio: (type?: string) => request<{ assets: AudioAsset[] }>(`/audio/assets${type ? `?asset_type=${encodeURIComponent(type)}` : ""}`),
  analyzeStory: (payload: { text: string; title?: string; genre?: string; target_minutes?: number; fps?: number }) => request<{ success: boolean; analysis: V5GenerateRequest["script"] }>("/analyze/story", { method: "POST", body: JSON.stringify(payload) }),
  // Kept for compatibility with older UI code; new generation uses /jobs/movie.
  generateMovieV5: (payload: V5GenerateRequest) => api.createMovieJob({ title: payload.script.title, script: payload.script, fps: payload.fps || 24 }) as unknown as Promise<GenerateMovieResult>,
};
