CREATE DATABASE IF NOT EXISTS macrobites_db;
USE macrobites_db;

-- Drop tables in reverse order of dependencies so we don't break foreign keys
DROP TABLE IF EXISTS saved_recipes;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE recipes (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    img_url VARCHAR(255),
    description TEXT,
    protein VARCHAR(50),
    calories VARCHAR(50),
    ingredients TEXT, 
    instructions TEXT
);

CREATE TABLE saved_recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    recipe_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
    UNIQUE KEY unique_user_recipe (user_id, recipe_id) 
);


INSERT INTO recipes (title, img_url, description, protein, calories, ingredients, instructions) VALUES
(
"Steak & Quinoa Power Bowl",
"sqbowl.jpg",
"Perfect for post-workout recovery. Ready in 20 mins.",
"55g Protein",
"600 cals",
'["200g lean flank steak", "1 cup cooked quinoa", "1/2 cup broccoli", "1 tbsp teriyaki glaze"]',
'["Season steak", "Sear 3-4 mins", "Slice steak", "Serve with quinoa"]'
),
(
"Oatmeal Protein Pancakes",
"pancake.jpg",
"High-protein breakfast option.",
"30g Protein",
"420 cals",
'["1 cup rolled oats", "1 scoop vanilla protein powder", "2 eggs", "1/2 mashed banana", "1/2 tsp cinnamon"]',
'["Blend all ingredients until smooth", "Heat non-stick pan over medium heat", "Pour batter and cook until bubbles form", "Flip and cook for 1-2 more mins"]'
),
(
"Spicy Crunchy Chicken Salad",
"sccsalad.jpg",
"High-protein lunch with a kick.",
"45g Protein",
"380 cals",
'["150g grilled chicken breast", "2 cups mixed greens", "1/4 cup shredded carrots", "1 tbsp sriracha mayo", "1 tbsp crushed peanuts"]',
'["Chop chicken into bite-sized pieces", "Toss greens and carrots in a large bowl", "Add chicken and drizzle with sriracha mayo", "Top with peanuts for crunch"]'
),
(
"Honey Garlic Salmon Rice",
"hgsalmon.jpg",
"Glazed salmon served over fluffy jasmine rice.",
"35g Protein",
"510 cals",
'["150g salmon fillet", "1 cup jasmine rice", "2 tbsp honey garlic sauce", "1/2 cup steamed asparagus"]',
'["Pan-sear salmon for 4 mins per side", "Brush with honey garlic glaze", "Serve over cooked rice", "Add asparagus on the side"]'
),
(
"Greek Turkey Pasta",
"turkeypasta.jpg",
"Lean ground turkey with whole grain pasta and feta.",
"40g Protein",
"550 cals",
'["150g ground turkey", "1 cup whole wheat pasta", "1/4 cup feta cheese", "1/2 cup cherry tomatoes", "Fresh spinach"]',
'["Brown turkey in a skillet", "Boil pasta until al dente", "Toss turkey, pasta, and tomatoes together", "Stir in spinach until wilted and top with feta"]'
),
(
"Avocado Egg Power Toast",
"eggtoast.jpg",
"Classic breakfast elevated with high-protein bread.",
"22g Protein",
"340 cals",
'["2 slices protein bread", "1/2 ripe avocado", "2 poached eggs", "Red pepper flakes", "Lemon juice"]',
'["Toast the bread", "Mash avocado with lemon juice and spread on toast", "Top with poached eggs", "Season with red pepper flakes"]'
),
(
"Peanut Butter Banana Smoothie",
"pbsmoothie.jpg",
"The ultimate creamy post-gym shake.",
"28g Protein",
"450 cals",
'["1 frozen banana", "1 scoop chocolate protein", "2 tbsp peanut butter", "1 cup almond milk", "Handful of ice"]',
'["Add all ingredients to a blender", "Blend on high until creamy", "Pour into a glass and enjoy immediately"]'
),
(
"Lean Beef Stir-Fry",
"beefstirfry.webp",
"Quick Asian-inspired meal with lots of fiber.",
"42g Protein",
"480 cals",
'["150g lean beef strips", "2 cups mixed stir-fry veggies", "2 tbsp low-sodium soy sauce", "1 tsp ginger", "1/2 cup brown rice"]',
'["Sauté beef until browned", "Add vegetables and cook for 5 mins", "Stir in soy sauce and ginger", "Serve over brown rice"]'
),
(
"Tuna Chickpea Salad",
"tunachickpea.jpg",
"No-cook high-protein lunch option.",
"38g Protein",
"410 cals",
'["1 can tuna in water", "1/2 cup chickpeas", "1/4 cup diced cucumber", "1 tbsp Greek yogurt", "Dill"]',
'["Drain tuna and chickpeas", "Mix all ingredients in a bowl", "Use Greek yogurt instead of mayo for extra protein", "Season with dill and black pepper"]'
),
(
"Zucchini Noodles with Shrimp",
"zoodleshrimp.jpg",
"Low-carb, light, and refreshing dinner.",
"32g Protein",
"290 cals",
'["150g large shrimp", "2 large zucchinis (spiralized)", "2 cloves garlic", "1 tbsp olive oil", "Lemon zest"]',
'["Sauté garlic and shrimp in olive oil", "Add zucchini noodles for only 2 mins (dont overcook)", "Toss with lemon zest and salt", "Serve immediately"]'
);

ALTER TABLE saved_recipes ADD UNIQUE KEY unique_user_recipe (user_id, recipe_id); 
