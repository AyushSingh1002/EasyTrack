"use client";

import { useTokenStore } from "@/store/useTokenStore";

const plans = [
  { name: "Free", price: "$0", tokens: 0, cta: "Buy" },
  { name: "Pro", price: "$9", tokens: 500, cta: "Buy" },
  { name: "Enterprise", price: "Contact", tokens: 2000, cta: "Buy" },
];

export default function PricingPage() {
  const addTokens = useTokenStore((s) => s.addTokens);

  const handleBuy = (tokens) => {
    if (tokens <= 0) return;
    addTokens(tokens);
  };

  return (
    <div className="min-h-screen px-4 py-16">
      <h1 className="text-2xl font-bold mb-8">Pricing</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className="card">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="text-gray-400 mt-1">{plan.price}</p>
            <p className="mt-2 text-sm text-gray-400">Includes {plan.tokens} tokens</p>
            <button
              className="btn-primary mt-4 w-full"
              onClick={() => handleBuy(plan.tokens)}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


