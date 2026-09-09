import { createPropertyCard } from "./property-card.js";

export function renderProperties(properties, container) {
  if (!container) {
    throw new Error("Property container was not found");
  }

  container.innerHTML = "";

  if (!Array.isArray(properties) || properties.length === 0) {
    container.innerHTML = `
      <p class="property-list__empty">
        No properties found.
      </p>
    `;

    return;
  }

  const fragment = document.createDocumentFragment();

  properties.forEach((property) => {
    const card = createPropertyCard(property);

    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}