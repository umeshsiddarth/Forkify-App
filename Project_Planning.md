# Project Planning

## User Stories

- I want to **search recipes**, so that I can find new ideas for meals.
- I want to be able to **update the number of servings**, so that I can cook a meal for different number of people.
- I want to **bookmark recipes**, so that I can review them later.
- I want to be able to **create my own recipe**, so that I can have them all organized in the same app.
- I want to be able to **see my bookmarks and own recipes when I leave the app and come back later**, so that I can close the app safely.

## Features

### Search for recipes

- Search functionality: input field to send request to API with searched keywords
- Display results with pagination
- Display recipe with cooking time, servings and ingredients

### Update the number of servings

- Change servings functionality, update all ingredients according to current number of servings.

### Bookmark recipes

- Bookmarking functionality: Display list of all bookmarked recipes

### Create own recipes

- User can upload own recipes
- User recipes will automatically be bookmarked
- User can only see their own recipe, not recipe from other users (We will implement this using API key per user and not the user account method)

### Store bookmarks and recipes

- Store bookmark data in the browser using local storage
- On page load, read saved bookmarks from local storage and display
