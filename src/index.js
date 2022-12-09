import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './fetchImages';
import { createGalleryTemplate } from './galleryTemplate';
import { onScroll, onToTopBtn } from './scrolls';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

// const onScroll = () => {
//   const { height: cardHeight } = refs.gallery
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// };

const lightbox = new SimpleLightbox('.gallery a', {
  captions: false,
  scrollZoom: false,
});

let query = '';
let page = 1;
let images = [];
let perPage = 40;
// let total = 0;
refs.loadBtn.classList.remove('show');

const render = () => {
  const list = images.map(createGalleryTemplate).join('');

  refs.gallery.insertAdjacentHTML('beforeend', list);
};

const onSubmit = async e => {
  e.preventDefault();
  window.scrollTo({ top: 0 });
  refs.gallery.innerHTML = '';
  query = e.target.elements.searchQuery.value.trim();
  page = 1;

  if (query === '') {
    refs.loadBtn.classList.remove('show');
    Notiflix.Notify.failure('Please write something');
    return;
  }
  const photos = await fetchImages(query, page, perPage);
  if (photos.totalHits === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    refs.loadBtn.classList.remove('show');
    return;
  } else {
    refs.loadBtn.classList.add('show');
    images = photos.hits;
    render();
    Notiflix.Notify.success(`Hooray! We found ${photos.totalHits} images.`);
    refs.form.reset();
    lightbox.refresh();
    // onScroll();
  }
};
const onLoadMore = async () => {
  page += 1;
  const photos = await fetchImages(query, page, perPage);
  images = photos.hits;
  render();
  lightbox.refresh();
  const totalPage = photos.totalHits / perPage;
  if (totalPage < page) {
    refs.loadBtn.classList.remove('show');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
};

refs.form.addEventListener('submit', onSubmit);
refs.loadBtn.addEventListener('click', onLoadMore);
onScroll();
onToTopBtn();
