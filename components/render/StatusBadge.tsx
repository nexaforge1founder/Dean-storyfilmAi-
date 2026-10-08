"use client";

import React from "react";
import { tokens, STATUS_META, type RenderStatus } from "@/lib/tokens";
import { Clock, Flame, Check, AlertTriangle, Pause } from "lucide-react";

const ICONS: Record<RenderStatus, any> = {
  queued: Clock,
  rendering: Flame,
  paused: Pause,
  completed: Check,
  failed: AlertTriangle,
};

export function StatusBadge({ status }: { status: RenderStatus }) {
  const meta = STATUS_META[status] ?? STATUS_META.queued;
  const Icon = ICONS[status] ?? Clock;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        padding: "3px 8px",
        borderRadius: 999,
        color: meta.color,
        background: `${meta.color}1a`,
        border: `1px solid ${meta.color}33`,
        textTransform: "uppercase",
        letterSpacing: 0.4,
        fontFamily: tokens.font.mono,
      }}
    >
      <Icon size={11} strokeWidth={2.5} />
      {meta.label}
    </span>
  );
}
