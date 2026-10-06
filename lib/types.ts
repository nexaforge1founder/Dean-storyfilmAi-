export type RenderStatus = "queued" | "rendering" | "completed" | "failed" | "paused";

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
  cpu_only: boolean;
  ready: boolean;
  readiness_percent: number;
  readiness_checks: { blender: boolean; ffmpeg: boolean; luxcore: boolean; mongodb: boolean; audio_memory: boolean };
  blender_available: boolean;
  ffmpeg_available: boolean;
  luxcore_requested: boolean;
  luxcore_available: boolean;
  luxcore_version?: string | null;
  luxcore_error?: string | null;
  mongodb_available: boolean;
  audio_memory_available: boolean;
  mongodb_required: boolean;
  adaptive_worker_count: number;
  active_workers: number;
  queue_depth: number;
  worker_memory_budget_mb: number;
  heartbeat_seconds: number;
  blender_hang_timeout_seconds: number;
  blender_scene_timeout_seconds: number;
}

export const AVAILABLE_STYLES = [
  { key: "anime", label: "Japanese Anime" },
  { key: "hybrid_anime_cinematic", label: "Hybrid Anime + Cinematic" },
  { key: "aurora_stylized", label: "Aurora Stylized" },
  { key: "semi_realistic", label: "Semi Realistic" },
  { key: "custom", label: "Custom" },
] as const;
export type StyleKey = (typeof AVAILABLE_STYLES)[number]["key"];

export interface CharacterInput {
  character_id: string;
  action?: string;
  emotion?: string;
  intensity?: number;
  dialogue?: string;
  reference_asset_ids?: string[];
}
export interface SceneInput {
  scene_id?: string;
  duration_seconds?: number;
  environment?: string;
  lighting?: string;
  characters?: CharacterInput[];
  prompt?: string;
  description?: string;
}
export interface ProductionScript {
  title: string;
  style: StyleKey | string;
  scenes: SceneInput[];
  duration_seconds?: number;
  fps?: number;
  audio?: Record<string, unknown>;
}
export interface V5GenerateRequest { script: ProductionScript; generation_mode?: "2d" | "3d"; fps?: number; }
export interface GenerateMovieResult { success?: boolean; job_id?: string; video_path?: string; video_url?: string; error?: string; [key: string]: unknown; }

export interface RenderJob {
  job_id: string;
  owner_id?: string | null;
  status: RenderStatus;
  progress: number;
  stage?: string;
  runtime?: {
    message?: string;
    emotion?: string;
    scene_id?: string | null;
    scene_index?: number | null;
    total_scenes?: number | null;
    shot?: number | null;
    total_shots?: number | null;
    frame?: number | null;
    total_frames?: number | null;
    heartbeat_at?: string;
  };
  checkpoint?: { completed_scene_ids?: string[]; completed_scenes?: number; total_scenes?: number; current_scene_id?: string | null; current_frame?: number; total_frames?: number };
  result?: Record<string, unknown> | null;
  error?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CreateJobResponse { job_id: string; status: "queued"; product: string; estimated_duration_minutes: number; scene_count: number; worker_capacity: number; }
export interface MovieRecord { movie_id: string; owner_id?: string | null; title: string; status?: string; video_url?: string; duration_seconds?: number; created_at?: string; updated_at?: string; [key: string]: unknown; }
export interface AudioAsset { asset_id: string; filename: string; type?: string; duration_seconds?: number; size_bytes?: number; [key: string]: unknown; }
