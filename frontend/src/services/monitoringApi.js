const API_BASE_URL = "http://localhost:8080";

export async function getMonitoringData() {
  const [servicesResponse, resilienceResponse] = await Promise.all([
    fetch(`${API_BASE_URL}/api/monitoring/services`),
    fetch(`${API_BASE_URL}/api/monitoring/resilience`),
  ]);

  if (!servicesResponse.ok || !resilienceResponse.ok) {
    throw new Error("Failed to fetch monitoring data");
  }

  const services = await servicesResponse.json();
  const resilience = await resilienceResponse.json();

  return {
    services,
    resilience,
  };
}

export async function triggerLatency(delay = 5) {
  const response = await fetch(
    `${API_BASE_URL}/api/recommendations/slow?delay=${delay}`
  );

  if (!response.ok) {
    throw new Error("Latency test failed");
  }

  return response.json();
}