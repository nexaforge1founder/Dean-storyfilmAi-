"use client";

import React from "react";
import {
  Home, Boxes, Clapperboard, ListVideo,
  Store, Cpu, Settings, Brain, ChevronLeft, ChevronRight,
} from "lucide-react";
import { tokens } from "@/lib/tokens";

export const NAV_ITEMS = [
  { key: "home", label: "Home", icon: Home, href: "/dashboard" },
  { key: "movies", label: "Movies", icon: Clapperboard, href: "/dashboard/movies" },
  { key: "queue", label: "Render Queue", icon: ListVideo, href: "/dashboard/queue" },
  { key: "assets", label: "Assets", icon: Boxes, href: "/dashboard/assets" },
  { key: "memory", label: "Memory", icon: Brain, href: "/dashboard/memory" },
  { key: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
] as const;

export interface SidebarProps {
  active: string;
  onNavigate?: (key: string) => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

export function Sidebar({ active, onNavigate, collapsed, onToggleCollapsed }: SidebarProps) {
  return (
    <div
      style={{
        width: collapsed ? 52 : 176,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        borderRight: `1px solid ${tokens.color.border}`,
        background: tokens.color.panelAlt,
        transition: "width 0.18s ease",
      }}
    >
      <nav style={{ flex: 1, padding: "8px 6px", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map(({ key, label, icon: Icon, href }) => {
          const isActive = key === active;
          return (
            <a
              key={key}
              href={href}
              onClick={(e: any) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate(key);
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 9px",
                borderRadius: 7,
                textDecoration: "none",
                cursor: "pointer",
                background: isActive ? tokens.color.purpleDim : "transparent",
                color: isActive ? tokens.color.purple : tokens.color.textDim,
              }}
            >
              <Icon size={15} strokeWidth={2} style={{ flexShrink: 0 }} />
              {!collapsed && <span style={{ fontSize: 12.5, fontWeight: isActive ? 600 : 500 }}>{label}</span>}
            </a>
          );
        })}
      </nav>
      <button
        onClick={onToggleCollapsed}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          padding: "10px 0",
          border: "none",
          borderTop: `1px solid ${tokens.color.border}`,
          background: "transparent",
          color: tokens.color.textFaint,
          cursor: "pointer",
          fontSize: 11,
        }}
      >
        {collapsed ? <ChevronRight size={14} /> : (
          <>
            <ChevronLeft size={14} /> Collapse
          </>
        )}
      </button>
    </div>
  );
}
