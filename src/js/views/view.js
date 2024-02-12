import icons from "url:../../img/icons.svg";

export default class View {
  _data;
  // We are adding 2nd parameter render = true/false because in bookmark view and result view tha child class preview view itself will try to generate a markup but we are in need of a string. We need to use the render method in bookmark and resultssview because of the requirement to pass in data. To counter this we are adding a 2nd parameter and based on its value the render method will work.
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const html = this._generateHTML();

    if (!render) return html;

    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", html);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  update(data) {
    this._data = data;
    const newHtml = this._generateHTML();

    const newDOM = document.createRange().createContextualFragment(newHtml);
    const newElements = Array.from(newDOM.querySelectorAll("*")); // This returns all the elements in the new DOM as a nodelist.
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      //Updates changed Text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      //Updates Changed Attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  renderSpinner() {
    const html = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  renderError(message = this._errorMessage) {
    const html = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  renderSuccessMessage(message = this._successMessage) {
    const html = `
      <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
}
