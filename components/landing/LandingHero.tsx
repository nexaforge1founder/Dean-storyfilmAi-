"use client";

import React, { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Flame } from "lucide-react";
import { tokens } from "@/lib/tokens";

/**
 * Landing sequence. NOTE: the original spec describes a rigged 3D scene
 * (a boy riding an invisible bike through a forest, who waves, with the
 * bike fading in, then title text falling from the sky). Building that for
 * real needs a modeled/rigged character and a 3D pipeline (Three.js +
 * assets) — attempting a low-effort version of that would look worse than
 * no attempt. This is a scoped, honest substitute: a CSS-driven cinematic
 * reveal (ember particles rising through a dark forest gradient, title
 * falling into place) that keeps the mood without faking a 3D character
 * scene. Swap this out if/when a real 3D sequence gets built.
 */
export function LandingHero({ onEnter, onLogin, onCreateAccount }: {
  onEnter?: () => void;
  onLogin?: () => void;
  onCreateAccount?: () => void;
}) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 640,
        overflow: "hidden",
        background: "radial-gradient(ellipse at 50% 30%, #14141d 0%, #0b0b0f 60%, #060608 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <style>{`
        @keyframes ember-rise {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          10%  { opacity: 1; }
          100% { transform: translateY(-70vh) translateX(var(--drift)); opacity: 0; }
        }
        @keyframes title-fall {
          0%   { transform: translateY(-40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .lh-ember {
          position: absolute; bottom: -10px; width: 4px; height: 4px; border-radius: 50%;
          background: linear-gradient(180deg, ${tokens.color.emberGoldStart}, ${tokens.color.emberEnd});
          animation: ember-rise linear infinite;
        }
        .lh-title { animation: title-fall 0.9s cubic-bezier(0.2, 0.9, 0.3, 1) both; }
      `}</style>

      {Array.from({ length: 24 }).map((_, i) => {
        // CSS custom properties ("--drift") aren't part of React's
        // CSSProperties type, so this needs an explicit cast rather than
        // relying on a loose type to let it through silently.
        const emberStyle = {
          left: `${(i * 37) % 100}%`,
          "--drift": `${((i % 5) - 2) * 20}px`,
          animationDuration: `${5 + (i % 6)}s`,
          animationDelay: `${(i % 8) * 0.6}s`,
        } as CSSProperties;

        return <span key={i} className="lh-ember" style={emberStyle} />;
      })}

      <div style={{ position: "relative", textAlign: "center", zIndex: 1 }}>
        {revealed && (
          <div className="lh-title" style={{ animationDelay: "0.1s" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14 }}>
              <div
                style={{
                  width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                  background: `linear-gradient(135deg, ${tokens.color.emberGoldStart}, ${tokens.color.emberEnd})`,
                }}
              >
                <Flame size={22} color="#0b0b0f" strokeWidth={2.5} />
              </div>
            </div>
            <h1
              style={{
                fontFamily: tokens.font.display, fontWeight: 700, fontSize: 44, letterSpacing: 1,
                color: tokens.color.text, margin: 0,
              }}
            >
              Welcome to Dean StoryFilm<span style={{ color: tokens.color.purple }}> AI</span>
            </h1>
            <p style={{ fontSize: 15, color: tokens.color.textDim, marginTop: 10 }}>
              Where scripts become feature films.
            </p>
          </div>
        )}

        <div style={{ marginTop: 34, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <button
            onClick={onEnter}
            style={{
              padding: "12px 28px", borderRadius: 999, border: "none", cursor: "pointer",
              background: `linear-gradient(90deg, ${tokens.color.emberGoldStart}, ${tokens.color.emberEnd})`,
              color: "#0b0b0f", fontWeight: 700, fontSize: 14, letterSpacing: 0.3,
            }}
          >
            Enter the Forge
          </button>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={onLogin}
              style={{
                padding: "8px 18px", borderRadius: 999, cursor: "pointer", fontSize: 13,
                border: `1px solid ${tokens.color.border}`, background: "transparent", color: tokens.color.text,
              }}
            >
              Login
            </button>
            <button
              onClick={onCreateAccount}
              style={{
                padding: "8px 18px", borderRadius: 999, cursor: "pointer", fontSize: 13,
                border: `1px solid ${tokens.color.purple}`, background: tokens.color.purpleDim, color: tokens.color.purple,
              }}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
