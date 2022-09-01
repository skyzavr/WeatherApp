import View from './view.mjs';
class BookmarksView extends View {
  _parentEl = document.querySelector('.BM_Items');
  _generateMarkup() {
    let res = ``;
    const cities = this._data;
    for (const key in cities) {
      res += `
      <div class="bookmarksItem" >
        <!-- top side of city card -->
        <div class="BMItem__city">
          <div class="BM_city">${cities[key].city}</div>
          <div class="BM_temp">
            <div class="temp_city">
              <span class="degree">${cities[key].temp}</span>
              <sup class="degreeSing">&#176;</sup>
            </div>
            <div class="temp__img">
              <img
                src="src/img/cloudly.svg"
                class="wheater_icon"
                alt="current city wheather icon"
              />
            </div>
          </div>
        </div>
        <!-- bottom side of city card -->
        <div class="BMItem__weather">
          <div class="top_line">
            <div>${cities[key].desc}</div>

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
}
export default new BookmarksView();
