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
        if (this.filtered.length == 0) {
            html = `<div class="error--message"> Aucune recette ne correspond à votre critère… vous pouvez
            chercher « tarte aux pommes », « poisson », etc. </div>`;
        }
        document.querySelector(".main--wrapper").innerHTML = html;
    }

    listenForSearch() {
        document.getElementById("search--bar").addEventListener("input", (e) => {
            let newSearch = e.target.value;
            let oldSearch = this.searchInput;
            if (newSearch.length < 3) {
                this.filtered = this.all;
            }
            if (newSearch.length >= 3) {
                this.searchInput = newSearch.toLowerCase();
                if (oldSearch.length < newSearch.length) {
                    this.search(this.filtered);
                }
                else {
                    this.search(this.all);
                }
            }
            this.display();
            this.filters.forEach(filter => {
                filter.build()
            })
        })
    }

    search(recipes) {
        this.filtered = recipes.filter(recipe => {
            recipe.ingredients.forEach(item => {
                if (item.ingredient.toLowerCase().includes(this.searchInput)) {
                    return true;
                }
            });
            if (recipe.description.toLowerCase().includes(this.searchInput)) {
                return true;
            }
            if (recipe.name.toLowerCase().includes(this.searchInput)) {
                return true;
            } 
            else {
                return false;
            }
        });
    }
}
export default List;