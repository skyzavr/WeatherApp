export default class View {
  _data;
  _message;
  render(data) {
    if (!data) return 'error'; //must return some kinf of func
    this._data = data;
    // const markUp = this._generateMarkup(this._data);
    const markUp = this._generateMarkup();
    this.clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  }
  clear() {
    this._parentEl.innerHTML = '';
  }
  spinner() {
    this.clear();
    const markup = `<div class="spinner">
    <div><img src="src/img/spinner.svg"> </div>
    </div>`;
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(
    message = this._message ||
      `There was some mistake, I don't know what yet, but it will be fixed by asap`
  ) {
    this.clear();
    const markup = `<div class="searchResult__item">${message} </div>`;
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
