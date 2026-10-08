"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { Panel } from "@/components/panels/Panel";
import { tokens } from "@/lib/tokens";
import { AVAILABLE_STYLES, type StyleKey } from "@/lib/types";

export interface StyleManagerProps {
  value: StyleKey | string;
  onChange: (key: StyleKey) => void;
  height?: number;
}

export function StyleManager({ value, onChange, height = 96 }: StyleManagerProps) {
  return (
    <Panel title="Style Manager" icon={Sparkles} style={{ height, flexShrink: 0 }}>
      <div style={{ display: "flex", gap: 6, padding: 10, flexWrap: "wrap" }}>
        {AVAILABLE_STYLES.map((s) => {
          const active = s.key === value;
          return (
            <button
              key={s.key}
              onClick={() => onChange(s.key)}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                fontSize: 12,
                cursor: "pointer",
                border: `1px solid ${active ? tokens.color.purple : tokens.color.border}`,
                background: active ? tokens.color.purpleDim : "transparent",
                color: active ? tokens.color.purple : tokens.color.textDim,
                fontWeight: active ? 600 : 500,
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </Panel>
  );
}
