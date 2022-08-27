import View from './view.mjs';

class resultCityView extends View {
  _parentEl = document.querySelector('.bigCityBlock');
  _generateMarkup(city) {
    const date = city.date.toDateString().slice(0, -5);
    return `
        <div class="block_city">
        <div class="block_city_city">${city.city}</div>
        <div class="block_city_temp">
            <div class="temp">${city.temp.slice(0, -2)} <sup>&#176;</sup></div>
            <div class="tempSign">
            <img src="src/img/cloudly.svg" alt="" />
            </div>
        </div>
        </div>
        <div class="block_day">
        <span class="DayWeek">Today</span>
        <span class="Date">${date}</span>
        </div>
        <div class="block_weath">${city.desc}</div>
        <div class="block_line">
        <div class="line"></div>
        </div>
        <div class="block_wind">
        <div class="wind_tit">Wind</div>
        <div class="wind_val">${city.wind}</div>
        </div>

    `;
  }
}
export default new resultCityView();
