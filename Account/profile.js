const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

console.log(savedRecipes);
savedRecipes.forEach((recipe, index) => {
  append_card(container, recipe, index);
});

sort.addEventListener("input", (event) => {
  let input = sort.value;
  if (input == "az"){
    savedRecipes.sort((a,b) => a.title.localeCompare(b.title));
  } else if (input == "protein"){
    savedRecipes.sort((a,b) => b.protein.localeCompare(a.protein));
  } else if (input == "calories"){
    savedRecipes.sort((a,b) => a.calories.localeCompare(b.calories));
  }
  container.innerHTML = "";
    savedRecipes.forEach((recipe, index) => {
        append_card(container, recipe, index);
    })
});