function CircuitBreakerCard({ data }) {
  const state = data?.state || "UNKNOWN";

  const stateStyles = {
    CLOSED: "text-emerald-400 bg-emerald-500/10",
    OPEN: "text-red-400 bg-red-500/10",
    HALF_OPEN: "text-amber-400 bg-amber-500/10",
    UNKNOWN: "text-slate-400 bg-slate-500/10",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Circuit Breaker</p>

          <h3 className="mt-1 text-lg font-semibold text-white">
            {data?.name || "recommendationCircuitBreaker"}
          </h3>
        </div>

        <div
          className={`rounded-full px-3 py-1 text-xs font-bold ${stateStyles[state]}`}
        >
          {state}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-slate-400">
          Recommendation Service protection
        </p>

        <p className="mt-2 text-sm text-slate-300">
          {state === "CLOSED"
            ? "Requests are flowing normally."
            : state === "OPEN"
              ? "Requests are failing fast and fallback is active."
              : state === "HALF_OPEN"
                ? "Testing whether the service has recovered."
                : "Circuit state unavailable."}
        </p>
      </div>
    </div>
  );
}

export default CircuitBreakerCard;