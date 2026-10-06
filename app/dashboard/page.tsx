"use client";
import { useEffect, useState } from "react";
import { Cpu, Film, HardDrive, Activity, CheckCircle2, AlertTriangle } from "lucide-react";
import { tokens } from "@/lib/tokens";
import { api } from "@/lib/api";
import type { HealthResponse, RenderJob, MovieRecord } from "@/lib/types";
function Stat({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) { return <div style={{ flex: "1 1 180px", padding: 16, borderRadius: 12, background: tokens.color.panel, border: `1px solid ${tokens.color.border}` }}><div style={{ display: "flex", gap: 8, alignItems: "center", color: tokens.color.textDim, fontSize: 11.5, textTransform: "uppercase" }}><Icon size={15}/>{label}</div><div style={{ marginTop: 9, font: `600 22px ${tokens.font.mono}`, color: tokens.color.text }}>{value}</div></div> }
export default function DashboardHomePage() {
 const [health,setHealth]=useState<HealthResponse|null>(null); const [jobs,setJobs]=useState<RenderJob[]>([]); const [movies,setMovies]=useState<MovieRecord[]>([]); const [error,setError]=useState<string|null>(null);
 useEffect(()=>{ let live=true; const load=async()=>{try{const [h,j,m]=await Promise.all([api.health(),api.listJobs(20),api.listMovies(20)]); if(live){setHealth(h);setJobs(j.jobs);setMovies(m.movies);setError(null)}}catch(e){if(live)setError(e instanceof Error?e.message:"Could not reach backend.")}}; load(); const t=window.setInterval(load,5000); return()=>{live=false;window.clearInterval(t)}},[]);
 const active=jobs.filter(j=>j.status==="queued"||j.status==="rendering").length;
 return <div style={{padding:"clamp(14px,3vw,24px)",overflow:"auto",height:"100%"}}>
  <h1 style={{fontFamily:tokens.font.display,fontSize:24,margin:"0 0 4px"}}>Home</h1>
  <p style={{fontSize:13,color:tokens.color.textDim,margin:"0 0 20px"}}>{error?`Backend error: ${error}`:health?health.ready?"Production backend ready · CPU-only · LuxCore CPU":"Backend online but one or more production dependencies are unavailable.":"Connecting to Dean StoryFilm AI…"}</p>
  <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:24}}><Stat icon={Cpu} label="Backend readiness" value={health?`${health.readiness_percent}%`:"—"}/><Stat icon={Activity} label="Active jobs" value={String(active)}/><Stat icon={HardDrive} label="Queue" value={health?String(health.queue_depth):"—"}/><Stat icon={Film} label="Movies" value={String(movies.length)}/></div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
   <section style={{padding:16,borderRadius:12,background:tokens.color.panel,border:`1px solid ${tokens.color.border}`}}><h2 style={{fontFamily:tokens.font.display,fontSize:15,margin:"0 0 12px"}}>Production services</h2>{health&&Object.entries(health.readiness_checks).map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",fontSize:12,color:tokens.color.textDim}}><span>{k.replace("_"," ")}</span>{v?<CheckCircle2 size={15} color={tokens.color.emerald}/>:<AlertTriangle size={15} color={tokens.color.crimson}/>}</div>)}</section>
   <section style={{padding:16,borderRadius:12,background:tokens.color.panel,border:`1px solid ${tokens.color.border}`}}><h2 style={{fontFamily:tokens.font.display,fontSize:15,margin:"0 0 12px"}}>Recent jobs</h2>{jobs.slice(0,5).map(j=><div key={j.job_id} style={{padding:"8px 0",borderBottom:`1px solid ${tokens.color.border}`,fontSize:12}}><b>{j.job_id.slice(0,8)}</b> · {j.stage||j.status} · {Math.round(j.progress)}%</div>)}{!jobs.length&&<span style={{fontSize:12,color:tokens.color.textFaint}}>No jobs yet.</span>}</section>
  </div>
 </div>
}
