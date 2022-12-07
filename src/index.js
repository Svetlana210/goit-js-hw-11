import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

const createGalleryTemplate = hits => {
  return `
  <a class="gallery-link" href="${hits.largeImageURL}"><img src="${hits.webformatURL}" alt="${hits.tags}" loading="lazy" width="300px" height="180px"/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${hits.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${hits.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${hits.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${hits.downloads}
    </p>
  </div> </a>
`;
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

let text = '';
let page = 1;
let images = [];
let per_page = 40;
// let total = 0;
refs.loadBtn.classList.remove('show');

const render = () => {
  const list = images.map(createGalleryTemplate).join('');

  refs.gallery.insertAdjacentHTML('beforeend', list);
};

const fetchImages = text => {
  return fetch(
    `https://pixabay.com/api/?key=31871227-3dd1acdf50445da59bff19bb0&q=${text}&u=image_type=photo&orientation=horizontal&saferesearch=true&page=${page}&per_page=${per_page}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(photos => {
      // total = photos.totalHits;
      // console.log(total);
      page += 1;
      const totalPage = photos.totalHits / per_page;
      if (photos.hits.length === 0) {
        refs.loadBtn.classList.remove('show');
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      if (totalPage > page) {
        Notiflix.Notify.success(`Hooray! We found ${photos.totalHits} images.`);
        refs.loadBtn.classList.add('show');

        return photos.hits;
      } else {
        refs.loadBtn.classList.remove('show');
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    });
};

const onSubmit = e => {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  text = e.target.elements.searchQuery.value.trim();
  if (text != '') {
    page = 1;
    // console.log(value);
    fetchImages(text).then(hits => {
      images = hits;
      render();
    });
  } else {
    Notiflix.Notify.failure('Write something');
    return;
  }
};
const onLoadMore = () => {
  fetchImages(text).then(
    hits => {
      // if () {
      //   alert(`We're sorry, but you've reached the end of search results.`);
      // } else {
      images = hits;
      render();
    }

    // }
  );
};

refs.form.addEventListener('submit', onSubmit);
refs.loadBtn.addEventListener('click', onLoadMore);
