class Appareil {

    constructor(list) {
        this.all = [];
        this.filtered = [];
        this.displayed = [];
        this.selection = new Set();
        this.search = "";
        this.recipes = list;
        this.type = "appareil";
        this.dropdownMenu();
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

    build() {
        this.collect();
        this.display().then(() => {
            this.listenForFilter();
            this.listenForSelection();
            this.listenForUnselect();
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
            selected += `<span class="selected--${this.type} selected" >${item}<a class="far fa-times-circle close--selection__${this.type} close--selection" id="${item}"></a></span>`;
        })
        document.querySelector(`#selected--${this.type}`).innerHTML = selected;
    }

    dropdownMenu() {
        document.querySelector(".dropdown--wrapper").innerHTML += `
        <div class="dropdown">
            <input class="dropbtn ${this.type}--button" role="button" aria-haspopup="listbox" aria-expanded="false" data-filter="${this.type}" placeholder="Appareil">
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
                this.recipes.filter();
                this.recipes.display();
            });
        })
    }

    listenForUnselect() {
        let buttons = document.querySelectorAll(`.close--selection__${this.type}`);
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                let tag = button.getAttribute("id")
                button.closest(".selected").style.display = "none";
                if (this.selection.has(tag)) {
                    this.selection.delete(tag);
                }
                this.displaySelection();
                this.recipes.filter(true);
                this.recipes.display();
            });
        });
    }

    start() {
        document.querySelector(".selected--items").innerHTML += `<div id="selected--${this.type}"></div>`;
    }
}
export default Appareil;