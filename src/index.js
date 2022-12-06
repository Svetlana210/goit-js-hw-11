// import './css/styles.css';
// import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';
// import { fetchCountries } from './fetchCountries';

// const DEBOUNCE_DELAY = 300;

// const refs = {
//   input: document.querySelector('#search-box'),
//   countryList: document.querySelector('.country-list'),
//   countryDiv: document.querySelector('.country-info'),
// };

// const clearCountryData = () => {
//   refs.countryList.innerHTML = '';
//   refs.countryDiv.innerHTML = '';
// };

// const getArrayTemplate = ({ name, flags }) => {
//   return `<li class="item"><img src="${flags.svg}" alt="${name.official}" width="70" height="40">${name.official}</li>`;
// };
// const getCountryTemplate = ({
//   name,
//   capital,
//   population,
//   flags,
//   languages,
// }) => {
//   return `<h1 class="country-heading">
//       <img class="flag" src="${flags.svg}" alt="..." width=80" height="50" />
//       ${name.official}
//     </h1>
//     <p class="info">Capital: <span class="capital">${capital}</span></p>
//     <p class="info">Population: <span class="popualtion">${population}</span></p>
//     <p class="info">Languages: <span class="language">${Object.values(
//       languages
//     )}</span></p>`;
// };
// let items = [];
// const renderArray = () => {
//   const list = items.map(getArrayTemplate).join('');

//   refs.countryList.innerHTML = '';
//   refs.countryList.insertAdjacentHTML('beforeend', list);
// };
// const renderCountry = () => {
//   // console.log(items);
//   const country = items.map(getCountryTemplate).join('');

//   refs.countryDiv.innerHTML = '';
//   refs.countryDiv.insertAdjacentHTML('beforeend', country);
// };

// const searchCountry = e => {
//   e.preventDefault();
//   const value = e.target.value.trim();
//   clearCountryData();
//   if (value !== '') {
//     fetchCountries(value)
//       .then(countries => {
//         if (countries.length > 10) {
//           Notiflix.Notify.info(
//             'Too many matches found. Please enter a more specific name.'
//           );
//         } else if (countries.length > 1 && countries.length <= 10) {
//           items = countries;
//           // clearCountryData();
//           renderArray();
//         } else if (countries.length === 1) {
//           items = countries;
//           // clearCountryData();
//           renderCountry();
//         }
//       })
//       .catch(error => {
//         Notiflix.Notify.failure('Oops, there is no country with that name');
//       });
//   }
// };

// refs.input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
