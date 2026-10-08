"use client";

import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { tokens } from "@/lib/tokens";

export default function ForgotPasswordPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: tokens.color.bg, gap: 16 }}>
      <AuthForm mode="forgot-password" />
      <div style={{ fontSize: 12.5, color: tokens.color.textDim }}>
        <Link href="/login" style={{ color: tokens.color.purple }}>Back to sign in</Link>
      </div>
    </div>
  );
}
