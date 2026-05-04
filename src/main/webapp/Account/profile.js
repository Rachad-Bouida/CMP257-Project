let savedRecipes = [];
container = document.getElementById("savedRecipeContainer");

async function fetchSavedRecipes(){
	try{
	const response = await fetch("/api/saved-recipes");
	recipes = await response.json();
	recipes.forEach((recipe, index) => {
	  append_card(container, recipe, index);
	});
	
	} catch (error){
		console.error("Error loading from database:", error);

	}
}

async function getEmailFromServer() {
    try {
        const response = await fetch('/api/user');
        const data = await response.json();
        
        return data.email;
    } catch (error) {
        console.error("Error retrieving email:", error);
    }
}


document.addEventListener("DOMContentLoaded", async () => {  
	const email = await getEmailFromServer();
	await fetchSavedRecipes();  
	
	document.getElementById("profileEmail").innerHTML = email;
	document.getElementById("savedCount").innerHTML = recipes.length;
    
});





document.getElementById("logoutLink").addEventListener("click", async (e) => {
  e.preventDefault();
  await fetch('/api/logout', { 
  	method: 'POST' });
  localStorage.removeItem("isLoggedIn"); 
  window.location.href = '/index.html';

});






document.getElementById("removeFromModal").addEventListener("click", async (e) => {

  e.preventDefault();
  const recipeId =   document.getElementById("recipeModal").getAttribute("data-current-id");
  console.log(recipeId);
  const params = new URLSearchParams();
  params.append('recipeId', recipeId);
  await fetch('/api/removeSaved', { 
  	method: 'POST',
	body:  params
  });
  window.location.href = '/Account/profile.html';

});