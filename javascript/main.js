import List from "./List.js";
import Ingredients from "./Ingredients.js";
import Appareil from "./Appareil.js";
import Ustensiles from "./Ustensiles.js"

let list = new List();
let ingredients = new Ingredients(list);
let appareil = new Appareil(list);
// let ustensiles = new Ustensiles(list);

list.hydrate();
list.display();

ingredients.collect();
ingredients.build();

appareil.collect();
appareil.build();

// ustensiles.collect();
// ustensiles.build();