"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { tokens } from "@/lib/tokens";

export default function RegisterPage() {
  const router = useRouter();
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: tokens.color.bg, gap: 16 }}>
      <AuthForm mode="register" onSuccess={() => router.push("/dashboard")} />
      <div style={{ fontSize: 12.5, color: tokens.color.textDim }}>
        Already have an account? <Link href="/login" style={{ color: tokens.color.purple }}>Sign in</Link>
      </div>
    </div>
  );
}
