const API_URL = "http://localhost:3000";

export async function getProperties(type, limit) {
  const response = await fetch(
    `${API_URL}/get-property?${type}=true&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  return response.json();
}

export async function getImages() {
  const response = await fetch(`${API_URL}/images`);

  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }

  return response.json();
}