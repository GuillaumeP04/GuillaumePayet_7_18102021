import List from "./List.js";
import Ingredient from "./Ingredient.js";
import Appareil from "./Appareil.js";
// import Ustensiles from "./Ustensiles.js"

let list = new List();
let ingredient = new Ingredient(list);
let appareil = new Appareil(list);
// let ustensiles = new Ustensiles(list);

list.hydrate();
list.display();
// list.addFilters(ingredient);
// list.addFilters(appareil);
// // list.addFilter(ustensiles);
// list.updateFilters();
// list.display();

ingredient.start();
ingredient.build();

appareil.start();
appareil.build();

// ustensiles.start();
// ustensiles.build();