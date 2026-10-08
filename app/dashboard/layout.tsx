"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { tokens } from "@/lib/tokens";

function activeKeyFromPath(pathname: string): string {
  const segment = pathname.split("/")[2] || "home";
  return segment;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", background: tokens.color.bg, color: tokens.color.text, overflow: "hidden" }}>
      <TopBar projectName="Untitled Production" style="aurora_stylized" />
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        <Sidebar
          active={activeKeyFromPath(pathname)}
          collapsed={collapsed}
          onToggleCollapsed={() => setCollapsed((v) => !v)}
          onNavigate={(key) => router.push(key === "home" ? "/dashboard" : `/dashboard/${key}`)}
        />
        <div style={{ flex: 1, minWidth: 0, minHeight: 0 }}>{children}</div>
      </div>
    </div>
  );
}
