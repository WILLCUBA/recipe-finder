//vars
var apiKey = "9813f9d740654d9982b7fb5d60693466"
var searchRecBtnEl = $("#search-recipes")
var recipesIngredient1 = $("#recipes-ingredient-1")
var recipesIngredient2 = $("#recipes-ingredient-2")
var sectionRecipesRendered = $("#recipes-container")

//get rec function
var getRecipes = function(ingredient1,ingredient2) {
    var apiUrl = "https://api.spoonacular.com/recipes/findByIngredients?ingredients="+ingredient1+",+"+ingredient2+"&apiKey="+apiKey+"&number=4"
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                for (let index = 0; index < data.length; index++) {
                    renderRecipes(data[index])
                    console.log("hello");
                }
            })
        } else {
            console.log("asd");
            alert("Modal!!!")
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



searchRecBtnEl.on("click",function(event){
    event.preventDefault()
    getRecipes(recipesIngredient1.val(),recipesIngredient2.val())
})

console.log("hello");