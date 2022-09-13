import View from './view.mjs';
class SearchView extends View {
  _message = `There is no such cities (at least we haven't). Sorry, try something else`;
  _parentEl = document.querySelector('.leftSideResult');
  //array of cities that we have in BM list
  _currentBMList = [];
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
          <a href="#" class="showCityBtn"><img class="showBtn" src="src/img/show.svg" title="click to see the city weather forecost" alt="show buttom"></a>
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
      if (this._currentBMList.includes(el.dataset.city)) {
        el.classList.add('selected');
        el.classList.add('card-hide');
      }
      el.addEventListener('click', (e) => {
        if (!this._currentBMList.includes(el.dataset.city))
          this._currentBMList.push(el.dataset.city);
        if (
          !e.target
            .closest('.searchResult__item')
            .classList.value.includes('selected') &&
          !e.target.classList.value.includes('showCityBtn') &&
          !e.target.classList.value.includes('showBtn')
        ) {
          const value = e.target.closest('.searchResult__item').children[0]
            .title;
          BMList.push(this._data[`${value}`]);
          e.target.closest('.searchResult__item').classList.add('selected');
          e.target.closest('.searchResult__item').classList.add('card-hide');
          setTimeout(() => BM(), 300);
        }
      });
    });
  }

  sortingSearchArea() {
    const btns = document.querySelectorAll('.sort_btn');
    btns.forEach((el) => {
      el.addEventListener('click', (e) => {
        const parentEl = document.querySelector('.leftSideResult');
        const sortBtn = e.target.closest('.sort_btn');
        const type = sortBtn.dataset.sort;
        const searchElements = [
          ...document.querySelectorAll('.searchResult__item'),
        ];
        type === 'to'
          ? searchElements.sort(this.sortingAZ)
          : searchElements.sort(this.sortingZA);
        for (let i = 0; i < searchElements.length; ++i) {
          parentEl.appendChild(searchElements[i]);
        }
      });
    });
  }
  sortingAZ(a, b) {
    return a.innerHTML == b.innerHTML ? 0 : a.innerHTML > b.innerHTML ? 1 : -1;
  }
  sortingZA(b, a) {
    return a.innerHTML == b.innerHTML ? 0 : a.innerHTML > b.innerHTML ? 1 : -1;
  }
  //method:check if city is already in bookmarks and always mark it's class as selected card-hide
  //data structure: query and bookmarks
}
export default new SearchView();
