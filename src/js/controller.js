import "core-js/stable";
import "regenerator-runtime/runtime";

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

if (module.hot) {
  module.hot.accept();
}

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    //Get id from window
    const id = window.location.hash.slice(1);
    if (!id) return renderSpinner(recipeContainer);

    // Render loader
    recipeView.renderSpinner();
    // We are not storing any result in a variable because the loadReciper async function doesn't return anything

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
    resultsView.render(model.state.search.results);
  } catch (error) {
    resultsView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addSearchHandler(controlSearchResults);
};
init();
