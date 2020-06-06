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
    DButils.execQuery("SELECT user_id FROM users").then((users) => {
      if (users.find((x) => x.user_id === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});

/**
 * This path returns user's info on recipes by their Ids (if the recipes was watched or saved by user)
 */
router.get('/recipeInfo/:ids', async (req, res) => {
  try {
    const recipes_ids = JSON.parse(req.params.ids);
    const user_id = req.user_id;
 //   console.log(recipes_ids, user_id);
    const userInfo = await user_utils.getUserInfoOnRecipes(user_id, recipes_ids);
    res.send(userInfo);
  } catch (error) {
    next(error);
  }
});

/**
 * This path gets body with recipeId and mark this recipe as watched by the logged-in user
 */
router.post('/watched', async (req, res) => {
  try{
    const recipe_id = req.body.recipeId;
    const user_id = req.user_id;
    await user_utils.markRecipeAsWatched(user_id, recipe_id);
    res.status(200).send("Marked successfully the recipe as watched");
  }catch(error){
    next(error);
  }
});

/**
 * This path returns the last 3 recipes that were seen by the logged-in user
 */
router.get('/lastWatched', async (req, res) => {
  try{
    let result = [];
    const user_id = req.user_id;
    const lastThreeRecipes = await user_utils.getLastThreeWatchedRecipes(user_id);
    lastThreeRecipes.map((element) => result.push(element.recipe_id));
    console.log(result[0]);
    res.status(200).send(result);
  }catch(error){
    next(error);
  }
});

/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    await DButils.execQuery(`insert into FavoriteRecipes values ('${user_id}',${recipe_id})`);
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
    let favorite_recipes = {};
    const recipes_id = await DButils.execQuery(`select recipe_id from FavoriteRecipes where user_id='${user_id}'`);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

module.exports = router;
