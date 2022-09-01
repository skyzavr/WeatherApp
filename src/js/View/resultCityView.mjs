import View from './view.mjs';

class resultCityView extends View {
  _parentEl = document.querySelector('.bigCityBlock');
  _generateMarkup() {
    const date = this._data.date.toDateString().slice(0, -5);
    return `
        <div class="block_city">
        <div class="block_city_city">${this._data.city}</div>
        <div class="block_city_temp">
            <div class="temp">${this._data.temp.slice(
              0,
              -2
            )} <sup>&#176;</sup></div>
            <div class="tempSign">
            <img src="${this._data.icon}" alt=" ${
      this._data.dataWeath
    }" title="${this._data.city} city ${this._data.dataWeath} weather"/>
            </div>
        </div>
        </div>
        <div class="block_day">
        <span class="DayWeek">Today</span>
        <span class="Date">${date}</span>
        </div>
        <div class="block_weath">${this._data.desc}</div>
        <div class="block_line">
        <div class="line"></div>
        </div>
        <div class="block_wind">
        <div class="wind_tit">Wind</div>
        <div class="wind_val">${this._data.wind}</div>
        </div>

    `;
  }
}
export default new resultCityView();
