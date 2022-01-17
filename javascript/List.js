import Recipe from "./Recipe.js";

class List {

    constructor() {
        this.all = [];
        this.filtered = [];
        this.filters = [];
        this.searchInput = "";
    }

    addFilter(filter) {
        this.filters.push(filter);
        filter.start();
        filter.build();
    }

    filter(isUnselect = false) {
        if (isUnselect) {
            this.filtered = this.all;
        }
        this.filters.forEach(filter => {
            filter.filterRecipes(this.filtered)
        })
        this.filters.forEach(filter => {
            filter.build()
        })
    }
    
    hydrate() {
        recipes.forEach(item => {
            let recipe = new Recipe(item);
            this.all.push(recipe);
        });
        this.filtered = this.all;
    }

    display() {
        let html = "";
        this.filtered.forEach(item => {
            html += item.render();
        })
        document.getElementById("main--wrapper").innerHTML = html;
    }

    listenForSearch() {
        document.getElementById("search--bar").addEventListener("input", (e) => {
            this.searchInput = e.target.value.toLowerCase();
            if (this.searchInput.length >= 3) {
                if (this.searchInput.length == e.target.value.length) {
                    this.search(this.filtered);
                }
            } else {
                this.search(this.all);
            }
        })
    }

    search(recipes) {
        this.filtered = recipes.filter(recipe => {
            recipe.ingredients.forEach(item => {
                if (item.ingredient.toLowerCase().includes(this.searchInput)) {
                    return true;
                }
            })
            if (recipe.description.toLowerCase().includes(this.searchInput)) {
                return true;
            }
            if (recipe.name.toLowerCase().includes(this.searchInput)) {
                return true;
            } 
            else {
                // document.querySelector("#main--wrapper").innerHTML = `Aucune recette ne correspond à votre critère… vous pouvez
                // chercher tarte aux pommes, poisson , etc.`;
                return false;
            }
        })
        this.display();
        this.filters.forEach(filter => {
            filter.build()
        })
    }
}
export default List;