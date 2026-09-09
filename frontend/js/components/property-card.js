// import {
//   isFavorite,
//   toggleFavorite,
// } from "../services/favorites.js";

// export function createPropertyCard(property) {
//   const card = document.createElement("article");

//   card.className = "property-card";
//   card.dataset.propertyId = property.ID;

//   const propertyName =
//     property.Property?.PropertyName || "Unnamed Property";

//   const price = property.Property?.Price ?? 0;

//   const featureImage = property.Property?.FeatureImage;

//   const city = property.GeoInfo?.City || "";
//   const country = property.GeoInfo?.Country || "";

//   const location = [city, country]
//     .filter(Boolean)
//     .join(", ");

//   const imageUrl = featureImage
//     ? `https://beta.imgservice.rentbyowner.com/640x300/${featureImage}`
//     : "";

//   const favorite = isFavorite(property.ID);

//   card.innerHTML = `
//     <div class="property-card__image-wrapper">
//       <img
//         class="property-card__image"
//         src="${imageUrl}"
//         alt="${propertyName}"
//         loading="lazy"
//       />

//       <button
//         class="property-card__favorite ${favorite ? "active" : ""}"
//         type="button"
//         aria-label="${favorite ? "Remove from favorites" : "Add to favorites"}"
//         aria-pressed="${favorite}"
//       >
//         ♥
//       </button>
//     </div>

//     <div class="property-card__content">
//       <h3 class="property-card__title">
//         ${propertyName}
//       </h3>

//       <p class="property-card__location">
//         ${location}
//       </p>

//       <p class="property-card__price">
//         $${Number(price).toLocaleString()}
//       </p>
//     </div>
//   `;

//   const favoriteButton = card.querySelector(
//     ".property-card__favorite"
//   );

//   favoriteButton.addEventListener("click", (event) => {
//     event.stopPropagation();

//     const active = toggleFavorite(property.ID);

//     favoriteButton.classList.toggle("active", active);

//     favoriteButton.setAttribute(
//       "aria-pressed",
//       String(active)
//     );

//     favoriteButton.setAttribute(
//       "aria-label",
//       active
//         ? "Remove from favorites"
//         : "Add to favorites"
//     );
//   });

//   return card;
// }

export function createPropertyCard(property) {
  const card = document.createElement("article");

  card.className = "property-card";
  card.dataset.propertyId = property.ID;

  const propertyName =
    property.Property?.PropertyName || "Unnamed Property";

  const price = property.Property?.Price ?? 0;

  const featureImage =
    property.Property?.FeatureImage || "";

  const city =
    property.GeoInfo?.City || "";

  const country =
    property.GeoInfo?.Country || "";

  const location = [city, country]
    .filter(Boolean)
    .join(" > ");

  const imageUrl = featureImage
    ? `https://beta.imgservice.rentbyowner.com/640x300/${featureImage}`
    : "";

  card.innerHTML = `
    <div class="pc-image">

      <img
        src="${imageUrl}"
        alt="${propertyName}"
        loading="lazy"
      >

      <div class="pc-badge">
        50+ GOLF COURSES NEARBY
      </div>

      <div class="pc-icons">

        <span class="icon-circle">
          🍃
        </span>

        <span class="icon-circle">
          📍
        </span>

        <button
          class="icon-circle favorite-button"
          type="button"
          aria-label="Add ${propertyName} to favorites"
        >
          ♡
        </button>

      </div>

    </div>

    <div class="pc-info">

      <div class="pc-rating">
        <span class="star">⭐</span>
        <strong>10.0 Exceptional</strong>
        | 12 Reviews
      </div>

      <h3>
        ${propertyName}
      </h3>

      <div class="pc-provider">
        Booking.com
      </div>

      <div class="pc-price">
        From $${Number(price).toLocaleString()}
        <span class="info-icon">ⓘ</span>
      </div>

      <p class="pc-amenities">
        Golf Club Storage • Pet-Friendly •
        On-Site Dining Options • Sleeps 8
      </p>

      <div class="pc-location">
        ${location}
      </div>

      <div class="pc-buttons">

        <button
          class="pc-btn-outline"
          type="button"
        >
          LEARN MORE
        </button>

        <button
          class="pc-btn-solid"
          type="button"
        >
          SEE DATES
        </button>

      </div>

    </div>
  `;

  return card;
}