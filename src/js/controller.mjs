import * as data from './data.mjs';
import resultView from './View/resultCityView.mjs';
import resultDaysView from './View/ResultDaysView.mjs';
import searchView from './View/searchView.mjs';
function themeSwitch() {
  const el = document.querySelector('body');
  const btn = document.querySelector('.themeSwitchA');
  btn.addEventListener('click', () => el.classList.toggle('dark'));
}
async function loadBigCity() {
  resultView.spinner();
  await data.loadWeather(data.API_URL, 'London Borough of Barnet');
  resultView.render(data.state.weather);
  resultDaysView.render(data.state.weather);
  // console.log(data.state.defaultCities.London);
}
async function loadSearchPanel() {
  searchView.spinner();
  //If LS is empty we'll load thesee cities
  await data.loadSearch(data.API_URL, data.state.defaultCities);
  // if LS aint empty or we'll show the last one search
  //! fix (update area as its elements loads)
  searchView.render(data.state.search);
}
async function loadSearchQuery() {
  const input = document.querySelector('.input_search');
  input.addEventListener('click', () => {
    input.value = '';
    window.addEventListener('keydown', async function (e) {
      if (e.key == 'Enter') {
        searchView.spinner();
        //1)get a string from the input field
        const query = e.target.value;
        //2) get all cities that similar to this cities
        await data.loadCitiesQuery(data.API_CITIES, query || 'Lima');
        //2)load weather info
        await data.loadSearch(data.API_URL, data.state.query);
        //render it
        console.log(data.state.search);
        searchView.render(data.state.search);
      }
    });
  });
}
function innit() {
  themeSwitch();
  loadBigCity();
  loadSearchPanel();
  loadSearchQuery();
}

innit();
