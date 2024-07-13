const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into favorite_recipes values ('${user_id}',${recipe_id})`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from favorite_recipes where user_id='${user_id}'`);
    return recipes_id;
}


async function createRecipe(recipeData){
      const recipeId = Date.now();
      const query = `INSERT INTO recipes (id, user_id, title, imageURL, readyInMinutes, popularity, vegetarian, vegan, glutenFree, summary, instructions, ingredients, servings)
        VALUES ('${recipeId}', '${recipeData.user_id}', '${recipeData.title}','${recipeData.imageURL}', '${recipeData.readyInMinutes}', '${recipeData.popularity}', 
                '${recipeData.vegetarian}', '${recipeData.vegan}', '${recipeData.glutenFree}', '${recipeData.summary}', 
                '${recipeData.instructions}', '${recipeData.ingredients}', '${recipeData.servings}')`;
      await DButils.execQuery(query);
}

async function getUserRecipes(user_id) {
    const query = `SELECT title, imageURL, readyInMinutes, popularity, vegetarian, vegan, glutenFree, summary, instructions, ingredients, servings
      FROM recipes
      WHERE user_id = '${user_id}'`;
    const userRecipes = await DButils.execQuery(query);
    return userRecipes;
}


exports.getUserRecipes = getUserRecipes;
exports.createRecipe = createRecipe;
exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
