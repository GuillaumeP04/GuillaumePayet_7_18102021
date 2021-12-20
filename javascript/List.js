import Recipe from "./Recipe.js";

class List {

    constructor() {
        this.all = [];
        this.filtered = [];
        this.filters = [];
    }

    addFilter(filter) {
        this.filters.push(filter);
        filter.start();
        filter.build();
    }

    updateFilter() {
        this.filters.forEach(filter => {
            filter.collect;
            this.display();
            filter.build();
            filter.listenForUnselect();
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