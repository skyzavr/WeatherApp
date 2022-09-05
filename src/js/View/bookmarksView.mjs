import View from './view.mjs';
class BookmarksView extends View {
  _parentEl = document.querySelector('.BM_Items');
  _generateMarkup() {
    let res = ``;
    const cities = this._data;
    for (const key in cities) {
      res += `
      <div class="bookmarksItem" data-city="${
        cities[key].city
      }" data-weather="${cities[key].dataWeath}">
        <!-- top side of city card -->
        <div class="BMItem__city">
          <div class="BM_city" title="${cities[key].city}">${cities[
        key
      ].city.slice(0, 10)}</div>
          <div class="BM_temp">
            <div class="temp_city">
              <span class="degree">${cities[key].temp}</span>
              <sup class="degreeSing">&#176;</sup>
            </div>
            <div class="temp__img">
              <img src="${cities[key].icon}"
                class="wheater_icon"
                alt="${cities[key].city} city ${cities[key].dataWeath} icon"
                title="${cities[key].city} 
                city ${cities[key].dataWeath} weather"/>
            </div>
          </div>
        </div>
        <!-- bottom side of city card -->
        <div class="BMItem__weather">
          <div class="top_line">
            <div>${cities[key].desc}</div>
            <div > <a href="#" class="delete_BM"> &#10006;</a></div>
          </div>
          <div class="bottom_line">
            <div class="bottom_line_wind">Wind</div>
            <div class="bottom_line_windRes">${cities[key].wind}</div>
          </div>
        </div>
      </div>
      `;
    }
    return res;
  }
  updateBM(BMList) {
    const BMItems = document.querySelectorAll('.delete_BM');
    BMItems.forEach((el) =>
      //if we wanna delete this bookmark
      el.addEventListener('click', (e) => {
        const city = e.target.closest('.bookmarksItem');
        const cityName = city.dataset.city;
        const SearchAreaEls = document.querySelectorAll('.searchResult__item');
        const ind = BMList.findIndex((el) => el.city === cityName);
        //show back in search area
        SearchAreaEls.forEach((el) => {
          if (el.dataset.city === cityName) {
            el.classList.remove('selected');
            el.classList.remove('card-hide');
          }
        });
        //update bookmarks list
        city.style.display = 'none';
        BMList.splice(ind, 1);
      })
    );
  }

  filter() {
    const FilterBtns = document.querySelectorAll('.filter__item');
    const weatherBM = document.querySelectorAll('.bookmarksItem');
    let prevBtn = '';
    FilterBtns.forEach((el) =>
      el.addEventListener('click', (e) => {
        const weatherBtn = e.target.closest('.filter__item');
        const weatherBtnData = weatherBtn.dataset.weather;
        weatherBM.forEach((el) => {
          this.containsWeather(weatherBM, weatherBtnData)
            ? this.renderFilterCards(el, weatherBtnData)
            : el.classList.remove('hideBM');
        });
        //mark filter btn as active
        if (!prevBtn) weatherBtn.children[0].classList.add('current');
        if (prevBtn && prevBtn !== weatherBtn) {
          prevBtn.children[0].classList.remove('current');
          weatherBtn.children[0].classList.add('current');
        }
        prevBtn = weatherBtn;
      })
    );
  }
  containsWeather(listOfBM, weather) {
    const weatherData = [];
    listOfBM.forEach((el) => weatherData.push(el.dataset.weather));
    const contaits = weatherData.includes(weather);
    return contaits;
  }
  renderFilterCards(el, data) {
    el.dataset.weather !== data
      ? el.classList.add('hideBM')
      : el.classList.remove('hideBM');
  }
}
export default new BookmarksView();
