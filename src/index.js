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
    fetchCountries(search)
        .then(r => {
                if (r.length > 10) {
            
                    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                    return null;
                };
                 if (2 <= r.length && r.length < 10) {
                      
                    for (const country of r) {
                    console.log(country);
                    };
                }
                 else {
                      
                    for (const country of r) {
                     console.log(country);
                     };
                };
        });;
}
    // fetchCountries(search);


 function fetchCountries(name) {
        const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
        return fetch(url)
            .then(r => {
                return r.json()
            })
            
    }
