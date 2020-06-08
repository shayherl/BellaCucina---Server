insert into WatchedRecipes (user_id,recipe_id) values 
('14a00f1d-ebe2-4b05-ba11-f1b45547bf82',1111)

select * from users

insert into WatchedRecipes (user_id,recipe_id) values 
((select user_id from users where username='testuser'),1111)

update WatchedRecipesTest set time = GETDATE() 
Where user_id = (select user_id from users where username='testuser')
and recipe_id=1111


IF EXISTS
(SELECT * FROM WatchedRecipesTest WHERE user_id = 'e357333b-64fb-42c0-84c5-3ef7afae25d3'
and recipe_id=1234)
    UPDATE WatchedRecipesTest
    SET time = GETDATE()
    WHERE user_id = 'e357333b-64fb-42c0-84c5-3ef7afae25d3'
and recipe_id=1234
ELSE
    insert into WatchedRecipesTest (user_id,recipe_id) values 
('e357333b-64fb-42c0-84c5-3ef7afae25d3',1234)

`IF EXISTS
(SELECT * FROM WatchedRecipesTest WHERE user_id = '${user_id}'
and recipe_id=${recipe_id})
    UPDATE WatchedRecipesTest
    SET time = GETDATE()
    WHERE user_id = '${user_id}'
and recipe_id=${recipe_id}
ELSE
    insert into WatchedRecipesTest (user_id,recipe_id) values 
('${user_id}',${recipe_id})`


select * from RecipeInstructions


insert into PersonalRecipes 
(user_id, title, readyInMinutes,[image],popularity,vegan,vegetarian,glutenFree,servings) 
values (
    'e357333b-64fb-42c0-84c5-3ef7afae25d3', 'Banana Cake', 45, 'www.google.com', 10, 0,0,1,15)

insert into RecipeIngredients values (1,'2 Banana'), (1,'3 Eggs'), (1, '1 cup milk')
  
insert into RecipeInstructions values (1,1,'mash the bananas'), (1,2,'break the eggs'), (1,3,'pour milk')

-- for(i=0; i<personal_recipes.length; i++){
--      let recipe_ingredients = await DButils.execQuery(`select ingredient from RecipeIngredients WHERE recipe_id = ${personal_recipes[i].recipe_id}`);
 --     recipe_ingredients.map((element) => ingredients_array.push(element.ingredient)); 
--     //TODO: insrtucation here
--      personal_recipes[i].ingredients = ingredients_array;
--    }


insert into familyRecipes (user_id,title,Recipe_Owner,Recommended_Time) values 
((select user_id from users where username='testUser'),'Omlette' , 'Mama test', 'Every Morning'),
((select user_id from users where username='testUser'), 'Meat','Papa test', 'Every Evening'),
((select user_id from users where username='testUser'), 'Pasta','Uncle test', 'Every Noon')

select * from familyRecipes

insert into RecipeIngredients values (1000,'2 eggs'), (1000,'1 tablespoon salt')

insert into RecipeInstructions values (1000,1,'break the eggs'), (1000,2,'scramble the eggs'), (1000,3,'add salt'), (1000,4,'pour the eggs to the pan')
  
insert into RecipeIngredients values (1001,'1 steak'), (1001,'1 tablespoon salt'), (1001,'1 tablespoon gravy')

insert into RecipeInstructions values (1001,1,'wash the steak'), (1001,2,'put the salt and gravy on the steak'), (1001,3,'cook the meat')

insert into RecipeIngredients values (1002,'1 bag pasta'), (1002,'1 tablespoon salt')

insert into RecipeInstructions values (1002,1,'boil water'), (1002,2,'make the pasta')


select * from RecipeInstructions where recipe_id = 1002
  

select * from personalrecipes


update personalRecipes set [image] = 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Herbed-Macaroni-and-Cheese_exps4353_CAS2375015A09_08_1b_RMS-696x696.jpg'
where user_id='c87f940e-810e-4c9d-abff-e7da6d885e02' and recipe_id=2


  
insert into PersonalRecipes 
(user_id, title, readyInMinutes,[image],popularity,vegan,vegetarian,glutenFree,servings) 
values (
    'c87f940e-810e-4c9d-abff-e7da6d885e02', 'Nebraska’s Stuffed Beef Sandwiches', 55, 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Nebraska-s-Stuffed-Beef-Sandwiches_exps152441_CW2376963B12_20_8bC_RMS-696x696.jpg', 13, 0,0,0,12)

insert into RecipeIngredients values (7,'1/2 cup shortening'),
(7,'2 large eggs'),
(7,'2 pounds lean ground beef (90% lean)'),
(7,'2 medium onions, chopped'),
(7,'4 cups chopped cabbage'),
(7,'2 teaspoons seasoned salt'),
(7,'1 teaspoon garlic powder'),
(7,'1 teaspoon pepper')


select * from recipeIngredients

insert into RecipeInstructions values (7,1,'Place 1-3/4 cups flour, sugar, yeast and salt in a large bowl. Heat the milk, water and shortening to 120°-130°. Pour over flour mixture; add the eggs. Beat with an electric mixer on low speed until blended. Beat 3 additional minutes on high. Stir in the remaining flour; knead until smooth and elastic, 6-8 minutes.'),
 (7,2,'Place dough in a greased bowl; cover and let rise in a warm place until doubled, about 1 hour.'),
 (7,3,'Meanwhile, in a large skillet, cook beef and onions over medium heat until meat is no longer pink; drain. Add the cabbage, seasoned salt, garlic powder and pepper; cook until cabbage is wilted.'),
 (7,4,'Punch dough down; divide into 12 portions and cover with plastic wrap. Working with one piece at a time, roll into a 6-in. square. Place 3/4 cup meat mixture in the center of each square. Fold dough over filling, forming a rectangle. Pinch edges tightly to seal and place on greased baking sheets.'),
 (7,5,'Bake at 350° for 18-20 minutes or until golden brown. Serve hot.')
 



select * from familyRecipes

insert into familyRecipes (user_id,title,author,Recommended_Time,[image]) values 
((select user_id from users where username='NaorB'),'Sabich Sandwich' , 'Aunt Herzelia', 'Saturday Mornings','https://www.thespruceeats.com/thmb/_CE1QQwpe6zMXkTCboEFq61ZOTA=/2017x2017/filters:fill(auto,1)/aIMG_6680fsq-58ef95593df78cd3fc7229a1.jpg'),
((select user_id from users where username='NaorB'), 'Kitchri','Aunt Miriam', 'Thursday Noon','http://1.bp.blogspot.com/-lTQSi6tnKKA/UbORT8UxVXI/AAAAAAAACWI/4_l0wNJhkto/w1200-h630-p-k-no-nu/6.jpg'),
((select user_id from users where username='NaorB'), 'RED KUBBEH SOUP','Mother Osnat', 'During the Week','https://jamiegeller.com/.image/t_share/MTY1NTI0NzkzNDAyOTkxNjQz/red-kubbe-soup.jpg')

insert into familyRecipes (user_id,title,author,Recommended_Time,[image]) values 
((select user_id from users where username='Royju'),'Cooked Salmon' , 'Mother Odelia', 'During the Week',''),
((select user_id from users where username='Royju'),'Granola' , 'Mother Odelia', 'Weekends',''),
((select user_id from users where username='Royju'),'Eggplant Salad' , 'Grandmother Esther', 'During the Week','')

select * from FamilyRecipes


insert into RecipeIngredients values (1002,'1 tablespoon olive oil'),
(1002,'salt & pepper'),
(1002,'2 tablespoons tomato paste'),
(1002,'4 beets, peeled and cut into sticks'),
(1002,'1 tablespoon sugar'),
(1002,'juice of 1 lemon')



insert into RecipeInstructions values (1002,1,'Many people fry the ground beef for the kubbeh. Some people simply mix the meat ingredients together and add it to the dumplings. For the frying method, add ground beef to a frying pan on medium heat. Break up the meat and wait for the liquid to release from the meat, about a minute. Add onion, spices, salt and pepper. Fry and break in to small pieces. Cook until meat is no longer red.'),
 (1002,2,'Add semolina to a large bowl. Add the salt and mix. Gradually add the water and gently mix with your hands. Don’t knead it like a bread dough or it will become too chewy. Let it rest for 5 mins while the dough thickens.'),
 (1002,3,'Oil your hands. Take the dough and divide it into small pieces of equal size. Flatten each piece, not too thin, and fill with the meat. Press it in with your thumb. Wrap and pinch the edges. Pass it between your hands to seal the cracks and make it smooth. It will take a few tries to get the hang of it.'),
 (1002,4,'For the soup, add the olive oil to a large pot on medium heat. Add the onion, cinnamon, paprika, cumin, salt and black pepper. Mix and fry for a minute until onions start to caramelize. Add tomato paste and mix well. Fry for 1 minute. Enjoy the amazing smell.'),
(1002,5,'Add the beets, sugar, lemon juice and water.'),
(1002,6,'Bring soup to a boil. Gently add kubbeh. Cover and cook on medium heat for 30 minutes.')
 

