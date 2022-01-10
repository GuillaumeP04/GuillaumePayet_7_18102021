class Search {

    constructor(list, ingredient, appareil) {
        this.search = "";
        this.recipeName = [];
        this.recipes = list;
        this.ingredient = ingredient;
        this.appareil = appareil;
        this.displayed = [];
        this.filtered = [];
        this.selection = new Set();
    }

    listenForFilter() {
        document.getElementById("search--bar").addEventListener("input", (e) => {
            this.search = e.target.value;
            if (this.search.length > 2) {
                this.filterIngredients();
            }
        })
    }

    filterIngredients() {
        
    }

    // filterAppareil() {

    // }

    filterDescriptions() {

    }

    // filterUstensiles() {

    // }

    filterRecipes() {

    }
}
export default Search;