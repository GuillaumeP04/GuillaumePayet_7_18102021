import List from "./List.js";
import Ingredients from "./Ingredients.js";
import Recipe from "./Recipe.js";

let list = new List();
let ingredients = new Ingredients(list);
let recipe = new Recipe(recipes);

list.hydrate();
list.display();


ingredients.hydrate();
ingredients.display().then(() => {
    ingredients.listenForFilter();
    // ingredients.listenForSelection();
})
