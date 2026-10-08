const API_BASE_URL = "http://localhost:8080";

export async function getInventoryByProductId(productId) {
  const response = await fetch(
    `${API_BASE_URL}/api/inventory/product/${productId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch inventory");
  }

  return response.json();
}