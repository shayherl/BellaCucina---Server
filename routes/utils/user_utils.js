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
      const query1 = `INSERT INTO recipes (id, user_id, title, imageURL, readyInMinutes, aggregateLikes, vegetarian, vegan, glutenFree, summary, instructions, servings)
        VALUES ('${recipeId}', '${recipeData.user_id}', '${recipeData.title}','${recipeData.image}', '${recipeData.readyInMinutes}', '${recipeData.aggregateLikes}', 
                '${recipeData.vegetarian}', '${recipeData.vegan}', '${recipeData.glutenFree}', '${recipeData.summary}', 
                '${recipeData.instructions}', '${recipeData.servings}')`;
      for (let ing of recipeData.extendedIngredients){
        const query2 = `INSERT INTO ingredients (title, original)
        VALUES ('${recipeData.title}','${ing.original}')`;
        await DButils.execQuery(query2);
      }
      await DButils.execQuery(query1);
}

async function getUserRecipes(user_id) {
    const query = `SELECT title, imageURL, readyInMinutes, aggregateLikes, vegetarian, vegan, glutenFree, summary, instructions, servings
      FROM recipes
      WHERE user_id = '${user_id}'`;
    const userRecipes = await DButils.execQuery(query);
    return userRecipes;
}

async function getRecipeByTitle(user_id, f_title) {
  const query1 = `SELECT title, imageURL, readyInMinutes, aggregateLikes, vegetarian, vegan, glutenFree, summary, instructions, servings
    FROM recipes
    WHERE user_id = '${user_id}' AND title = '${f_title}'`;
  const userRecipe = await DButils.execQuery(query1);
  const query2 = `SELECT original
    FROM ingredients
    WHERE title = '${f_title}'`;
  const ingre = await DButils.execQuery(query2);
  console.log(ingre)
  let { title, readyInMinutes, imageURL, aggregateLikes, vegan, vegetarian, glutenFree, summary, instructions, servings} = userRecipe[0];
  return {
      // id: id,
      title: title,
      readyInMinutes: readyInMinutes,
      imageURL: imageURL,
      aggregateLikes: aggregateLikes,
      vegan: vegan,
      vegetarian: vegetarian,
      glutenFree: glutenFree,
      summary: summary, 
      instructions: instructions,
      extendedIngredients: ingre, 
      servings: servings
  }
}


exports.getUserRecipes = getUserRecipes;
exports.getRecipeByTitle = getRecipeByTitle;
exports.createRecipe = createRecipe;
exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
