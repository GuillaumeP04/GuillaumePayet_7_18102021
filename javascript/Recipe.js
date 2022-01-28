class Recipe {

    constructor(data) {
        this.id = data.id; 
        this.name = data.name; 
        this.servings = data.servings; 
        this.ingredients = data.ingredients; 
        this.time = data.time; 
        this.description = data.description; 
        this.appliance = data.appliance; 
        this.ustensils = data.ustensils; 
    }

    render() {
        let element = " ";
        this.ingredients.forEach(item => {
            if (item.quantity == undefined) {
                element += `<p><strong>${item.ingredient}</strong></p>`;
            } else if (item.unit == undefined) {
                element += `<p><strong>${item.ingredient}</strong>: ${item.quantity}</p>`;
            } else {
                element += `<p><strong>${item.ingredient}</strong>: ${item.quantity}${item.unit}</p>`;
            }
        })
        return `
        <div class="recipe--wrapper">
            <div class="recipe--description">
                <div class="title--wrapper">
                    <p class="title">${this.name}</p>
                    <p class="time"><strong><i class="far fa-clock"></i> ${this.time} min</strong></p>
                </div>
                <div class="div--wrapper">
                    <div class="ingredient--wrapper">
                        ${element}
                    </div>
                    <div class="description--wrapper">
                        <p>${this.description}</p>
                    </div>
                </div>
            </div>
        </div>`;
    }
}
export default Recipe;