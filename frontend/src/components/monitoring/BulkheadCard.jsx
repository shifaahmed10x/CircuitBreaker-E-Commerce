function BulkheadCard({ data }) {
  const available = data?.availableConcurrentCalls ?? 0;
  const max = data?.maxConcurrentCalls ?? 0;

  const used = Math.max(max - available, 0);

  const percentage =
    max > 0 ? (used / max) * 100 : 0;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">
            Bulkhead
          </p>

          <h3 className="mt-1 text-lg font-semibold text-white">
            {data?.name || "recommendationBulkhead"}
          </h3>
        </div>

        <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400">
          CONCURRENCY
        </span>
      </div>

      <div className="mt-6 flex items-end gap-2">
        <span className="text-4xl font-bold text-white">
          {available}
        </span>

        <span className="mb-1 text-slate-500">
          / {max}
        </span>
      </div>

      <p className="mt-1 text-sm text-slate-400">
        Available concurrent calls
      </p>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-purple-500 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p className="mt-2 text-xs text-slate-500">
        {used} concurrent call(s) currently in use
      </p>
    </div>
  );
}

export default BulkheadCard;