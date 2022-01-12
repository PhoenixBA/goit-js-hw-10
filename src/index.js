import './css/styles.css';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import API from './fetchCountries';


const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox: document.querySelector('#search-box'),
    listCountry: document.querySelector('.country-list'),
    infoCountry: document.querySelector('.country-info'),
}

refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

function onSearch(event) {
    event.preventDefault();

    const name = event.target.value.trim(); 

    if (name === '') {
        refs.listCountry.innerHTML = '';
        refs.infoCountry.innerHTML = '';
        return;
    }

    API.fetchCountry(name)
        .then(renderCountryList)
        .catch(error => {
            Notify.failure("Oops, there is no country with that name")
            refs.listCountry.innerHTML = '';
            refs.infoCountry.innerHTML = '';
            return error;
        })
        .finally(() => {
            console.log('в любом случае');
    })
}

function renderCountryList(countries) {

    if (countries.leangth >= 10) {
        Notify.info("Too many matches found. Please enter a more specific name.")
        refs.infoCountry.innerHTML = '';
        refs.listCountry.innerHTML = '';
        return;
    } else if (countries.length >= 2) { 
        const markup = countries.map(country => countryNameFlag(country));
        refs.infoCountry.innerHTML = '';
        refs.listCountry.innerHTML = markup.join('');
        return;
    } else {
        const markup = countries.map(country => countryCardInfo(country));
        refs.infoCountry.innerHTML = markup.join('');
        refs.listCountry.innerHTML = '';
        
    }
    
}
//вынесла это все что бы не засорять основной код
function countryCardInfo({capital, population, languages}) {
    return `<ul class="country-info_list">
    <li class="country-info__card"><p><b>Capital: </b>${capital}</p></li>
    <li class="country-info__card"><p><b>Population: </b>${population}</p></li>
    <li class="country-info__card"><p><b>Languages: </b>${Object.values(languages)}</p></li>
    </ul>`
}

function countryNameFlag({ flags, name }) {
    return `<li class="country-list__item">
    <img class="country-list__flag" src="${flags.svg}" alt="${name.official}" width = 30px haight = 30px/>
    <h1 class="country-list__name">${name.official}</h1>
    </li>`
}