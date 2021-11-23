import List from "./List.js";

class Ingredients {

    constructor() {
        this.all = [];
        this.selection = new Set();
        this.filtered = new Set();
        this.search = "";
    }

    display() {
        return new Promise((resolve, reject) => {
            let html = " ";
            this.filtered.forEach(item => {
                html += `<a href="#" class="dropdown--content filter" id="${item}">${item}</a>`
            })
            document.querySelector("#ingredients").innerHTML = html;
            resolve();
        })
    }

    hydrate() {
        recipes.forEach(recipe => {
            recipe.ingredients.forEach(item => {
                if (!this.all.includes(item.ingredient)) {
                    this.all.push(item.ingredient);
                }
                if (!this.filtered.has(item.ingredient)) {
                    this.filtered.add(item.ingredient);
                }
            })
        })
    }

    listenForFilter() {
        document.querySelector(".ingredients--button").addEventListener("input", (e) => {
            this.search = e.target.value;
            this.filterIngredients();
            this.display();
            this.listenForSelection();
        })
    }

    filterIngredients() {
        if (this.search.length < 1) {
            return true;
        }
        this.filtered = this.all.filter(item => {
            item = item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            if (item.indexOf(this.search) > -1) {
                return !!(item.indexOf(this.search) > -1);
            } 
        })
    }

    // filterIngredients() {
    //     let html = " ";
    //     this.filtered = this.all.filter(item => {
    //         item = item.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    //         if (this.search.length < 1) {
    //             html += `<a href="#" class="dropdown--content filter" id="${item}">${item}</a>`;
    //         } else if (item.indexOf(this.search) > -1 == true) {
    //             html += `<a href="#" class="dropdown--content filter" id="${item}">${item}</a>`;
    //         }
    //     })
    // }

    displaySelectedIngredient() {
        let selected = " ";
        this.selection.forEach(item => {
            selected += `<span class="selected--ingredients selected" >${item}<a class="far fa-times-circle close--selection" id="${item}"></a></span>`;
        })
        document.querySelector(".selected--items").innerHTML = selected;
    }

    listenForSelection() {
        let items = document.querySelectorAll(".filter");
        items.forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                let selectedItem = e.target.getAttribute("id");
                this.selection.add(selectedItem);
                console.log(this.selection);
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
        let element;
        if (this.selection.size == 0) {
            return true;
        }
        element = recipes.filter(recipe => {
            let keep = false; 
            recipe.ingredients.forEach(item => {
                this.selection.forEach(el => {
                    if (el == item.ingredient) {
                        console.log(el);
                        keep =  true;
                    } else {
                        keep = false;
                    }
                });
            });
            return keep;
        });
        console.log(element)
    }
}
export default Ingredients;