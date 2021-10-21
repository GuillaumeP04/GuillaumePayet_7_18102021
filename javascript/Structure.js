class Structure {

    constructor() {
        
    }
    
    display() {
        this.displayRecipe();
        this.displayIngredients();
        this.displayAppareil();
        this.displayUstensiles();
    }

    displayRecipe() {
        let html = " ";
        recipes.forEach(recipe => {
            html += this.renderRecipe(recipe);
        })
        document.getElementById("main--wrapper").innerHTML = html;
    }

    renderRecipe(recipe) {
        let ingredients = " ";
        recipe.ingredients.forEach(item => {
            if (item.quantity == undefined) {
                ingredients += `<p><strong>${item.ingredient}</strong></p>`;
            } else if (item.unit == undefined) {
                ingredients += `<p><strong>${item.ingredient}</strong>: ${item.quantity}</p>`;
            } else {
                ingredients += `<p><strong>${item.ingredient}</strong>: ${item.quantity}${item.unit}</p>`;
            }
        })
        return `
        <div class="recipe--wrapper">
            <img src="/images/grey.jpg" alt="" class="recipe--image">
            <div class="recipe--description">
                <div class="title--wrapper">
                    <p class="title">${recipe.name}</p>
                    <p class="time"><strong><i class="far fa-clock"></i> ${recipe.time} min</strong></p>
                </div>
                <div class="div--wrapper">
                    <div class="ingredients--wrapper">
                        ${ingredients}
                    </div>
                    <div class="description--wrapper">
                        <p>${recipe.description}</p>
                    </div>
                </div>
            </div>
        </div>`;
    }

    displayIngredients() {
        let ingredientList = new Set();
        let html = " ";
        recipes.forEach(recipe => {
            recipe.ingredients.forEach(item => {
                if (!ingredientList.has(item.ingredient)) {
                    ingredientList.add(item.ingredient);
                }
            })
        })
        ingredientList.forEach(item => {
            html += `<a class="dropdown--content filter">${item}</a>`
        })
        document.querySelector("#ingredients").innerHTML = html;
    }

    displayAppareil() {
        let appareilList = new Set();
        let html = " ";
        recipes.forEach(recipe => {
            if (!appareilList.has(recipe.appliance)) {
                appareilList.add(recipe.appliance);
            }
        })
        appareilList.forEach(item => {
            html += `<a class="dropdown--content filter">${item}</a>`
        })
        document.querySelector("#appareil").innerHTML = html;
    }

    displayUstensiles() {
        let ustensilesList = new Set();
        let html = " ";
        recipes.forEach(recipe => {
            recipe.ustensils.forEach(items => {
                let item = items.charAt(0).toUpperCase() + items.substr(1);
                if (!ustensilesList.has(item)) {
                    ustensilesList.add(item);
                }
            })
        })
        ustensilesList.forEach(item => {
            html += `<a class="dropdown--content filter">${item}</a>`
        })
        document.querySelector("#ustensiles").innerHTML = html;
    }

}
export default Structure;