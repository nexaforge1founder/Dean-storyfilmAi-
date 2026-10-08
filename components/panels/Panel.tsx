"use client";

import React from "react";
import type { ReactNode, CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { tokens } from "@/lib/tokens";

export interface PanelProps {
  title: string;
  icon?: LucideIcon;
  right?: ReactNode;
  children?: ReactNode;
  style?: CSSProperties;
}

/** Shared docked-panel chrome used across the workspace, inspector, and console. */
export function Panel({
  title,
  icon: Icon,
  right,
  children,
  style,
}: PanelProps) {
  return (
    <div
      className="ff-body"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: tokens.color.panel,
        border: `1px solid ${tokens.color.border}`,
        borderRadius: 10,
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "9px 12px",
          borderBottom: `1px solid ${tokens.color.border}`,
          background: tokens.color.panelAlt,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          {Icon && (
            <Icon
              size={13}
              color={tokens.color.textDim}
              strokeWidth={2}
            />
          )}

          <span
            style={{
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: 0.3,
              color: tokens.color.textDim,
              textTransform: "uppercase",
            }}
          >
            {title}
          </span>
        </div>

        {right}
      </div>

      <div
        style={{
          flex: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
