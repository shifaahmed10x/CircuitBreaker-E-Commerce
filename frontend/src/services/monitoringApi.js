const API_BASE_URL = "http://localhost:8080";

export async function getServiceHealth() {
  const response = await fetch(
    `${API_BASE_URL}/api/monitoring/services`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch service health");
  }

  return response.json();
}

export async function getResilienceStatus() {
  const response = await fetch(
    `${API_BASE_URL}/api/monitoring/resilience`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch resilience status");
  }

  return response.json();
}

export async function getMonitoringData() {
  const [services, resilience] = await Promise.all([
    getServiceHealth(),
    getResilienceStatus(),
  ]);

  return {
    services,
    resilience,
  };
}