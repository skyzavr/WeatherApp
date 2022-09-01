import View from './view.mjs';

class SearchView extends View {
  _parentEl = document.querySelector('.leftSideResult');
  _generateMarkup() {
    let res = ``;
    const cities = this._data;
    for (const key in cities) {
      res += `
      <div class="searchResult__item" data-city="${cities[key].city}">
      <div class="Item__city" title="${cities[key].city}"> 
      ${cities[key].city.slice(0, 10)}</div>
      <div class="citiItem_block">
        <div class="Item__temp">
          <span class="degree">${cities[key].temp}</span>
          <sup class="degreeSing">&#176;</sup>
        </div>
      </div>
    </div>
      `;
    }
    return res;
  }
  updateStatus(BMList, BM) {
    const searchItems = document.querySelectorAll('.searchResult__item');

    searchItems.forEach((el) => {
      el.addEventListener('click', (e) => {
        if (
          !e.target
            .closest('.searchResult__item')
            .classList.value.includes('selected')
        ) {
          const value = e.target.closest('.searchResult__item').children[0]
            .title;
          BMList.push(this._data[`${value}`]);
          console.log(BMList);
          //!FIX: If I'll search this city again its city won't be selected in search area
          e.target.closest('.searchResult__item').classList.add('selected');
          e.target.closest('.searchResult__item').classList.add('card-hide');

          setTimeout(() => BM(), 300);
        }
      });
    });
  }
}
export default new SearchView();
