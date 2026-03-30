const container = document.getElementById("savedContainer");

const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

savedRecipes.forEach(recipe => {
  container.innerHTML += `
    <div class="col-md-4">
      <div class="card h-100 shadow-sm border-0">
        <img src="${recipe.img}" class="card-img-top" alt="food-img">
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