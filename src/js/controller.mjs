import * as data from './data.mjs';
import resultView from './View/resultCityView.mjs';
import resultDaysView from './View/ResultDaysView.mjs';
import searchView from './View/searchView.mjs';
function themeSwitch() {
  const el = document.querySelector('body');
  const btn = document.querySelector('.themeSwitch');
  btn.addEventListener('click', () => el.classList.toggle('dark'));
}
async function loadBigCity() {
  resultView.spinner();
  await data.loadWeather('Lima');
  resultView.render(data.state.weather);
  resultDaysView.render(data.state.weather);
  console.log(data.state.defaultCities.London);
}
async function loadSearchPanel() {
  searchView.spinner();
  await data.loadSearch(data.state.defaultCities);
  //! fix (update area as its elements loads)
  searchView.render(data.state.defaultCities);
}
function innit() {
  themeSwitch();
  loadBigCity();
  loadSearchPanel();
}

innit();
