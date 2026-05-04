let recipes = []; // Ensure this is at the top of the file

async function fetchAllRecipes() {
    try {
        const response = await fetch('/api/recipes');
        recipes = await response.json(); // Assign data to the global variable
        
        container.innerHTML = "";
        
        recipes.forEach((recipe, index) => {
            append_card(container, recipe, index);
        });
    } catch (error) {
        console.error("Error loading recipes:", error);
    }
}

let displayed_recipes;
let container = document.getElementById("recipeContainer");
const search_button = document.getElementById("search");
const modal = new bootstrap.Modal(document.getElementById("recipeModal"));


const themeBtn = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeBtn) themeBtn.textContent = 'Light Mode';
}

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeBtn.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark'); 
        } else {
            themeBtn.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light'); 
        }
    });
}


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

let currentRecipe = null; // track selected recipe

document.addEventListener("click", function(e) {
  const card = e.target.closest(".recipe-card");
  if (!card) return;

  const recipe = recipes[card.dataset.index];
  currentRecipe = recipe;
  
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
	document.getElementById("recipeModal").setAttribute("data-current-id", recipe.id);
  modal.show();
});


search_button.addEventListener("input", (event) => {
  event.preventDefault();
  let search = document.getElementById("search").value.toLowerCase();
  
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
            <h3 class="fw-bold">No recipes found</h3>
            <p class="text-muted">We couldn't find anything matching "<strong>${search}</strong>".</p>
            <button class="btn  mt-3" onclick="resetSearch()">View All Recipes</button>
        </div>
    `;
  }
});

const sort = document.getElementById("sortSelect");
sort.addEventListener("input", (event) => {
  if (!displayed_recipes || displayed_recipes.length == 0){
	displayed_recipes = recipes;
  }
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
});


