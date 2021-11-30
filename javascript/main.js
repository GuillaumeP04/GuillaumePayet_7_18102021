import List from "./List.js";
import Ingredients from "./Ingredients.js";

let list = new List();
let ingredients = new Ingredients(list);

list.hydrate();
list.display();


ingredients.collect();
ingredients.build();
