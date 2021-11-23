import Recipe from "./Recipe.js";

class List {

    constructor() {
        this.all = [];
    }
    
    hydrate() {
        recipes.forEach(item => {
            let recipe = new Recipe(item);
            this.all.push(recipe);
        });
    }

    display() {
        let html = "";
        this.all.forEach(item => {
            html += item.render();
        })
        document.getElementById("main--wrapper").innerHTML = html;
    }


    // displayAppareil() {
    //     let appareilList = new Set();
    //     let html = " ";
    //     recipes.forEach(recipe => {
    //         if (!appareilList.has(recipe.appliance)) {
    //             appareilList.add(recipe.appliance);
    //         }
    //     })
    //     appareilList.forEach(item => {
    //         html += `<a class="dropdown--content filter">${item}</a>`
    //     })
    //     document.querySelector("#appareil").innerHTML = html;
    // }

    // displayUstensiles() {
    //     let ustensilesList = new Set();
    //     let html = " ";
    //     recipes.forEach(recipe => {
    //         recipe.ustensils.forEach(items => {
    //             let item = items.charAt(0).toUpperCase() + items.substr(1);
    //             if (!ustensilesList.has(item)) {
    //                 ustensilesList.add(item);
    //             }
    //         })
    //     })
    //     ustensilesList.forEach(item => {
    //         html += `<a class="dropdown--content filter">${item}</a>`
    //     })
    //     document.querySelector("#ustensiles").innerHTML = html;
    // }

}
export default List;