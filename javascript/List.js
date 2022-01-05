import Recipe from "./Recipe.js";

class List {

    constructor() {
        this.all = [];
        this.filtered = [];
        this.filters = [];
    }

    // addFilters(filter) {
    //     this.filters.push(filter);
    //     filter.start();
    //     filter.build();
    // }

    // updateFilters() {
    //     this.filters.forEach(filter => {
    //         filter.collect();
    //         this.display();
    //         filter.build();
    //     })
    // }

    // filter() {
    //     let list = this.all;
    //     console.log(this.filters);
    //     this.filters.forEach(filter => {
    //         list = filter.filterRecipe(list)
    //     })
    // }
    
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