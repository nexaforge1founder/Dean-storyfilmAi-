"use client";

import React from "react";
import { Flame, Cpu, Layers } from "lucide-react";
import { tokens } from "@/lib/tokens";
import { AVAILABLE_STYLES, type StyleKey } from "@/lib/types";

export interface TopBarProps {
  projectName: string;
  style: StyleKey | string;
  /**
   * NOT YET ON BACKEND: /health reports blender/ffmpeg install status, not
   * live CPU/RAM load. Pass real numbers once such an endpoint exists;
   * until then these are optional and default to a neutral placeholder
   * rather than a fabricated "live" number.
   */
  cpuLoad?: number;
  ramLoad?: number;
}

export function TopBar({ projectName, style, cpuLoad, ramLoad }: TopBarProps) {
  const styleLabel = AVAILABLE_STYLES.find((s) => s.key === style)?.label ?? style;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 14px",
        height: 46,
        flexShrink: 0,
        borderBottom: `1px solid ${tokens.color.border}`,
        background: tokens.color.panelAlt,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(135deg, ${tokens.color.emberGoldStart}, ${tokens.color.emberEnd})`,
          }}
        >
          <Flame size={13} color="#0b0b0f" strokeWidth={2.5} />
        </div>
        <span style={{ fontFamily: tokens.font.display, fontSize: 15, fontWeight: 700, letterSpacing: 0.3, color: tokens.color.text }}>
          DEAN STORYFILM<span style={{ color: tokens.color.purple }}> AI</span>
        </span>
        <div style={{ width: 1, height: 18, background: tokens.color.border, margin: "0 6px" }} />
        <span style={{ fontSize: 12.5, color: tokens.color.textDim }}>{projectName}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {(cpuLoad !== undefined || ramLoad !== undefined) && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 11, color: tokens.color.textDim, fontFamily: tokens.font.mono }}>
              {cpuLoad !== undefined && (
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Cpu size={12} color={cpuLoad > 70 ? tokens.color.emberEnd : tokens.color.textDim} />
                  CPU <b style={{ color: tokens.color.text }}>{cpuLoad}%</b>
                </span>
              )}
              {ramLoad !== undefined && (
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Layers size={12} />
                  RAM <b style={{ color: tokens.color.text }}>{ramLoad}%</b>
                </span>
              )}
            </div>
            <div style={{ width: 1, height: 18, background: tokens.color.border }} />
          </>
        )}
        <div
          style={{
            fontSize: 11.5,
            padding: "4px 10px",
            borderRadius: 999,
            background: tokens.color.purpleDim,
            color: tokens.color.purple,
            border: `1px solid ${tokens.color.purple}44`,
          }}
        >
          {styleLabel}
        </div>
      </div>
    </div>
  );
}
