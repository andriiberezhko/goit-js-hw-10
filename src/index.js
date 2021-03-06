import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';
import countryListTpl from './countryListElement.hbs';
import countryInfoTpl from './countryInfo.hbs';
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
    const search = e.target.value.trim();
    if (!search) {
        clearMarckup();
        return;
    };
   
    fetchCountries(search)
        .then(country => {
            if (country.length > 10) {
                clearMarckup()
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                return;
            };
            if (2 <= country.length && country.length <= 10) {
                clearMarckup()
                refs.countryList.insertAdjacentHTML('afterbegin', countryListTpl(country));                                      
            }
            else {
                clearMarckup();                            
                refs.countryInfo.insertAdjacentHTML('afterbegin', countryInfoTpl(country));                                      
            };
        })
        .catch(error => {
            clearMarckup();
            console.log("Oops, there is no country with that name");
            return Notiflix.Notify.failure("Oops, there is no country with that name");
        });
        
}; 


function clearMarckup() {
  refs.countryInfo.innerHTML = ' ';
  refs.countryList.innerHTML = ' ';   
}

