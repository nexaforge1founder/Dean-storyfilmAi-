"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Download, Film, Loader2, Play, RefreshCw } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import type { MovieRecord, RenderJob } from "@/lib/types";
import { tokens } from "@/lib/tokens";

type DetailState =
  | { kind: "job"; value: RenderJob }
  | { kind: "movie"; value: MovieRecord };

function isNotFound(error: unknown): boolean {
  return error instanceof ApiError && error.status === 404;
}

export default function MovieJobPage() {
  const params = useParams<{ id: string }>();
  const id = String(params.id || "");
  const [record, setRecord] = useState<DetailState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!id) return;
    let active = true;
    let interval: number | undefined;

    const loadMovie = async (): Promise<MovieRecord> => api.getMovie(id);

    const load = async () => {
      try {
        // Newly submitted productions use job IDs; the Movies library uses movie IDs.
        // These IDs are different resources, so try the job endpoint first and
        // fall back to the movie endpoint only when the job does not exist.
        try {
          const job = await api.getJob(id);
          if (!active) return;
          setRecord({ kind: "job", value: job });
          setError("");
          setLoading(false);
          return job;
        } catch (jobError) {
          if (!isNotFound(jobError)) throw jobError;
        }

        const movie = await loadMovie();
        if (!active) return;
        setRecord({ kind: "movie", value: movie });
        setError("");
        setLoading(false);
        return movie;
      } catch (cause) {
        if (!active) return;
        setError(cause instanceof Error ? cause.message : "Unable to load this production.");
        setLoading(false);
        return null;
      }
    };

    void load().then((initial) => {
      if (!active || !initial || !("job_id" in initial)) return;
      interval = window.setInterval(async () => {
        try {
          const job = await api.getJob(id);
          if (!active) return;
          setRecord({ kind: "job", value: job });
          setError("");
          if (["completed", "failed", "cancelled"].includes(job.status)) {
            if (interval !== undefined) window.clearInterval(interval);
          }
        } catch (cause) {
          if (!active) return;
          setError(cause instanceof Error ? cause.message : "Unable to refresh production status.");
        }
      }, 2500);
    });

    return () => {
      active = false;
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, [id, refreshKey]);

  const videoUrl = useMemo(() => {
    if (!record) return null;
    if (record.kind === "job") {
      return record.value.status === "completed" ? api.jobVideoUrl(id) : null;
    }
    return record.value.video_url || (record.value.status === "ready" || record.value.status === "completed"
      ? api.movieVideoUrl(record.value.movie_id)
      : null);
  }, [record, id]);

  const title = record?.kind === "movie" ? record.value.title : "Production";
  const status = record?.value.status || "—";
  const progress = record?.kind === "job" ? Math.max(0, Math.min(100, Number(record.value.progress || 0))) : null;
  const stage = record?.kind === "job" ? record.value.stage : record?.kind === "movie" ? "Movie library" : "";
  const runtime = record?.kind === "job" ? record.value.runtime : undefined;
  const jobError = record?.kind === "job" ? record.value.error : undefined;

  return (
    <div style={{ height: "100%", overflow: "auto", padding: "clamp(14px, 3vw, 24px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div style={{ minWidth: 0 }}>
          <h1 style={{ fontFamily: tokens.font.display, margin: 0 }}>{title}</h1>
          <p style={{ fontSize: 12, color: tokens.color.textDim, margin: "5px 0 0", overflowWrap: "anywhere" }}>
            {record?.kind === "movie" ? record.value.movie_id : record?.kind === "job" ? record.value.job_id : id}
          </p>
        </div>
        <button
          onClick={() => { setLoading(true); setError(""); setRefreshKey((value) => value + 1); }}
          style={{ display: "flex", gap: 6, alignItems: "center", padding: "8px 12px", background: tokens.color.panel, border: `1px solid ${tokens.color.border}`, color: tokens.color.text, borderRadius: 8 }}
        ><RefreshCw size={13} /> Refresh</button>
      </div>

      {loading && !record && <Loader2 className="ff-spin" style={{ marginTop: 25 }} />}
      {error && <div role="alert" style={{ marginTop: 15, color: tokens.color.crimson, overflowWrap: "anywhere" }}>{error}</div>}

      {record && (
        <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 14 }}>
          <section style={{ minHeight: 300, borderRadius: 12, background: "#08080b", border: `1px solid ${tokens.color.border}`, display: "grid", placeItems: "center", overflow: "hidden" }}>
            {videoUrl ? (
              <video src={videoUrl} controls playsInline style={{ width: "100%", maxHeight: 620, objectFit: "contain" }} />
            ) : (
              <div style={{ textAlign: "center", color: tokens.color.textDim, padding: 24 }}>
                {record.kind === "movie" ? <Film size={30} /> : <Play size={30} />}
                <p>{runtime?.message || stage || status}</p>
                {progress !== null && <b style={{ fontFamily: tokens.font.mono, fontSize: 28 }}>{Math.round(progress)}%</b>}
                {record.kind === "movie" && <p style={{ fontSize: 12 }}>The movie record exists, but a playable video may not have been saved for it.</p>}
              </div>
            )}
          </section>

          <aside style={{ padding: 16, borderRadius: 12, background: tokens.color.panel, border: `1px solid ${tokens.color.border}`, alignSelf: "start" }}>
            <h2 style={{ fontFamily: tokens.font.display, fontSize: 15, marginTop: 0 }}>Production status</h2>
            <div style={{ fontSize: 12, lineHeight: 2, color: tokens.color.textDim, overflowWrap: "anywhere" }}>
              Type: <b style={{ color: tokens.color.text }}>{record.kind === "job" ? "Render job" : "Saved movie"}</b><br />
              Status: <b style={{ color: tokens.color.text }}>{status}</b><br />
              Stage: <b style={{ color: tokens.color.text }}>{stage || "—"}</b><br />
              {record.kind === "job" && <>Scene: <b style={{ color: tokens.color.text }}>{runtime?.scene_index || 0}/{runtime?.total_scenes || record.value.checkpoint?.total_scenes || 0}</b><br />
              Frame: <b style={{ color: tokens.color.text }}>{runtime?.frame || 0}/{runtime?.total_frames || record.value.checkpoint?.total_frames || 0}</b><br />
              Progress: <b style={{ color: tokens.color.text }}>{Math.round(progress || 0)}%</b></>}
            </div>
            {videoUrl && <a href={videoUrl} download style={{ marginTop: 14, display: "flex", justifyContent: "center", alignItems: "center", gap: 7, padding: 9, borderRadius: 8, background: tokens.color.purple, color: "white", textDecoration: "none", fontSize: 12 }}><Download size={14} /> Open finished video</a>}
            {jobError && <div style={{ marginTop: 14, padding: 10, borderRadius: 8, background: `${tokens.color.crimson}12`, color: tokens.color.crimson, fontSize: 11, overflowWrap: "anywhere" }}>{jobError}</div>}
          </aside>
        </div>
      )}
    </div>
  );
}
