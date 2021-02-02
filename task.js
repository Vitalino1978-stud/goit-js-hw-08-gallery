import galleryItems from "./js/gallery-items.js"


const galleryRef = document.querySelector('.gallery');

const createGallery = (gallery_item) => {
  const liRef = document.createElement('li');
  liRef.classList.add("gallery__item");
  const aRef = document.createElement('a');
  aRef.classList.add("gallery__link");
  aRef.setAttribute("href", gallery_item.original)
  const imgRef = document.createElement('img');
  imgRef.classList.add("gallery__image");
  imgRef.setAttribute("src", gallery_item.preview);
  imgRef.setAttribute('data-source', gallery_item.original);
  imgRef.setAttribute('alt', gallery_item.description);
  aRef.appendChild(imgRef);
  liRef.appendChild(aRef);
  return liRef;
  
};
const arr = galleryItems.map(item => createGallery(item))
//console.log(...arr);
galleryRef.append(...arr);

const galleryOnClick = (event) => {
  event.preventDefault()
  console.log(event.target);
  // event.target.getAttribute("data-source")
  const bigImage = document.querySelector(".lightbox__image");
  const modalWindow = document.querySelector(".js-lightbox");
  modalWindow.classList.add("is-open");
  bigImage.setAttribute("src", event.target.getAttribute("data-source"));
  
}
const galleryClose = (event) => {
  document.querySelector(".js-lightbox").classList.remove("is-open");
  document.querySelector(".lightbox__image").setAttribute("src", "");
}
const closeButtonRef = document.querySelector(".lightbox__button");
// closeButtonRef.addEventListener('click', galleryClose);
galleryRef.addEventListener('click', galleryOnClick);

const closeModalWindow = (event) => {
  let target = event.target;
  while (target.tagName != "BODY") {

    if (target.tagName == 'BUTTON' || target.classList.contains('lightbox__overlay')){
  galleryClose();
  return;
    }
    if (target.classList.contains('js-lightbox')) {
      return;
    }
    if (target.classList.contains('gallery')) {
      return;
    }
target = target.parentNode;

}
 galleryClose();
}

const closeByEscape = (event) => {
  if (event.key === 'Escape') {
    galleryClose();
  }

}


const bodyRef = document.querySelector('body');
bodyRef.addEventListener('click', closeModalWindow);
window.addEventListener('keydown', closeByEscape);




