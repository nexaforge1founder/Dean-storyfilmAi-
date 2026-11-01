"use client";
import { useCallback, useEffect, useState } from "react";
import { api, ApiError } from "@/lib/api";
import type { AudioAsset } from "@/lib/types";
import { tokens } from "@/lib/tokens";
import { RefreshCw, Upload, Music2, Loader2, AlertTriangle } from "lucide-react";

export default function AssetsPage() {
  const [assets, setAssets] = useState<AudioAsset[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [kind, setKind] = useState("sound_effect");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const load = useCallback(async () => {
    setLoading(true); setError("");
    try { const result = await api.listAudio(); setAssets(result.assets || []); }
    catch (e) { setError(e instanceof Error ? e.message : "Could not load audio assets."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  async function upload() {
    if (!file) { setError("Choose an audio file first."); return; }
    setBusy(true); setError(""); setNotice("");
    try { await api.uploadAudio(file, kind, "private", false, description); setFile(null); setDescription(""); setNotice("Audio asset saved to your private memory."); await load(); }
    catch (e) { setError(e instanceof ApiError ? `${e.message}${e.status ? ` (HTTP ${e.status})` : ""}` : "Upload failed."); }
    finally { setBusy(false); }
  }
  const panel: React.CSSProperties = { padding: 16, borderRadius: 12, background: tokens.color.panel, border: `1px solid ${tokens.color.border}`, marginBottom: 14 };
  const field: React.CSSProperties = { width: "100%", padding: 10, borderRadius: 8, border: `1px solid ${tokens.color.border}`, background: "#0b0b0f", color: tokens.color.text, marginTop: 6 };
  return <div style={{ padding: "clamp(14px,3vw,24px)", height: "100%", overflow: "auto" }}>
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" }}><div><h1 style={{ fontFamily: tokens.font.display, marginBottom: 4 }}>Assets</h1><p style={{ color: tokens.color.textDim, fontSize: 13 }}>Upload and manage private audio used in productions.</p></div><button onClick={() => void load()} style={{ padding: 9, borderRadius: 8, background: tokens.color.panel, color: tokens.color.text, border: `1px solid ${tokens.color.border}`, display: "flex", gap: 7, alignItems: "center" }}><RefreshCw size={14}/> Refresh</button></div>
    <section style={panel}><h2 style={{ fontSize: 15, marginTop: 0 }}>Upload audio asset</h2><label style={{ display: "block", fontSize: 12 }}>Audio file<input type="file" accept="audio/*,.wav,.mp3,.m4a,.ogg,.flac" onChange={e => setFile(e.target.files?.[0] || null)} style={field}/></label><label style={{ display: "block", fontSize: 12, marginTop: 12 }}>Asset type<select value={kind} onChange={e => setKind(e.target.value)} style={field}><option value="voice">Voice</option><option value="music">Music</option><option value="sound_effect">Sound effect</option><option value="ambience">Ambience</option></select></label><label style={{ display: "block", fontSize: 12, marginTop: 12 }}>Description<input value={description} onChange={e => setDescription(e.target.value)} maxLength={1000} placeholder="Optional description" style={field}/></label><button disabled={busy || !file} onClick={() => void upload()} style={{ marginTop: 14, padding: "10px 14px", border: 0, borderRadius: 8, background: busy || !file ? tokens.color.border : tokens.color.purple, color: "white", display: "flex", gap: 8, alignItems: "center" }}>{busy ? <Loader2 size={15} className="ff-spin"/> : <Upload size={15}/>} {busy ? "Uploading…" : "Upload to private memory"}</button><p style={{ fontSize: 11, color: tokens.color.textDim }}>The backend limit is 200 MB per audio file. Assets are private by default.</p></section>
    {error && <p role="alert" style={{ color: tokens.color.crimson, overflowWrap: "anywhere" }}><AlertTriangle size={14} style={{ display: "inline", marginRight: 6 }}/>{error}</p>}{notice && <p role="status" style={{ color: tokens.color.emerald }}>{notice}</p>}
    <section style={panel}><h2 style={{ fontSize: 15, marginTop: 0 }}>Your audio assets</h2>{loading ? <Loader2 className="ff-spin"/> : assets.length === 0 ? <p style={{ color: tokens.color.textDim, fontSize: 13 }}>No audio assets found. Upload a voice, music track, sound effect, or ambience file above.</p> : <div style={{ display: "grid", gap: 8 }}>{assets.map(a => <div key={a.asset_id} style={{ display: "flex", gap: 10, alignItems: "center", padding: 11, border: `1px solid ${tokens.color.border}`, borderRadius: 9, minWidth: 0 }}><Music2 size={18} color={tokens.color.purple}/><div style={{ minWidth: 0, flex: 1 }}><b style={{ display: "block", overflowWrap: "anywhere", fontSize: 13 }}>{a.filename}</b><span style={{ color: tokens.color.textDim, fontSize: 11 }}>{a.type || "audio"} · {a.visibility || "private"} · {a.size_bytes ? `${(a.size_bytes / 1048576).toFixed(1)} MB` : "size unavailable"}</span>{typeof a.description === "string" && a.description.length > 0 && <p style={{ margin: "4px 0 0", fontSize: 11, color: tokens.color.textDim }}>{a.description}</p>}</div></div>)}</div>}</section>
  </div>;
}
