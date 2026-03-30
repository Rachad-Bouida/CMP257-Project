const recipes = [
  {
    title: "Steak & Quinoa Power Bowl",
    img: "sqbowl.jpg",
    description: "Perfect for post-workout recovery. Ready in 20 mins.",
    protein: "55g Protein",
    calories: "600 cals",
    ingredients: ["200g lean flank steak", "1 cup cooked quinoa", "1/2 cup broccoli", "1 tbsp teriyaki glaze"],
    instructions: ["Season steak", "Sear 3-4 mins", "Slice steak", "Serve with quinoa"]
  },
  {
    title: "Oatmeal Protein Pancakes",
    img: "pancake.jpg",
    description: "High-protein breakfast option.",
    protein: "30g Protein",
    calories: "420 cals",
    ingredients: ["1 cup rolled oats", "1 scoop vanilla protein powder", "2 eggs", "1/2 mashed banana", "1/2 tsp cinnamon"],
    instructions: ["Blend all ingredients until smooth", "Heat non-stick pan over medium heat", "Pour batter and cook until bubbles form", "Flip and cook for 1-2 more mins"]
  },
  {
    title: "Spicy Crunchy Chicken Salad",
    img: "sccsalad.jpg",
    description: "High-protein lunch with a kick.",
    protein: "45g Protein",
    calories: "380 cals",
    ingredients: ["150g grilled chicken breast", "2 cups mixed greens", "1/4 cup shredded carrots", "1 tbsp sriracha mayo", "1 tbsp crushed peanuts"],
    instructions: ["Chop chicken into bite-sized pieces", "Toss greens and carrots in a large bowl", "Add chicken and drizzle with sriracha mayo", "Top with peanuts for crunch"]
  },
  {
    title: "Honey Garlic Salmon Rice",
    img: "hgsalmon.jpg",
    description: "Glazed salmon served over fluffy jasmine rice.",
    protein: "35g Protein",
    calories: "510 cals",
    ingredients: ["150g salmon fillet", "1 cup jasmine rice", "2 tbsp honey garlic sauce", "1/2 cup steamed asparagus"],
    instructions: ["Pan-sear salmon for 4 mins per side", "Brush with honey garlic glaze", "Serve over cooked rice", "Add asparagus on the side"]
  },
  {
    title: "Greek Turkey Pasta",
    img: "turkeypasta.jpg",
    description: "Lean ground turkey with whole grain pasta and feta.",
    protein: "40g Protein",
    calories: "550 cals",
    ingredients: ["150g ground turkey", "1 cup whole wheat pasta", "1/4 cup feta cheese", "1/2 cup cherry tomatoes", "Fresh spinach"],
    instructions: ["Brown turkey in a skillet", "Boil pasta until al dente", "Toss turkey, pasta, and tomatoes together", "Stir in spinach until wilted and top with feta"]
  },
  {
    title: "Avocado Egg Power Toast",
    img: "eggtoast.jpg",
    description: "Classic breakfast elevated with high-protein bread.",
    protein: "22g Protein",
    calories: "340 cals",
    ingredients: ["2 slices protein bread", "1/2 ripe avocado", "2 poached eggs", "Red pepper flakes", "Lemon juice"],
    instructions: ["Toast the bread", "Mash avocado with lemon juice and spread on toast", "Top with poached eggs", "Season with red pepper flakes"]
  },
  {
    title: "Peanut Butter Banana Smoothie",
    img: "pbsmoothie.jpg",
    description: "The ultimate creamy post-gym shake.",
    protein: "28g Protein",
    calories: "450 cals",
    ingredients: ["1 frozen banana", "1 scoop chocolate protein", "2 tbsp peanut butter", "1 cup almond milk", "Handful of ice"],
    instructions: ["Add all ingredients to a blender", "Blend on high until creamy", "Pour into a glass and enjoy immediately"]
  },
  {
    title: "Lean Beef Stir-Fry",
    img: "beefstirfry.webp",
    description: "Quick Asian-inspired meal with lots of fiber.",
    protein: "42g Protein",
    calories: "480 cals",
    ingredients: ["150g lean beef strips", "2 cups mixed stir-fry veggies", "2 tbsp low-sodium soy sauce", "1 tsp ginger", "1/2 cup brown rice"],
    instructions: ["Sauté beef until browned", "Add vegetables and cook for 5 mins", "Stir in soy sauce and ginger", "Serve over brown rice"]
  },
  {
    title: "Tuna Chickpea Salad",
    img: "tunachickpea.jpg",
    description: "No-cook high-protein lunch option.",
    protein: "38g Protein",
    calories: "410 cals",
    ingredients: ["1 can tuna in water", "1/2 cup chickpeas", "1/4 cup diced cucumber", "1 tbsp Greek yogurt", "Dill"],
    instructions: ["Drain tuna and chickpeas", "Mix all ingredients in a bowl", "Use Greek yogurt instead of mayo for extra protein", "Season with dill and black pepper"]
  },
  {
    title: "Zucchini Noodles with Shrimp",
    img: "zoodleshrimp.jpg",
    description: "Low-carb, light, and refreshing dinner.",
    protein: "32g Protein",
    calories: "290 cals",
    ingredients: ["150g large shrimp", "2 large zucchinis (spiralized)", "2 cloves garlic", "1 tbsp olive oil", "Lemon zest"],
    instructions: ["Sauté garlic and shrimp in olive oil", "Add zucchini noodles for only 2 mins (don't overcook)", "Toss with lemon zest and salt", "Serve immediately"]
  }
];
let displayed_recipes = recipes;
const container = document.getElementById("recipeContainer");
const search_button = document.getElementById("search");
const modal = new bootstrap.Modal(document.getElementById("recipeModal"));
const sort = document.getElementById("sortSelect");


function append_card(container, recipe, index){
  container.innerHTML += `
    <div class="col-md-4 recipe">
      <div class="card h-100 shadow-sm border-0 recipe-card" data-index="${index}">
        <img src="/Assets/${recipe.img}" class="card-img-top" alt="food-img">
        <div class="card-body">
          <h5>${recipe.title}</h5>
          <p class="text-muted">${recipe.description}</p>
          <span class="badge bg-primary">${recipe.protein}</span>
          <span class="badge bg-success">${recipe.calories}</span>
        </div>
      </div>
    </div>
  `;
}

function resetSearch(){
  search.value = "";
  sort.value = "default";
  container.innerHTML = "";
  recipes.forEach((recipe, index) => {
    append_card(container, recipe, index);
  });
  displayed_recipes = recipes;
}

recipes.forEach((recipe, index) => {
  append_card(container, recipe, index);
});

document.addEventListener("click", function(e) {
  const card = e.target.closest(".recipe-card");
  if (!card) return;

  const recipe = recipes[card.dataset.index];

  // Set content
  document.getElementById("modalTitle").textContent = recipe.title;
  document.getElementById("modalImg").src = "/Assets/" + recipe.img;

  // Ingredients
  const ingList = document.getElementById("ingredients");
  ingList.innerHTML = "";
  recipe.ingredients.forEach(item => {
    ingList.innerHTML += `<li>${item}</li>`;
  });

  // Instructions
  const instList = document.getElementById("instructions");
  instList.innerHTML = "";
  recipe.instructions.forEach(step => {
    instList.innerHTML += `<li>${step}</li>`;
  });

  modal.show();
});


search_button.addEventListener("input", (event) => {
  event.preventDefault();
  let search = document.getElementById("search").value.toLowerCase();
  
  // 1. Clear the screen first so we can show new results
  container.innerHTML = "";
  displayed_recipes = [];


  recipes.forEach((recipe, index) => {
    let title = recipe.title.toLowerCase();
    if (title.includes(search)){
      displayed_recipes.push(recipe);
      append_card(container, recipe, index);
    }
  })
  if (displayed_recipes.length == 0){
    container.innerHTML = `
        <div class="col-12 text-center py-5 no-results">
            <div class="display-1 mb-3">🍳</div> 
            <h3 class="fw-bold">No recipes found</h3>
            <p class="text-muted">We couldn't find anything matching "<strong>${search}</strong>".</p>
            <button class="btn  mt-3" onclick="resetSearch()">View All Recipes</button>
        </div>
    `;
  }
})



sort.addEventListener("input", (event) => {
  let input = sort.value;
  if (input == "az"){
    displayed_recipes.sort((a,b) => a.title.localeCompare(b.title));
  } else if (input == "protein"){
    displayed_recipes.sort((a,b) => b.protein.localeCompare(a.protein));
  } else if (input == "calories"){
    displayed_recipes.sort((a,b) => a.calories.localeCompare(b.calories));
  }
  container.innerHTML = "";
    displayed_recipes.forEach((recipe, index) => {
        append_card(container, recipe, index);
    })
})