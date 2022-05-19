import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// Додатковий імпорт стилів
import "notiflix/dist/notiflix-3.2.5.min.css";

const DEBOUNCE_DELAY = 300;


const refs = {
    searchForm: document.querySelector('input#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};




refs.searchForm.addEventListener('input', debounce(inputSearch, DEBOUNCE_DELAY));

function inputSearch(e) {
    const search = e.target.value;
   
    fetchCountries(search.trim())
        .then(r => {
                if (r.length > 10) {
                    refs.countryInfo.innerHTML = ' ';
                    refs.countryList.innerHTML = ' ';
                    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                    return null;
                };
                 if (2 <= r.length && r.length < 10) {
                      
                    for (const country of r) {
                        console.log(country);
                        refs.countryInfo.innerHTML = ' ';
                        refs.countryList.insertAdjacentHTML('afterbegin', makeCountryListElement(country));
                    };
                }
                 else {
                      
                    for (const country of r) {
                        console.log(country);
                        refs.countryList.innerHTML = ' ';
                        refs.countryInfo.insertAdjacentHTML('afterbegin', makeContryInfo(country));
                     };
                };
        })
        .catch(error => {
            refs.countryInfo.innerHTML = ' ';
            refs.countryList.innerHTML = ' ';
             Notiflix.Notify.failure("Oops, there is no country with that name");
        } );
};
   

 function fetchCountries(name) {
        const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
        return fetch(url)
            .then(r => {
                return r.json()
            })
            
};

function makeCountryListElement({flags, name }) {
    return `<li class = 'country-list__item'>
    <img src = '${flags.svg}' alt = '${name.official} flag' width="60px" heigth = '30px'>
    <p class = 'item__text'>${name.official}</p>
    </li>`
};

function makeContryInfo({ name, capital, flags, population, languages }) {
    return `<img src = '${flags.svg}' alt = '${name.official} flag' width="60px" heigth = '30px'>
    <p class = 'item__text'>${name.official}</p>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${Object.values(languages)}</p>`
}

