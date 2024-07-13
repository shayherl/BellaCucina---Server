var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT username FROM users").then((users) => {
      if (users.find((x) => x.username === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});


/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    if (!user_id) {
      throw { status: 401, message: "Unauthorized" };
    }
    const recipe_id = req.body.recipeId;
    // throw{status:409, message:"ss"+user_id+","+recipe_id}
    await user_utils.markAsFavorite(user_id,recipe_id);
    res.status(200).send("The Recipe successfully saved as favorite");
    } catch(error){
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    if (!user_id) {
      throw { status: 401, message: "Unauthorized" };
    }
    let favorite_recipes = {};
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    // Array to hold the details of all favorite recipes
    let results = [];
    // Iterate over each recipe_id and get its details
    for (let recipe_id of recipes_id_array) {
      const recipe_details = await recipe_utils.getRecipeDetails(recipe_id);
      results.push(recipe_details);
    }
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

router.post('/MyRecipes', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    if (!user_id) {
      throw { status: 401, message: "Unauthorized" };
    }
    let newRecipe ={
      user_id: user_id,
      title: req.body.title,
      imageURL: req.body.imageURL,
      readyInMinutes: req.body.readyInMinutes,
      popularity: req.body.popularity,
      vegetarian: req.body.vegetarian,
      vegan: req.body.vegan,
      glutenFree: req.body.glutenFree,
      summary: req.body.summary,
      instructions: req.body.instructions,
      ingredients: req.body.ingredients,
      servings: req.body.servings
    }
    await user_utils.createRecipe(newRecipe);
    res.status(201).send("The Recipe successfully created");
  } catch (error) {
    next(error);
  }
});

router.get('/MyRecipes', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    if (!user_id) {
      throw { status: 401, message: "Unauthorized" };
    }
    const userRecipes = await user_utils.getUserRecipes(user_id);
    res.status(200).send(userRecipes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
