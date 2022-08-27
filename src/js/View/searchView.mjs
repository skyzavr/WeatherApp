import View from './view.mjs';
class SearchView extends View {
  _parentEl = document.querySelector('.leftSideResult');
  _generateMarkup(cities) {
    let res = ``;
    for (const key in cities) {
      res += `
      <div class="searchResult__item" draggable="true">
      <div class="Item__city">${cities[key].city}</div>
      <div class="citiItem_block">
        <div class="Item__temp">
          <span class="degree">${cities[key].temp}</span>
          <sup class="degreeSing">&#176;</sup>
        </div>
        <a href="#">
          <div class="Item__drag">
            <div class="drag__sign"></div>
            <div class="drag__sign"></div>
          </div>
        </a>
      </div>
    </div>
      `;
    }
    return res;
  }
}
export default new SearchView();
