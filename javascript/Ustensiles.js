import Filter from "./Filter.js";

class Ustensiles extends Filter{

    constructor(list) {
        super(list, "ustensiles")
    }

    collect() {
        this.filtered = [];
        this.recipes.filtered.forEach(recipe => {
            recipe.ustensils.forEach(item => {
                if (!this.filtered.includes(item)) {
                    this.filtered.push(item);
                }
            })
        })
        this.displayed = this.filtered;
    }

    filterRecipes(recipes) {
        if (this.selection.size > 0) {
            this.recipes.filtered = recipes.filter(recipe => {
                let count = 0;
                recipe.ustensils.forEach(item => {
                    this.selection.forEach(el => {
                        if (el == item) {
                            count++;
                        } 
                    });
                });
                return !!(count == this.selection.size);
            });
        }
    }
}
export default Ustensiles;