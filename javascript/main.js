import List from "./List.js";
import Ingredient from "./Ingredient.js";
import Appareil from "./Appareil.js";
// import Ustensiles from "./Ustensiles.js"
import Search from "./Search.js";

let list = new List();
let ingredient = new Ingredient(list);
let appareil = new Appareil(list);
// let ustensiles = new Ustensiles(list);
let search = new Search(list, ingredient, appareil);

list.hydrate();
list.display();
list.addFilters(ingredient);
list.addFilters(appareil);
// list.addFilters(ustensiles);

search.listenForFilter();