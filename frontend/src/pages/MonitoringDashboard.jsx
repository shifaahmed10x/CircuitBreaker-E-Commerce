import { useCallback, useEffect, useState } from "react";
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  CircleAlert,
  Gauge,
  Layers3,
  RefreshCw,
  ShieldCheck,
  Timer,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  getMonitoringData,
  triggerLatency,
} from "../services/monitoringApi";

function MonitoringDashboard() {
  const [data, setData] = useState({
    services: {},
    resilience: {},
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [latencyLoading, setLatencyLoading] = useState(false);
  const [latencyMessage, setLatencyMessage] = useState("");

  const loadMonitoringData = useCallback(async () => {
    try {
      setError("");

      const result = await getMonitoringData();

      setData(result);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to API Gateway.");
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

  const handleTriggerLatency = async () => {
    try {
      setLatencyLoading(true);
      setLatencyMessage("");

      await triggerLatency(5);

      setLatencyMessage(
        "5-second latency test completed successfully."
      );

      await loadMonitoringData();
    } catch (err) {
      console.error(err);

      setLatencyMessage(
        "Latency test failed."
      );
    } finally {
      setLatencyLoading(false);
    }
  };

  const services = data.services || {};
  const resilience = data.resilience || {};

  const circuitBreaker =
    resilience.circuitBreaker || {};

  const rateLimiter =
    resilience.rateLimiter || {};

  const bulkhead =
    resilience.bulkhead || {};

  const serviceList = [
    {
      name: "Product Service",
      key: "product",
    },
    {
      name: "Inventory Service",
      key: "inventory",
    },
    {
      name: "Recommendation Service",
      key: "recommendation",
    },
  ];

  const circuitState =
    circuitBreaker.state || "UNKNOWN";

  const circuitHealthy =
    circuitState === "CLOSED";

  return (
    <div className="min-h-screen bg-[#f8f7f9] text-[#25152b]">

      {/* HEADER */}
      <header className="border-b border-[#e4dce6] bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#8b4aa3]">
              CircuitBreaker E-Commerce
            </p>

            <h1 className="mt-1 text-2xl font-black tracking-[-0.03em] text-[#25152b]">
              Resilience Control Center
            </h1>
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 border border-[#d8cedb] px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#32113f] transition hover:bg-[#32113f] hover:text-white"
          >
            <ArrowLeft size={15} />
            Store
          </Link>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">

        {/* INTRO */}
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

          <div>

            <div className="flex items-center gap-2 text-[#8b4aa3]">
              <Activity size={17} />

              <span className="text-xs font-black uppercase tracking-[0.18em]">
                Live system monitoring
              </span>
            </div>

            <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-[#25152b] sm:text-5xl">
              System health & resilience
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#706675]">
              Monitor service discovery, circuit breakers,
              bulkheads and gateway rate limiting in real time.
            </p>

          </div>

          <button
            type="button"
            onClick={loadMonitoringData}
            className="flex w-fit items-center gap-2 border border-[#d8cedb] bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#32113f] transition hover:bg-[#32113f] hover:text-white"
          >
            <RefreshCw size={15} />
            Refresh
          </button>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 flex items-center gap-3 border border-[#efcaca] bg-[#fff5f5] p-4 text-sm text-[#a32d2d]">
            <CircleAlert size={18} />
            {error}
          </div>
        )}

        {/* SERVICE HEALTH */}
        <section className="mb-6">

          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#8b4aa3]" />

            <h3 className="text-lg font-black">
              Service Health
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-3">

            {serviceList.map((service) => {

              const status =
                services[service.key] || "DOWN";

              const isUp = status === "UP";

              return (
                <div
                  key={service.key}
                  className="border border-[#e2dbe5] bg-white p-5 shadow-[0_4px_20px_rgba(37,21,43,0.04)]"
                >

                  <div className="flex items-center justify-between">

                    <span className="font-bold text-[#35273b]">
                      {service.name}
                    </span>

                    {isUp ? (
                      <CheckCircle2
                        size={20}
                        className="text-[#29935a]"
                      />
                    ) : (
                      <CircleAlert
                        size={20}
                        className="text-[#c23b3b]"
                      />
                    )}

                  </div>

                  <div className="mt-5 flex items-end justify-between">

                    <span
                      className={`text-3xl font-black ${
                        isUp
                          ? "text-[#29935a]"
                          : "text-[#c23b3b]"
                      }`}
                    >
                      {status}
                    </span>

                    <span className="text-xs text-[#8a7f8e]">
                      Eureka
                    </span>

                  </div>

                </div>
              );
            })}

          </div>
        </section>

        {/* RESILIENCE */}
        <section>

          <div className="mb-4 flex items-center gap-2">
            <Zap size={18} className="text-[#8b4aa3]" />

            <h3 className="text-lg font-black">
              Resilience Status
            </h3>

          </div>

          <div className="grid gap-4 lg:grid-cols-3">

            {/* CIRCUIT BREAKER */}
            <div className="border border-[#e2dbe5] bg-white p-6 shadow-[0_4px_20px_rgba(37,21,43,0.04)]">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-[#f0e5f3] text-[#7d3b95]">
                    <Zap size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-black">
                      Circuit Breaker
                    </p>

                    <p className="text-xs text-[#8a7f8e]">
                      Recommendation Service
                    </p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] ${
                    circuitHealthy
                      ? "bg-[#e5f6ed] text-[#237a4c]"
                      : circuitState === "HALF_OPEN"
                        ? "bg-[#fff3d9] text-[#a46600]"
                        : "bg-[#fde7e7] text-[#a52d2d]"
                  }`}
                >
                  {circuitState}
                </span>

              </div>

              <div className="mt-8">

                <p className="text-4xl font-black text-[#32113f]">
                  {circuitState}
                </p>

                <p className="mt-2 text-xs leading-5 text-[#817684]">
                  Protects the customer experience when
                  Recommendation Service becomes slow or unavailable.
                </p>

              </div>

            </div>

            {/* BULKHEAD */}
            <div className="border border-[#e2dbe5] bg-white p-6 shadow-[0_4px_20px_rgba(37,21,43,0.04)]">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center bg-[#f0e5f3] text-[#7d3b95]">
                  <Layers3 size={19} />
                </div>

                <div>
                  <p className="text-sm font-black">
                    Bulkhead
                  </p>

                  <p className="text-xs text-[#8a7f8e]">
                    Recommendation Service
                  </p>
                </div>

              </div>

              <div className="mt-8 flex items-end gap-2">

                <span className="text-4xl font-black text-[#32113f]">
                  {bulkhead.availableConcurrentCalls ?? "--"}
                </span>

                <span className="mb-1 text-lg text-[#9a8f9d]">
                  /
                  {bulkhead.maxConcurrentCalls ?? "--"}
                </span>

              </div>

              <p className="mt-2 text-xs text-[#817684]">
                Available concurrent calls
              </p>

            </div>

            {/* RATE LIMITER */}
            <div className="border border-[#e2dbe5] bg-white p-6 shadow-[0_4px_20px_rgba(37,21,43,0.04)]">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center bg-[#f0e5f3] text-[#7d3b95]">
                  <Gauge size={19} />
                </div>

                <div>
                  <p className="text-sm font-black">
                    Rate Limiter
                  </p>

                  <p className="text-xs text-[#8a7f8e]">
                    API Gateway
                  </p>
                </div>

              </div>

              <div className="mt-8 flex items-end gap-2">

                <span className="text-4xl font-black text-[#32113f]">
                  {rateLimiter.availablePermissions ?? "--"}
                </span>

                <span className="mb-1 text-lg text-[#9a8f9d]">
                  available
                </span>

              </div>

              <p className="mt-2 text-xs text-[#817684]">
                Gateway permissions per refresh window
              </p>

            </div>

          </div>
        </section>

        {/* LATENCY DEMO */}
        <section className="mt-8 overflow-hidden bg-[#32113f] text-white">

          <div className="flex flex-col gap-8 p-7 lg:flex-row lg:items-center lg:justify-between lg:p-10">

            <div className="max-w-2xl">

              <div className="flex items-center gap-2 text-[#e6b8ff]">
                <Timer size={18} />

                <span className="text-xs font-black uppercase tracking-[0.18em]">
                  Resilience demonstration
                </span>
              </div>

              <h3 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl">
                Trigger recommendation latency
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/70">
                Simulate a 5-second Recommendation Service delay
                and observe the Circuit Breaker, fallback and trace.
              </p>

              {latencyMessage && (
                <p className="mt-4 text-sm font-bold text-[#e6b8ff]">
                  {latencyMessage}
                </p>
              )}

            </div>

            <button
              type="button"
              onClick={handleTriggerLatency}
              disabled={latencyLoading}
              className="flex shrink-0 items-center justify-center gap-3 bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#32113f] transition hover:bg-[#ead7ef] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Timer size={18} />

              {latencyLoading
                ? "Running test..."
                : "Trigger 5s Latency"}
            </button>

          </div>

        </section>

        {/* FLOW */}
        <section className="mt-8 border border-[#e2dbe5] bg-white p-6 lg:p-8">

          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8b4aa3]">
            What this proves
          </p>

          <div className="mt-5 flex flex-col gap-3 text-sm font-bold text-[#35273b] md:flex-row md:items-center">

            <span className="border border-[#ddd1e1] px-4 py-3">
              Recommendation Service
            </span>

            <span className="text-[#8b4aa3]">→</span>

            <span className="border border-[#ddd1e1] px-4 py-3">
              Latency
            </span>

            <span className="text-[#8b4aa3]">→</span>

            <span className="border border-[#ddd1e1] px-4 py-3">
              Circuit Breaker
            </span>

            <span className="text-[#8b4aa3]">→</span>

            <span className="border border-[#ddd1e1] px-4 py-3">
              Fallback
            </span>

            <span className="text-[#8b4aa3]">→</span>

            <span className="bg-[#32113f] px-4 py-3 text-white">
              Top Recommendations
            </span>

          </div>

        </section>

        {loading && (
          <p className="mt-6 text-center text-xs text-[#817684]">
            Loading monitoring data...
          </p>
        )}

      </main>
    </div>
  );
}

export default MonitoringDashboard;