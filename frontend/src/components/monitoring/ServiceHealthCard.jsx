function ServiceHealthCard({ name, status }) {
  const isUp = status === "UP";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Service</p>

          <h3 className="mt-1 text-lg font-semibold text-white">
            {name}
          </h3>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full ${
            isUp ? "bg-emerald-500/10" : "bg-red-500/10"
          }`}
        >
          <span
            className={`h-3 w-3 rounded-full ${
              isUp ? "bg-emerald-400" : "bg-red-400"
            }`}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <span
          className={`text-sm font-semibold ${
            isUp ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {status}
        </span>

        <span className="text-xs text-slate-500">
          {isUp ? "Service registered" : "Service unavailable"}
        </span>
      </div>
    </div>
  );
}

export default ServiceHealthCard;