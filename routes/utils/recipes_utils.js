const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";



/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */


async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            // apiKey: process.env.spooncular_apiKey
            apiKey: "42334f2c210e4e118a9c90c3f6ea7bc1"
        }
    });
}

async function getRandomRecipes() {
    let recipesArray = await axios.get(`${api_domain}/random`, {
        params: {
            number: 3,
            includeNutrition: false,
            // apiKey: process.env.spooncular_apiKey
            apiKey: "42334f2c210e4e118a9c90c3f6ea7bc1"
        }
    });
    return await Promise.all(
        recipesArray.data.recipes.map(recipe => getRecipeDetails(recipe.id))
    );
}

async function getRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        
    }
}

async function getFullRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, summary, instructions, extendedIngredients, servings} = recipe_info.data;

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        summary: summary, 
        instructions: instructions,
        extendedIngredients: extendedIngredients, 
        servings: servings
    }
}

async function searchRecipe(recipeName, cuisine, diet, intolerance, number, username) {
    const response = await axios.get(`${api_domain}/complexSearch`, {
        params: {
            query: recipeName,
            cuisine: cuisine,
            diet: diet,
            intolerances: intolerance,
            number: number,
            // apiKey: process.env.spooncular_apiKey
            apiKey: "42334f2c210e4e118a9c90c3f6ea7bc1"
        }
    });

    return getRecipeDetails(response.data.results.map((element) => element.id), username);
}

exports.getFullRecipeDetails = getFullRecipeDetails;
exports.getRecipeDetails = getRecipeDetails;
exports.getRandomRecipes = getRandomRecipes;



