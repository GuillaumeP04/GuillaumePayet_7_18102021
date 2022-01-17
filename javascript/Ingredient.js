import Filter from "./Filter.js";

class Ingredient extends Filter{

    constructor(list) {
        super(list, "ingredient")
    }

    collect() {
        this.filtered = [];
        this.recipes.filtered.forEach(recipe => {
            recipe.ingredients.forEach(item => {
                if (!this.filtered.includes(item.ingredient)) {
                    this.filtered.push(item.ingredient);
                }
            })
        })
        this.displayed = this.filtered;
    }

    filterRecipes(recipes) {
        if (this.selection.size > 0) {
            this.recipes.filtered = recipes.filter(recipe => {
                let count = 0;
                recipe.ingredients.forEach(item => {
                    this.selection.forEach(el => {
                        if (el == item.ingredient) {
                            count++;
                        } 
                    });
                });
                return !!(count == this.selection.size);
            });
        }
    }
}
export default Ingredient;