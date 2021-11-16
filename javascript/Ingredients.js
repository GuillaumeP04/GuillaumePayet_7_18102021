import Structure from "./Structure.js";

class Ingredients {

    constructor() {
        this.all = new Set();
        this.selection = new Set();
    }

    build() {
        this.filterIngredients(search);
        this.selectedIngredient();
    }

    hydrate() {
        recipes.forEach(recipe => {
            recipe.ingredients.forEach(item => {
                this.all.add(item.ingredient);
            })
        })
    }

    listenForFilter() {
        document.querySelector(".ingredients--button").addEventListener("input", (e) => {
            let search = e.target.value;
            this.filterIngredients(search)
        })
        this.selectedIngredient();
    }

    filterIngredients(search) {
        let list = new Set();
        let html = " ";
        if (search.length > 0) {
            this.all.forEach(item => {
                item = item.toLowerCase();
                item = item.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                if (item.indexOf(search) > -1) {
                    list.add(item);
                }
            })
            list.forEach(item => {
                item = item.charAt(0).toUpperCase() + item.slice(1);
                html += `<a href="#" class="dropdown--content filter" ingredient="${item}">${item}</a>`
            })
        } else {
            this.all.forEach(item => {
                html += `<a href="#" class="dropdown--content filter" ingredient="${item}">${item}</a>`
            })
        }
        document.querySelector("#ingredients").innerHTML = html;
        this.selectedIngredient();
    }

    displaySelectedIngredient() {
        let selected = " ";
        this.selection.forEach(item => {
            selected += `<span class="selected--ingredients selected" >${item}<a class="far fa-times-circle close--selection" id="${item}"></a></span>`;
        })
        document.querySelector(".selected--items").innerHTML = selected;
    }

    selectedIngredient() {
        let items = document.querySelectorAll(".filter");
        items.forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                let selectedItem = e.target.getAttribute("ingredient");
                this.selection.add(selectedItem);
                this.displaySelectedIngredient();
                document.querySelector(".ingredients--button").value = "";
                this.closeSelection(selectedItem);
                this.filterRecipe();
            });
        })
    }

    closeSelection(selectedItem) {
        let close = document.querySelector(`.close--selection[id="${selectedItem}"]`);
        close.addEventListener("click", () => {
            close.closest(".selected").style.display = "none";
            if (this.selection.has(selectedItem)) {
                this.selection.delete(selectedItem);
            }
        });
    }

    filterRecipe() {
        let list = recipes;
        let structure =  new Structure();
        if (this.selection.size == 0) {
            structure.displayRecipe(list);
            return true;
        }
        list = recipes.filter(recipe => {
            let keep = false; 
            recipe.ingredients.forEach(item => {
                this.selection.forEach(el => {
                    console.log(item.ingredient);
                    if (el == item.ingredient) {
                        keep =  true;
                    } else {
                        keep = false;
                    }
                });
            });
            return keep;
        });
        structure.displayRecipe(list);
        this.build();
    }
}
export default Ingredients;