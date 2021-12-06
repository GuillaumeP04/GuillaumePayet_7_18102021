class Ustensiles {

    constructor(list) {
        this.all = [];
        this.selection = new Set();
        this.filtered = new Set();
        this.search = "";
        this.list = list;
        this.type = "appareil";
        this.dropdownMenu();
    }

    collect() {
        this.list.all.forEach(recipe => {
            recipe.ustensils.forEach(item => {
                if (!this.all.includes(item)) {
                    this.all.push(item);
                }
            })
        })
    }

    build() {
        this.filtered = this.all;
        this.display().then(() => {
            this.listenForFilter();
            this.listenForSelection();
        })
    }

    display() {
        return new Promise((resolve, reject) => {
            let html = "";
            this.filtered.forEach(item => {
                html += `<a href="#" class="dropdown--content filter" id="${item}">${item}</a>`
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
        document.querySelector(".selected--items").innerHTML = selected;
    }

    dropdownMenu() {
        document.querySelector(".dropdown--wrapper").innerHTML = `
        <div class="dropdown">
            <input class="dropbtn ${this.type}--button" role="button" aria-haspopup="listbox" aria-expanded="false" data-filter="${this.type}" placeholder="Ustensiles">
            <a title="Dropdown Menu" href="#" class="arrow--down fas fa-chevron-down"></a>
            <div class="dropdown--content__wrapper" id="${this.type}"></div>
            <a title="Dropdown Menu" href="#" class="arrow--up fas fa-chevron-up"></a>
        </div>
        `
    }

    filter() {
        if (this.search.length < 1) {
            this.filtered = this.all;
        } 
        this.filtered = this.all.filter(item => {
            item = item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            if (item.indexOf(this.search) > -1) {
                return !!(item.indexOf(this.search) > -1);
            } 
        })
        this.display();
    }

    filterRecipe(recipes) {
        if (this.selection.size == 0) {
            this.list.filtered = this.list.all;
            this.list.display();
            return true;
        }

        this.list.filtered = recipes.filter(recipe => {
            let count = 0;
            this.selection.forEach(item => {
                if (item == recipe.ustensils) {
                    count++;
                    return true;
                } 
            });
            if (count == this.selection.size) {
                return true;
            }
            return false;
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
        let items = document.querySelectorAll(".filter");
        items.forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                let selectedItem = e.target.getAttribute("id");
                this.selection.add(selectedItem);
                this.displaySelection();
                document.querySelector(`.${this.type}--button`).value = "";
                this.listenForUnselect();
                this.filterRecipe(this.list.filtered);
                this.collect();
                this.list.display();
                
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
                this.collect();
                this.list.display();
                this.build();
            });
        });
    }
}
export default Ustensiles;