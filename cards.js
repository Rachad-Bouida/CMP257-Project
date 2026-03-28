const recipes = [
  {
    title: "Steak & Quinoa Power Bowl",
    img: "sqbowl.jpg",
    description: "Perfect for post-workout recovery. Ready in 20 mins.",
    protein: "55g Protein",
    calories: "600 cals",
    ingredients: [
      "200g lean flank steak", "1 cup cooked quinoa", "1/2 cup broccoli", "1 tbsp teriyaki glaze"],
    instructions: ["Season steak", "Sear 3-4 mins", "Slice steak", "Serve with quinoa"]
  },
  {
    title: "Oatmeal Protein Pancakes",
    img: "pancake.jpg",
    description: "High-protein breakfast option.",
    protein: "30g Protein",
    calories: "420 cals",
    ingredients: ["Placeholder"],
    instructions: ["Placeholder"]
  },
  {
    title: "Spicy Crunchy Chicken Salad",
    img: "sccsalad.jpg",
    description: "High-protein breakfast option.",
    protein: "45g Protein",
    calories: "380 cals",
    ingredients: ["Placeholder"],
    instructions: ["Placeholder"]
  }
  ];

const container = document.getElementById("recipeContainer");

recipes.forEach((recipe, index) => {
  container.innerHTML += `
    <div class="col-md-4">
      <div class="card h-100 shadow-sm border-0 recipe-card" data-index="${index}">
        <img src="${recipe.img}" class="card-img-top">
        <div class="card-body">
          <h5>${recipe.title}</h5>
          <p class="text-muted">${recipe.description}</p>
          <span class="badge bg-primary">${recipe.protein}</span>
          <span class="badge bg-success">${recipe.calories}</span>
        </div>
      </div>
    </div>
  `;
});

const modal = new bootstrap.Modal(document.getElementById("recipeModal"));

document.addEventListener("click", function(e) {
  const card = e.target.closest(".recipe-card");
  if (!card) return;

  const recipe = recipes[card.dataset.index];

  // Set content
  document.getElementById("modalTitle").textContent = recipe.title;
  document.getElementById("modalImg").src = recipe.img;

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