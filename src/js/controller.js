import "core-js/stable";
import "regenerator-runtime/runtime";

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    //Get id from window
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Render loader
    recipeView.renderSpinner();
    // We are not storing any result in a variable because the loadReciper async function doesn't return anything

    //Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    // Updating Bookmark view
    bookmarksView.update(model.state.bookmarks);

    //Load Recipe and render content
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // Load Query
    const query = searchView.getQuery();
    if (!query) return;

    // Load and render search results
    await model.loadSearchResult(`${query}`);
    // render all results
    // resultsView.render(model.state.search.results);

    //render results per page
    resultsView.render(model.getSearchResultsPage(1));

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    resultsView.renderError();
  }
};

function controlPagination(goToPage) {
  //render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render new pagination buttons
  paginationView.render(model.state.search);
}

function controlServings(newServings) {
  // Update the recipe servings in state
  model.updateServings(newServings);
  // Update recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

function controlAddBookmark() {
  // Add or remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }
  // Update Recipe View
  recipeView.update(model.state.recipe);

  // Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
}

function controlBookmarks() {
  bookmarksView.render(model.state.bookmarks);
}

const init = function () {
  bookmarksView.addRenderHandler(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addUpdateServingsHandler(controlServings);
  recipeView.addAddBookmarkHandler(controlAddBookmark);
  searchView.addSearchHandler(controlSearchResults);
  paginationView.addClickHandler(controlPagination);
};
init();
