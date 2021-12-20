class Ingredient {

    constructor(list) {
        this.all = [];
        this.filtered = [];
        this.displayed = [];
        this.selection = new Set();
        this.search = "";
        this.recipes = list;
        this.type = "ingredient";
        this.dropdownMenu();
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
    
    build() {
        this.display().then(() => {
            this.listenForFilter();
            this.listenForSelection();
        })
    }

    display() {
        return new Promise((resolve, reject) => {
            let html = "";
            this.displayed.forEach(item => {
                html += `<a href="#" class="dropdown--content filter--${this.type} filter" id="${item}">${item}</a>`
            })
            document.querySelector(`#${this.type}`).innerHTML = html;
            resolve();
        })
    }
    
    displaySelection() {
        let selected = "";
        this.selection.forEach(item => {
            selected += `<span class="selected--${this.type} selected" >${item}<a class="far fa-times-circle close--selection" id="${item}"></a></span>`;
        })
        document.querySelector(`#selected--${this.type}`).innerHTML = selected;
    }
    
    dropdownMenu() {
        document.querySelector(".dropdown--wrapper").innerHTML += `
        <div class="dropdown">
        <input class="dropbtn ${this.type}--button" role="button" aria-haspopup="listbox" aria-expanded="false" data-filter="${this.type}" placeholder="Ingrédients">
        <a title="Dropdown Menu" href="#" class="arrow--down fas fa-chevron-down"></a>
        <div class="dropdown--content__wrapper" id="${this.type}"></div>
        <a title="Dropdown Menu" href="#" class="arrow--up fas fa-chevron-up"></a>
        </div>
        `
    }
    
    filter() {
        this.displayed = this.filtered.filter(item => {
            item = item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            if (item.indexOf(this.search) > -1) {
                return !!(item.indexOf(this.search) > -1);
            } 
        })
        this.display();
    }

    filterRecipe(recipes) {
        if (this.selection.size == 0) {
            this.recipes.filtered = this.recipes.all;
            this.recipes.display();
            return true;
        }
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

    listenForFilter() {
        document.querySelector(`.${this.type}--button`).addEventListener("input", (e) => {
            this.search = e.target.value;
            this.filter();
            this.listenForSelection();
        })
    }

    listenForSelection() {
        let items = document.querySelectorAll(`.filter--${this.type}`);
        items.forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                let selectedItem = e.target.getAttribute("id");
                this.selection.add(selectedItem);
                this.displaySelection();
                document.querySelector(`.${this.type}--button`).value = "";
                this.listenForUnselect();
                this.filterRecipe(this.recipes.filtered);
                this.collect();
                this.recipes.display();

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
                this.filterRecipe(this.recipes.all);
                this.collect();
                this.recipes.display();
                this.build();
            });
        });
    }

    start() {
        this.collect();
        document.querySelector(".selected--items").innerHTML = `<div id="selected--${this.type}"></div>`;
    }
}
export default Ingredient;