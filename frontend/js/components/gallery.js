
const galleryModal = document.querySelector("#gallery-modal");
const galleryDesktop = document.querySelector("#gallery-desktop");
const gallerySliderTrack = document.querySelector("#gallery-slider-track");

const galleryClose = document.querySelector("#gallery-close");
const galleryPrev = document.querySelector("#gallery-prev");
const galleryNext = document.querySelector("#gallery-next");

const galleryCounter = document.querySelector("#gallery-counter");
const galleryDots = document.querySelector("#gallery-dots");

const viewImagesButton = document.querySelector(".view-images-btn");

let images = [];
let currentIndex = 0;

let touchStartX = 0;
let touchEndX = 0;

const MOBILE_BREAKPOINT = 768;

/**
 * Fetch images from backend
 */
async function fetchGalleryImages() {
  try {
    const response = await fetch("/images");

    if (!response.ok) {
      throw new Error("Failed to fetch gallery images");
    }

    images = await response.json();

    renderDesktopGallery();
    renderMobileGallery();
    renderDots();

    updateGallery();
  } catch (error) {
    console.error("Gallery error:", error);
  }
}

/**
 * Render desktop gallery
 */
function renderDesktopGallery() {
  galleryDesktop.innerHTML = images
    .map(
      (image, index) => `
        <div class="gallery-modal__image">
          <img
            src="${image}"
            alt="Eagle Creek Golf Club image ${index + 1}"
          />
        </div>
      `,
    )
    .join("");
}

/**
 * Render mobile/tablet slides
 */
function renderMobileGallery() {
  gallerySliderTrack.innerHTML = images
    .map(
      (image, index) => `
        <div class="gallery-slide-item">
          <img
            src="${image}"
            alt="Eagle Creek Golf Club image ${index + 1}"
            draggable="false"
          />
        </div>
      `,
    )
    .join("");
}

/**
 * Create maximum 5 dots.
 *
 * The dots represent a moving window around the current image.
 */
function renderDots() {
  galleryDots.innerHTML = "";

  const visibleDots = Math.min(5, images.length);

  for (let i = 0; i < visibleDots; i++) {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = "gallery-dot";

    dot.addEventListener("click", () => {
      const targetIndex = getDotTargetIndex(i);

      goToImage(targetIndex);
    });

    galleryDots.appendChild(dot);
  }
}

/**
 * Calculate which image a dot represents.
 */
function getDotTargetIndex(dotIndex) {
  if (images.length <= 5) {
    return dotIndex;
  }

  let start = currentIndex - 2;

  if (start < 0) {
    start = 0;
  }

  if (start > images.length - 5) {
    start = images.length - 5;
  }

  return start + dotIndex;
}

/**
 * Update slider, counter and dots.
 */
function updateGallery() {
  if (!images.length) {
    return;
  }

  // Move mobile slider
  gallerySliderTrack.style.transform =
    `translateX(-${currentIndex * 100}%)`;

  // Update counter
  galleryCounter.textContent =
    `${currentIndex + 1} / ${images.length}`;

  // Update dots
  const dots = galleryDots.querySelectorAll(".gallery-dot");

  dots.forEach((dot, index) => {
    const targetIndex = getDotTargetIndex(index);

    dot.classList.toggle(
      "active",
      targetIndex === currentIndex,
    );
  });

  // Disable arrows at boundaries
  galleryPrev.disabled = currentIndex === 0;
  galleryNext.disabled =
    currentIndex === images.length - 1;
}

/**
 * Go to specific image.
 */
function goToImage(index) {
  if (!images.length) {
    return;
  }

  currentIndex = Math.max(
    0,
    Math.min(index, images.length - 1),
  );

  updateGallery();
}

/**
 * Next image
 */
function nextImage() {
  if (currentIndex < images.length - 1) {
    currentIndex += 1;
    updateGallery();
  }
}

/**
 * Previous image
 */
function previousImage() {
  if (currentIndex > 0) {
    currentIndex -= 1;
    updateGallery();
  }
}

/**
 * Open modal
 */
function openGallery() {
  galleryModal.classList.add("is-open");
  galleryModal.setAttribute("aria-hidden", "false");

  currentIndex = 0;
  updateGallery();

  // Prevent page/background scrolling
  document.body.classList.add("gallery-open");
}

/**
 * Close modal
 */
function closeGallery() {
  galleryModal.classList.remove("is-open");
  galleryModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("gallery-open");
}

/**
 * View all button
 */
viewImagesButton.addEventListener("click", openGallery);

/**
 * Close button
 */
galleryClose.addEventListener("click", closeGallery);

/**
 * Previous / next
 */
galleryPrev.addEventListener("click", previousImage);
galleryNext.addEventListener("click", nextImage);

/**
 * Clicking outside modal content closes modal.
 */
galleryModal.addEventListener("click", (event) => {
  if (event.target === galleryModal) {
    closeGallery();
  }
});

/**
 * Escape key closes modal.
 */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeGallery();
  }

  if (
    event.key === "ArrowRight" &&
    galleryModal.classList.contains("is-open")
  ) {
    nextImage();
  }

  if (
    event.key === "ArrowLeft" &&
    galleryModal.classList.contains("is-open")
  ) {
    previousImage();
  }
});

/**
 * Touch swipe
 */
gallerySliderTrack.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.touches[0].clientX;
  },
  { passive: true },
);

gallerySliderTrack.addEventListener(
  "touchmove",
  (event) => {
    touchEndX = event.touches[0].clientX;
  },
  { passive: true },
);

gallerySliderTrack.addEventListener(
  "touchend",
  () => {
    const swipeDistance = touchStartX - touchEndX;

    const minimumSwipeDistance = 50;

    if (Math.abs(swipeDistance) < minimumSwipeDistance) {
      return;
    }

    if (swipeDistance > 0) {
      nextImage();
    } else {
      previousImage();
    }

    touchStartX = 0;
    touchEndX = 0;
  },
);

/**
 * Load gallery images.
 */
fetchGalleryImages();