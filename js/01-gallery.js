import { galleryItems } from "./gallery-items.js";

const galleryRef = document.querySelector(".gallery");
galleryRef.insertAdjacentHTML("beforeend", createGalleryMarkup(galleryItems));
galleryRef.addEventListener("click", onGalleryItemClick);
let instance;

function createGalleryMarkup(images) {
  return images
    .map(
      ({ preview, original, description }) => `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`
    )
    .join("");
}

function onGalleryItemClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  onModalOpen(event);
}

function onModalOpen(event) {
  window.addEventListener("keydown", onEscKeyPress);
  instance = basicLightbox.create(`<img src="${event.target.dataset.source}">`);
  instance.show();
}

function onEscKeyPress(event) {
  if (event.code === "Escape") {
    onModalClose();
  }
}

function onModalClose() {
  window.removeEventListener("keydown", onEscKeyPress);
  instance.close();
}
