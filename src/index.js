import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './fetchImages';
import { createGalleryTemplate } from './galleryTemplate';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

let text = '';
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
  refs.gallery.innerHTML = '';
  text = e.target.elements.searchQuery.value.trim();
  page = 1;
  if (text === '') {
    Notiflix.Notify.failure('Please write something');
    return;
  }
  await fetchImages(text, page, perPage).then(photos => {
    if (photos.totalHits === 0) {
      refs.loadBtn.classList.remove('show');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else {
      refs.loadBtn.classList.add('show');
      images = photos.hits;
      render();
      Notiflix.Notify.success(`Hooray! We found ${photos.totalHits} images.`);
    }
  });
};
const onLoadMore = async () => {
  page += 1;
  await fetchImages(text, page, perPage).then(photos => {
    images = photos.hits;
    render();
    const totalPage = photos.totalHits / perPage;
    if (totalPage < page) {
      refs.loadBtn.classList.remove('show');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
};

refs.form.addEventListener('submit', onSubmit);
refs.loadBtn.addEventListener('click', onLoadMore);
