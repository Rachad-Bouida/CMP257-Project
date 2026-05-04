document.getElementById("saveRecipe").addEventListener("click", async () => {
	if (!currentRecipe) return;
	const params = new URLSearchParams();
	params.append('recipeId', currentRecipe.id);
	
	try {
		const resp = await fetch("/api/save", {
			method: 'POST',
			body: params
		});
		if (resp.ok) {
            alert("Recipe saved permanently to your account!");
		} else if (response.status === 400 || response.status === 401) {
            alert("You must be logged in to save recipes.");
	    } else {
			alert("Something went wrong saving the recipe.");
		}
	} catch (error) {
		console.error("Error saving to database:", error);
	}
});


const logoutLink = document.getElementById("logoutLink");

let isLoggedIn;
function updateNavbar() {    
	isLoggedIn = localStorage.getItem("isLoggedIn");
    const loginLink = document.getElementById("loginLink");
    const signupLink = document.getElementById("signupLink");
    const profileLink = document.getElementById("profileLink");
    const saveBtn = document.getElementById("saveRecipe");

    if (isLoggedIn === "true") {
        if (loginLink) loginLink.style.display = "none";
        if (signupLink) signupLink.style.display = "none";
        if (profileLink) profileLink.style.display = "inline";
        if (logoutLink) logoutLink.style.display = "inline";
        if (saveBtn) saveBtn.style.display = "inline-block"; 
    } else {
        if (loginLink) loginLink.style.display = "inline";
        if (signupLink) signupLink.style.display = "inline";
        if (profileLink) profileLink.style.display = "none";
        if (logoutLink) logoutLink.style.display = "none";
        if (saveBtn) saveBtn.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
	isLoggedIn = localStorage.getItem("isLoggedIn");
    updateNavbar();
    
    // Only try to fetch recipes if we are on a page that actually displays them
    if (document.getElementById("recipeContainer")) {
        fetchAllRecipes();
    }
});

logoutLink.addEventListener("click", async (e) => {
  e.preventDefault();
  await fetch('/api/logout', { 
	method: 'POST' });
  localStorage.removeItem("isLoggedIn");
  isLoggedIn = null;
  updateNavbar();
});


const savedRecipesButton = document.getElementById("savedRecipesButton");
savedRecipesButton.addEventListener("click", () => {
	const isLoggedIn = localStorage.getItem("isLoggedIn");
		if (isLoggedIn === "true") {
			window.location.href = '/Account/profile.html';

		    } else {
				window.location.href = '/SIGN-IN/Login.html';

		    }
});


