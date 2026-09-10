import { getProperties } from "./api/property.api.js";
import { renderProperties } from "./components/property-list.js";
import "./components/gallery.js";

const propertyContainer = document.querySelector("#property-list");
const propertySort = document.querySelector("#property-sort");

// Mobile breakpoint
const MOBILE_BREAKPOINT = 768;

function getPropertyLimit() {
  return window.innerWidth <= MOBILE_BREAKPOINT ? 4 : 6;
}

async function loadProperties(type = "most-popular") {
  try {
    const limit = getPropertyLimit();

    const properties = await getProperties(type, limit);

    renderProperties(properties, propertyContainer);
  } catch (error) {
    console.error("Error loading properties:", error);

    propertyContainer.innerHTML = `
      <p class="property-list__error">
        Unable to load properties. Please try again later.
      </p>
    `;
  }
}

const description = document.querySelector(".description");
const readMoreButton = document.querySelector(".read-more");
const collapseButton = document.querySelector(".collapse");

readMoreButton.addEventListener("click", () => {
  description.classList.add("expanded");
});

collapseButton.addEventListener("click", () => {
  description.classList.remove("expanded");
});


// Load Most Popular when page starts
loadProperties();

// Change sorting
propertySort.addEventListener("change", (event) => {
  loadProperties(event.target.value);
});