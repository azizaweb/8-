
const countriesElement = document.getElementById('countries');
const searchInput = document.getElementById('search');
const continentSelect = document.getElementById('continent-select');
const toggleDark = document.getElementById('toggle-dark');
let countries = []; // Store the fetched countries

// Fetch all countries
async function fetchCountries() {
    const res = await fetch('https://restcountries.com/v3.1/all');
    countries = await res.json();
    displayCountries(countries);

    // Filter by search input
    searchInput.addEventListener('input', filterCountries);
    // Filter by continent selection
    continentSelect.addEventListener('change', filterCountries);
}

// Filter countries based on search input and continent
function filterCountries() {
    const searchQuery = searchInput.value.toLowerCase();
    const selectedContinent = continentSelect.value;
    
    // Filter by both search query and selected continent
    const filtered = countries.filter(country => {
        const matchesSearch = country.name.common.toLowerCase().includes(searchQuery);
        const matchesContinent = selectedContinent === 'all' || country.region === selectedContinent;
        return matchesSearch && matchesContinent;
    });

    displayCountries(filtered);
}

// Display countries on the page
function displayCountries(countries) {
    countriesElement.innerHTML = "";
    countries.forEach(country => {
        const card = document.createElement("div");
        card.classList.add("country-card");

        card.innerHTML = `
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" />
            <p>${country.name.common}</p>
        `;
    
        countriesElement.appendChild(card);
    });
}


toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
}

fetchCountries();
