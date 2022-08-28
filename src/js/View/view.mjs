export default class View {
  _data;
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
}
