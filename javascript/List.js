import Recipe from "./Recipe.js";

class List {

    constructor() {
        this.all = [];
        this.filtered = [];
        this.filters = [];
    }

    addFilters(filter) {
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
}
export default List;