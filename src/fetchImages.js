// const { default: axios } = require('axios');
const axios = require('axios').default;
const URL = 'https://pixabay.com/api';
const KEY = '31871227-3dd1acdf50445da59bff19bb0';
const fetchImages = async (query, page, perPage) => {
  const { data } = await axios.get(
    `${URL}/?key=${KEY}&q=${query}&u=image_type=photo&orientation=horizontal&saferesearch=true&page=${page}&per_page=${perPage}`
  );
  return data;
};
export { fetchImages };
