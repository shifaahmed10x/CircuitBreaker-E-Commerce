import { useCallback, useEffect, useState } from "react";

import {
  getMonitoringData,
} from "../services/monitoringApi";

import ServiceHealthCard from "../components/monitoring/ServiceHealthCard";
import CircuitBreakerCard from "../components/monitoring/CircuitBreakerCard";
import RateLimiterCard from "../components/monitoring/RateLimiterCard";
import BulkheadCard from "../components/monitoring/BulkheadCard";

function MonitoringDashboard() {
  const [data, setData] = useState({
    services: {},
    resilience: {},
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMonitoringData = useCallback(async () => {
    try {
      setError("");

      const result = await getMonitoringData();

      setData(result);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to the API Gateway."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMonitoringData();

    const interval = setInterval(() => {
      loadMonitoringData();
    }, 3000);

    return () => clearInterval(interval);
  }, [loadMonitoringData]);

  const services = data.services || {};
  const resilience = data.resilience || {};

  const serviceList = [
    {
      name: "Product Service",
      status: services.product || "DOWN",
    },
    {
      name: "Inventory Service",
      status: services.inventory || "DOWN",
    },
    {
      name: "Recommendation Service",
      status: services.recommendation || "DOWN",
    },
  ];

  const allServicesUp = serviceList.every(
    (service) => service.status === "UP"
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <header className="border-b border-slate-800 bg-slate-950/90">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">
                CircuitBreaker E-Commerce
              </p>

              <h1 className="mt-1 text-3xl font-bold text-white">
                Resilience Monitoring
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Real-time view of service health and resilience mechanisms.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  allServicesUp
                    ? "bg-emerald-400"
                    : "bg-red-400"
                }`}
              />

              <span className="text-sm font-medium text-slate-300">
                {allServicesUp
                  ? "System Operational"
                  : "System Degraded"}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex min-h-80 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />

              <p className="mt-4 text-sm text-slate-400">
                Loading monitoring data...
              </p>
            </div>
          </div>
        ) : (
          <>
            <section>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-white">
                  Service Health
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Current service registration status from Eureka.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {serviceList.map((service) => (
                  <ServiceHealthCard
                    key={service.name}
                    name={service.name}
                    status={service.status}
                  />
                ))}
              </div>
            </section>

            <section>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-white">
                  Resilience
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Live state of the gateway protection mechanisms.
                </p>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <CircuitBreakerCard
                  data={resilience.circuitBreaker}
                />

                <RateLimiterCard
                  data={resilience.rateLimiter}
                />
              </div>

              <div className="mt-5">
                <BulkheadCard
                  data={resilience.bulkhead}
                />
              </div>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="font-semibold text-white">
                    Live Monitoring
                  </h2>

                  <p className="text-sm text-slate-500">
                    Dashboard automatically refreshes every 3 seconds.
                  </p>
                </div>

                <button
                  onClick={loadMonitoringData}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
                >
                  Refresh Now
                </button>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default MonitoringDashboard;