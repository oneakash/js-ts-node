const FAVORITES_KEY = "favoriteProperties";

export function getFavorites() {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);

    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Failed to read favorites:", error);
    return [];
  }
}

export function isFavorite(propertyId) {
  return getFavorites().includes(propertyId);
}

export function addFavorite(propertyId) {
  const favorites = getFavorites();

  if (!favorites.includes(propertyId)) {
    favorites.push(propertyId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(propertyId) {
  const favorites = getFavorites().filter((id) => id !== propertyId);

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function toggleFavorite(propertyId) {
  if (isFavorite(propertyId)) {
    removeFavorite(propertyId);
    return false;
  }

  addFavorite(propertyId);
  return true;
}