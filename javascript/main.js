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
list.addFilter(ingredient);
list.addFilter(appareil);
// list.addFilter(ustensiles);
list.updateFilter();

// ingredient.start();
// ingredient.build();

// appareil.collect();
// appareil.build();

// ustensiles.collect();
// ustensiles.build();