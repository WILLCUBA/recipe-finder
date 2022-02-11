//vars
var apiKey = "26b2855d1fa3458ca4bd771900c8efa3"
var searchRecBtnEl = $("#search-recipes")
var recipesIngredient1 = $("#recipes-ingredient-1")
var recipesIngredient2 = $("#recipes-ingredient-2")
var sectionRecipesRendered = $("#recipes-container")
var modalRecipe = $("#food-modal").hide()
var modalDrink = $("#drink-modal").hide()
console.log(modalDrink,modalRecipe);
//get rec function
var getRecipes = function(ingredient1,ingredient2) {
    var apiUrl = "https://api.spoonacular.com/recipes/findByIngredients?ingredients="+ingredient1+",+"+ingredient2+"&apiKey="+apiKey+"&number=4"
    fetch(apiUrl).then(function(response) {
        if (recipesIngredient1.val() === "" && recipesIngredient2.val() === "") {
            modalDrink.show("slow")
            return
        }
        else if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                for (let index = 0; index < data.length; index++) {
                    renderRecipes(data[index])
                    console.log("hello");
                }
            })
        } else {
            console.log("asd");
            modalRecipe.show("slow")
            return false
        }
    })
}


var renderRecipes = function(recipe) {
    //div c-card
    var cardDiv = $("<div>").addClass("card").addClass("m-3")
    sectionRecipesRendered.append(cardDiv)
    //img section
    //div c-card-image
    var cardImg = $("<div>").addClass("card-image")
    cardDiv.append(cardImg)
    //->figure
    var figureImg = $("<figure>").addClass("image")
    cardImg.append(figureImg)
    var imgTag = $("<img>").attr("src",recipe.image)
    figureImg.append(imgTag)
    //content section
    //div card-content
    var contentDiv = $("<div>").addClass("content").addClass("has-text-centered").addClass("mt-3")
    cardDiv.append(contentDiv)
    //p title
    var pRecipeName = $("<p>").addClass("title").addClass("is-5").text(recipe.title)
    contentDiv.append(pRecipeName)
    //p menu-labe
    var pIngredients = $("<p>").addClass("menu-label").addClass("title").addClass("is-6").text("Ingredients")
    contentDiv.append(pIngredients)
    //ol of ingredients
    var olOfIng = $("<ul>").addClass("menu-list")
    contentDiv.append(olOfIng)
    renderIngredients(recipe.usedIngredients,olOfIng)
    getInfoLink(recipe.id,cardDiv)
}

var renderIngredients = function(usedIngredientArr,ol) {
    for (let index = 0; index < usedIngredientArr.length; index++) {
       var ingredientLi = $("<li>")
       var ingredientA = $("<a>")
       ingredientA.text(usedIngredientArr[index].name)
       ingredientLi.append(ingredientA)
       ol.append(ingredientLi)
    }
}

var getInfoLink = function(id,card) {
    var apiUrl = "https://api.spoonacular.com/recipes/"+id+"/information?apiKey="+apiKey
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                var aLink = $("<a>").attr("href",data.sourceUrl).text("Link Recipe Details")
                card.append(aLink)
            })
        } else {
            console.log("asd");
        }
    })
}



searchRecBtnEl.on("click",function(event){
    sectionRecipesRendered.html("")
    event.preventDefault()
    getRecipes(recipesIngredient1.val(),recipesIngredient2.val())
})

//-----------------------------------DRINKS-----------------------------------------//

var searchDrinksBtnEl = $("#search-drinks-btn")
var drinkIngredient1 = $("#drinks-ingredient")
var sectionDrinkRendered = $("#drinks-container")

var getDrinks = function(ingredient) {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+ingredient).then(function(response) {
        if (drinkIngredient1.val() === "") {
            modalDrink.show("slow")
            return
        }
        else if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                for (let index = 0; index < 4; index++) {
                    renderDrinks(data.drinks[index])
                }
            })
        } else {
            modalDrink.show("slow")
            return false
        }
    })
}

var renderDrinks = function(drink) {
    //div c-card
    var cardDivDrink = $("<div>").addClass("card").addClass("m-3")
    sectionDrinkRendered.append(cardDivDrink)
    //img section
    //div c-card-image
    var cardImgDrink = $("<div>").addClass("card-image")
    cardDivDrink.append(cardImgDrink)
    //->figure
    var figureImg = $("<figure>").addClass("image")
    cardImgDrink.append(figureImg)
    var imgTag = $("<img>").attr("src",drink.strDrinkThumb)
    figureImg.append(imgTag)
    //content section
    //div card-content
    var contentDiv = $("<div>").addClass("content").addClass("has-text-centered").addClass("mt-3")
    cardDivDrink.append(contentDiv)
    //p title
    var pRecipeName = $("<p>").addClass("title").addClass("is-5").text(drink.strDrink)
    contentDiv.append(pRecipeName)
    //p menu-labe
    var pIngredients = $("<p>").addClass("menu-label").addClass("title").addClass("is-6").text("Ingredients")
    contentDiv.append(pIngredients)
    //ol of ingredients
    var olOfIng = $("<ul>").addClass("menu-list")
    contentDiv.append(olOfIng)
    renderIngredientsDrink(drink,olOfIng)
    var pInstructions= $("<p>").addClass("menu-label").addClass("title").addClass("is-6").text(drink.strInstructions)
    cardDivDrink.append(pInstructions)
}

var renderIngredientsDrink = function(drink,ol) {
    var ingredients = [drink.strIngredient1,drink.strIngredient2,drink.strIngredient3,drink.strIngredient4]
    console.log(ingredients);
    for (let index = 0; index < ingredients.length; index++) {
       var ingredientLi = $("<li>")
       var ingredientA = $("<a>")
       ingredientA.text(ingredients[index])
       ingredientLi.append(ingredientA)
       ol.append(ingredientLi)
    }
}



searchDrinksBtnEl.on("click",function(event){
    event.preventDefault()
    sectionDrinkRendered.html("")
    getDrinks(drinkIngredient1.val())
})

$("#close-modal-btn").on("click",function () {
    $(".modal").hide()
})
//links to the recipes
// drink descriprtion
// edit modal
