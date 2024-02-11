import View from "./view.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addClickHandler(handler) {
    // We are using Event delegation here
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateHTML() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateNextButton(curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generatePrevButton(curPage);
    }
    // Other pages
    if (curPage < numPages) {
      return `${this._generatePrevButton(curPage)}
      ${this._generateNextButton(curPage)}`;
    }
    // Page 1 and there are no other pages
    return "";
  }

  _generatePrevButton(curPage) {
    return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        `;
  }

  _generateNextButton(curPage) {
    return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
  }
}

export default new PaginationView();
