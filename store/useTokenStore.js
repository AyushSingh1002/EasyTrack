"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTokenStore = create(
  persist(
    (set, get) => ({
      tokens: 0,
      setTokens: (amount) => {
        const value = Number(amount) || 0;
        set({ tokens: value < 0 ? 0 : value });
      },
      addTokens: (amount) => {
        const value = Number(amount) || 0;
        if (value <= 0) return;
        set({ tokens: get().tokens + value });
      },
      spendTokens: (amount) => {
        const cost = Number(amount) || 0;
        if (cost <= 0) return true;
        const current = get().tokens;
        if (current >= cost) {
          set({ tokens: current - cost });
          return true;
        }
        return false;
      },
      resetTokens: () => set({ tokens: 0 }),
    }),
    {
      name: "token-store",
      partialize: (state) => ({ tokens: state.tokens }),
    }
  )
);


