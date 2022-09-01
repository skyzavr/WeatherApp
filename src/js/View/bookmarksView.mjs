import searchView from './searchView.mjs';
import View from './view.mjs';
class BookmarksView extends View {
  _parentEl = document.querySelector('.BM_Items');
  _generateMarkup() {
    let res = ``;
    const cities = this._data;
    for (const key in cities) {
      res += `
      <div class="bookmarksItem" data-city="${cities[key].city}">
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
}
export default new BookmarksView();
