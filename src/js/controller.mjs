import * as data from './data.mjs';
import bookmarksView from './View/bookmarksView.mjs';
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
  console.log(data.state.search);
  if (Object.keys(data.state.search).length === 0)
    await data.loadSearch(data.API_URL, data.state.defaultCities);
  // if LS aint empty or we'll show the last one search
  searchView.render(data.state.search);
  searchView.updateStatus(data.bookmarks, loadBookmarks);
  bookmarksView.updateBM(data.bookmarks);
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
        searchView.render(data.state.search);
        searchView.updateStatus(data.bookmarks, loadBookmarks);
        bookmarksView.updateBM(data.bookmarks);
      }
    });
  });
}
async function loadBookmarks() {
  const bookMarksCont = document.querySelector('.BM_Items');
  if (data.bookmarks.length === 0) {
    bookMarksCont.innerHTML =
      '<p class="BM_msg">Sorry, there is no any bookmarks here. Click on any city to safe it here</p>';
    return;
  }
  bookmarksView.render(data.bookmarks);
  bookmarksView.updateBM(data.bookmarks);
}

function innit() {
  themeSwitch();
  loadBigCity();
  loadSearchPanel();
  loadSearchQuery();
  loadBookmarks();
}

innit();
