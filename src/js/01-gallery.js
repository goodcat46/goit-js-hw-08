// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line


import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";
// console.log(galleryItems);

let galleryEl = document.querySelector('.gallery');
console.log(galleryEl);


function createGalery() {
    const createGalleryItem = element => {
      const { preview, original, description } = element;
      return `
      <a class="gallery__item" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>`;
    };
  
    const galleryItemsArray = (galleryItems.map(el => {
      return createGalleryItem(el);
    })).join('');
  
    galleryEl.insertAdjacentHTML('afterbegin', galleryItemsArray);
  }
  createGalery();


  let gallery = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250});
