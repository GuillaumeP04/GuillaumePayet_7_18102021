import Filter from "./Filter.js";

class Appareil extends Filter{

    constructor(list) {
        super(list, "appareil")
    }

    collect() {
        this.filtered = [];
        this.recipes.filtered.forEach(recipe => {
            if (!this.filtered.includes(recipe.appliance)) {
                this.filtered.push(recipe.appliance);
            }
        })
        this.displayed = this.filtered;
    }

    filterRecipes(recipes) {
        if (this.selection.size > 0) {    
            this.recipes.filtered = recipes.filter(recipe => {
                let count = 0;
                this.selection.forEach(item => {
                    if (item == recipe.appliance) {
                        count++;
                        return true;
                    } 
                });
                return !!(count == this.selection.size);
            });
        }
    }
}
export default Appareil;