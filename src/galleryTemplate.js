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
  </div> </a>`;
};
export { createGalleryTemplate };
