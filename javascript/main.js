import Structure from "./Structure.js";
import Ingredients from "./Ingredients.js";

let structure = new Structure();

structure.display();

let ingredients = new Ingredients();

ingredients.hydrate();
ingredients.listenForFilter();