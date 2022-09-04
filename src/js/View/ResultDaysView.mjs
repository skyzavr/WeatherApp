import View from './view.mjs';
class ResultDaysView extends View {
  _parentEl = document.querySelector('.daysCityBlock');
  _generateMarkup() {
    let res = '';
    const date = this._data.date;
    this._data.days.map((el, ind) => {
      const newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + ind + 1
      );
      const temp = el.temperature.slice(0, -2);
      const wind = el.wind.slice(0, -4);
      res += `<div class="blockItem">
        <div class="item_Weekday ${ind === 0 ? 'tomorrow' : ''} ">Tomorrow</div>
        <div class="item_day">
          <div class="day">${newDate.toDateString().slice(0, -5)}</div>
          <div class="temp" title="${
            temp === ' ' ? 'ND means No Data about it' : 'temp'
          }">${temp === ' ' ? 'ND' : temp + `<sup>&#176;</sup>`} 
         </div>
        </div>
        <div class="item_wind">
          <div class="wind">Wind</div>
          <div class="windVal" title="${
            wind === ' ' ? 'ND means No Data about it' : 'wind'
          }">${wind === ' ' ? 'ND' : wind + 'km/h'}</div>
        </div>
      </div>`;
    });
    return res;
  }
}
export default new ResultDaysView();
