const API_BASE_URL = "http://localhost:8080";

export async function getRecommendations() {

    const response = await fetch(
        `${API_BASE_URL}/api/recommendations`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
    }

    const data = await response.json();

    if (Array.isArray(data)) {
        return {
            fallback: false,
            recommendations: data
        };
    }

    return {
        fallback: data.fallback === true,
        recommendations: data.recommendations || []
    };
}