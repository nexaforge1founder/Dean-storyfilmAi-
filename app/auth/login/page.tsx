"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { tokens } from "@/lib/tokens";

export default function LoginPage() {
  const router = useRouter();
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: tokens.color.bg, gap: 16 }}>
      <AuthForm mode="login" onSuccess={() => router.push("/dashboard")} />
      <div style={{ fontSize: 12.5, color: tokens.color.textDim }}>
        No account? <Link href="/register" style={{ color: tokens.color.purple }}>Create one</Link>
        {" · "}
        <Link href="/forgot-password" style={{ color: tokens.color.textDim }}>Forgot password?</Link>
      </div>
    </div>
  );
}
