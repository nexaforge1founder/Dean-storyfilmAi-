"use client";

import { useRouter } from "next/navigation";
import { LandingHero } from "@/components/landing/LandingHero";

export default function LandingPage() {
  const router = useRouter();
  return (
    <LandingHero
      onEnter={() => router.push("/login")}
      onLogin={() => router.push("/login")}
      onCreateAccount={() => router.push("/register")}
    />
  );
}
