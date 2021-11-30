class Ingredients {

    constructor(list) {
        this.all = [];
        this.selection = new Set();
        this.filtered = new Set();
        this.search = "";
        this.list = list;
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

    filterIngredients() {
        if (this.search.length < 1) {
            this.display();
        }
        this.filtered = this.all.filter(item => {
            item = item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            if (item.indexOf(this.search) > -1) {
                return !!(item.indexOf(this.search) > -1);
            } 
        })
        this.display(this.filtered);
    }

    build() {
        this.display().then(() => {
            this.listenForFilter();
            this.listenForSelection();
        })
    }

    collect(recipes) {
        recipes = this.list.all.forEach(recipe => {
            recipe.ingredients.forEach(item => {
                if (!this.all.includes(item.ingredient)) {
                    this.all.push(item.ingredient);
                    this.filtered.add(item.ingredient);
                }
            })
        })
    }

    listenForFilter() {
        document.querySelector(".ingredients--button").addEventListener("input", (e) => {
            this.search = e.target.value;
            this.filterIngredients();
            this.build();
        })
    }

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
                this.displaySelectedIngredient();
                document.querySelector(".ingredients--button").value = "";
                this.listenForUnselect();
                this.filterRecipe(this.list.filtered);
                this.list.display();

                this.collect(this.list.filtered);
                this.build();
            });
        })
    }

    listenForUnselect() {
        let buttons = document.querySelectorAll(".close--selection");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                let tag = button.getAttribute("id")
                button.closest(".selected").style.display = "none";
                if (this.selection.has(tag)) {
                    this.selection.delete(tag);
                }

                this.filterRecipe(this.list.all);
                this.list.display();

                this.collect(this.list.filtered);
                this.build();
            });
        });
    }

    filterRecipe(recipes) {
        if (this.selection.size == 0) {
            this.list.display();
            return true;
        }
        this.list.filtered = recipes.filter(recipe => {
            let count = 0;
            recipe.ingredients.forEach(item => {
                this.selection.forEach(el => {
                    if (el == item.ingredient) {
                        count++;
                        return true;
                    } 
                });
            });
            return count;
        });
    }
}
export default Ingredients;