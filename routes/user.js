var express = require("express");
var router = express.Router();
const DButils = require("../routes/utils/DButils");
const bcrypt = require("bcrypt");

//#region complex
//Authenticate all incoming requests
router.use("/addPersonalRecipe", function (req, res, next) {
  if (req.session && req.session.user_id) {
    // or findOne Stored Procedure
    DButils.execQuery("SELECT user_id FROM users").then((users) => {
      if (users.find((x) => x.user_id === req.session.user_id)) {
        req.user_id = user_id;
        // req.session.user_id = user_id; //refresh the session value
        // res.locals.user_id = user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});
//#endregion

module.exports = router;
