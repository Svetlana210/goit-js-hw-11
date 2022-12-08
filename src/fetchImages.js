const URL = 'https://pixabay.com/api';
const KEY = '31871227-3dd1acdf50445da59bff19bb0';
const fetchImages = async (text, page, perPage) => {
  const response = await fetch(
    `${URL}/?key=${KEY}&q=${text}&u=image_type=photo&orientation=horizontal&saferesearch=true&page=${page}&per_page=${perPage}`
  );
  const photos = await response.json();
  return photos;
};
export { fetchImages };
