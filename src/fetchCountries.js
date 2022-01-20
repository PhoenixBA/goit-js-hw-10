export default { fetchCountry };

const BASE_URL = 'https://restcountries.com/v3.1/name/';


async function fetchCountry(name) {
    const response = await fetch(`${BASE_URL}${name}?fields=name,capital,population,flags,anguages`);
    if (!response.ok) {
        throw new Error(response.status);
    }
    return await response.json();
}


