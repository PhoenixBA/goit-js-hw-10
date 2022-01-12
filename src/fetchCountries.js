export default { fetchCountry };

const BASE_URL = 'https://restcountries.com/v3.1/name/';


function fetchCountry(name) {
    return fetch(`${BASE_URL}${name}?fields=name,capital,population,flags,anguages`)
        .then(response => response.json())
}

