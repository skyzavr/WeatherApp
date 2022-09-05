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
async function Search_Bookmarks() {
  searchView.render(data.state.search);
  searchView.updateStatus(data.bookmarks, loadBookmarks);
  const showBtns = document.querySelectorAll('.showCityBtn');
  showBtns.forEach((el) => {
    el.addEventListener('click', (e) => {
      if (!el || !e.target.classList.value.includes('showBtn')) return;
      const city = e.target.closest('.searchResult__item').dataset.city;
      loadBigCity(city);
    });
  });
  bookmarksView.updateBM(data.bookmarks);
}
async function loadBigCity(city) {
  //we we'll show big city and small city cards
  const bigCItyCard = document.querySelector('.bigCityBlock');
  resultView.spinner();
  if (!city) {
    return (bigCItyCard.innerHTML =
      'Sorry, there is no any city yet. Please, click on any city from your bookmark or use search area for this :)');
  }
  await data.loadWeather(data.API_URL, city);
  resultView.render(data.state.weather);
  resultDaysView.render(data.state.weather);
}
async function loadSearchPanel() {
  searchView.spinner();
  //TODO If LS is empty we'll load thesee cities
  console.log(data.state.search);
  if (Object.keys(data.state.search).length === 0) {
    await data.loadSearch(data.API_URL, data.state.defaultCities);
  }
  //TODO if LS aint empty or we'll show the last one search
  Search_Bookmarks();
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
        Search_Bookmarks();
      }
    });
  });
}
async function loadBookmarks() {
  const bookMarksCont = document.querySelector('.BM_Items');
  if (data.bookmarks.length === 0) {
    return (bookMarksCont.innerHTML =
      '<p class="BM_msg">Sorry, there is no any bookmarks here. Click on any city to safe it here</p>');
  }
  bookmarksView.render(data.bookmarks);
  bookmarksView.updateBM(data.bookmarks);
  const bmList = document.querySelectorAll('.bookmarksItem');
  //if we click on bookmarks
  bmList.forEach((el, ind) =>
    el.addEventListener('click', (e) => {
      if (!e.target.classList.value.includes('delete_BM')) {
        const city = e.target.closest('.BM_Items').children[ind].dataset.city;
        loadBigCity(city);
      }
    })
  );
  //filtring
  bookmarksView.filter();
}

function innit() {
  themeSwitch();
  loadBigCity();
  loadSearchPanel();
  loadSearchQuery();
  loadBookmarks();
}

innit();
//TODO
//filter
//sort
//error handler
//local storage
//refactor data.mjs
//fix problem with search and bookmarks
