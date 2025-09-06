"use client";

import { useTokenStore } from "@/store/useTokenStore";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function TokenCounter() {
  const tokens = useTokenStore((s) => s.tokens);
  const setTokens = useTokenStore((s) => s.setTokens);
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const res = await fetch("/api/token", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (typeof data?.available_token === "number") {
          setTokens(data.available_token);
        }
      } catch (_) {}
    };

    if (status === "authenticated") {
      fetchTokens();
    }
  }, [status, session, setTokens]);

  if (!mounted) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-2 rounded-full bg-gray-900/80 border border-gray-700/60 px-4 py-2 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
        <span className="text-yellow-400 text-lg" aria-hidden>
          🪙
        </span>
        <span className="text-sm text-gray-300">Tokens</span>
        <span className="text-white font-extrabold tabular-nums">{tokens}</span>
      </div>
    </div>
  );
}


