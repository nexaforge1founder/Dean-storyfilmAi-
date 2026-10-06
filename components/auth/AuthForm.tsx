"use client";
import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight, Loader2, Flame } from "lucide-react";
import { tokens } from "@/lib/tokens";
import { setUserId } from "@/lib/api";
export type AuthMode = "login" | "register" | "forgot-password";
const COPY: Record<AuthMode, { title: string; subtitle: string; cta: string }> = {
  login: { title: "Welcome back", subtitle: "Continue to your private StoryFilm workspace.", cta: "Enter workspace" },
  register: { title: "Create your workspace", subtitle: "Start forging your first story.", cta: "Create workspace" },
  "forgot-password": { title: "Password recovery", subtitle: "Account recovery will be available when server authentication is enabled.", cta: "Continue" },
};
export function AuthForm({ mode, onSuccess }: { mode: AuthMode; onSuccess?: () => void }) {
  const [username, setUsername] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [loading, setLoading] = useState(false); const [error, setError] = useState<string | null>(null);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setError(null);
    if (mode !== "forgot-password" && !username.trim()) return setError("Username is required.");
    if (mode === "register" && !email.trim()) return setError("Email is required.");
    if (mode !== "forgot-password" && password.length < 8) return setError("Use at least 8 characters.");
    setLoading(true);
    try {
      // The current production backend intentionally has no /auth routes. Until
      // server authentication is introduced, create a stable private workspace ID
      // so every job is still owner-scoped through X-User-ID.
      const seed = username.trim().toLowerCase();
      const bytes = new TextEncoder().encode(seed); let hash = 2166136261;
      for (const b of bytes) hash = Math.imul(hash ^ b, 16777619);
      setUserId(`local-${(hash >>> 0).toString(16)}-${username.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 24)}`);
      onSuccess?.();
    } catch { setError("Could not create the workspace."); } finally { setLoading(false); }
  }
  const copy = COPY[mode];
  return <div style={{ width: "min(92vw, 380px)", padding: 28, borderRadius: 14, background: "rgba(20,20,25,.85)", backdropFilter: "blur(16px)", border: `1px solid ${tokens.color.border}`, boxShadow: "0 20px 60px rgba(0,0,0,.4)" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}><div style={{ width: 26, height: 26, borderRadius: 7, display: "grid", placeItems: "center", background: `linear-gradient(135deg, ${tokens.color.emberGoldStart}, ${tokens.color.emberEnd})` }}><Flame size={15} color="#0b0b0f" /></div><b style={{ fontFamily: tokens.font.display }}>STORY FORGE<span style={{ color: tokens.color.purple }}>.AI</span></b></div>
    <h1 style={{ fontFamily: tokens.font.display, fontSize: 20, margin: "0 0 4px" }}>{copy.title}</h1><p style={{ fontSize: 12.5, color: tokens.color.textDim, margin: "0 0 20px" }}>{copy.subtitle}</p>
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {mode !== "forgot-password" && <Field icon={User} placeholder="Username" value={username} onChange={setUsername} />}
      {(mode === "register" || mode === "forgot-password") && <Field icon={Mail} placeholder="Email" type="email" value={email} onChange={setEmail} />}
      {mode !== "forgot-password" && <Field icon={Lock} placeholder="Password" type="password" value={password} onChange={setPassword} />}
      {error && <div role="alert" style={{ fontSize: 12, color: tokens.color.crimson, background: `${tokens.color.crimson}14`, border: `1px solid ${tokens.color.crimson}33`, borderRadius: 8, padding: "8px 10px" }}>{error}</div>}
      <button type="submit" disabled={loading} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginTop: 6, padding: "10px 14px", borderRadius: 9, border: 0, background: loading ? tokens.color.borderLight : tokens.color.purple, color: "#fff", fontWeight: 600, cursor: loading ? "default" : "pointer" }}>{loading ? <Loader2 size={15} className="ff-spin" /> : <>{copy.cta} <ArrowRight size={15} /></>}</button>
    </form>
  </div>;
}
function Field({ icon: Icon, placeholder, value, onChange, type = "text" }: { icon: React.ElementType; placeholder: string; value: string; onChange: (v: string) => void; type?: string }) { return <label style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 9, border: `1px solid ${tokens.color.border}`, background: tokens.color.panel }}><Icon size={14} color={tokens.color.textFaint} /><input required value={value} type={type} placeholder={placeholder} onChange={e => onChange(e.target.value)} style={{ width: "100%", background: "transparent", border: 0, outline: 0, color: tokens.color.text, fontSize: 13 }} /></label>; }
