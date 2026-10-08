"use client";

import React from "react";
import { tokens } from "@/lib/tokens";

/** The one signature "forge" element — progress reads as heat, not a flat bar. */
export function EmberBar({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div style={{ height: 6, borderRadius: 999, background: tokens.color.border, overflow: "hidden" }}>
      <div
        className={clamped < 100 ? "ember-glow" : undefined}
        style={{
          height: "100%",
          width: `${clamped}%`,
          borderRadius: 999,
          background: `linear-gradient(90deg, ${tokens.color.emberGoldStart}, ${tokens.color.emberEnd})`,
          transition: "width 0.4s ease",
        }}
      />
    </div>
  );
}
