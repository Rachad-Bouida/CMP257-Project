
const loginForm = document.getElementById('loginform');

loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const response = await fetch('/api/login', {
        method: 'POST',
        body: new URLSearchParams(formData)
    });

    if (response.ok) {
		const email = document.getElementById("email").value;
        localStorage.setItem("isLoggedIn", "true");
		localStorage.setItem("email", email);
        window.location.href = '/Account/profile.html';
    } else {
        alert('Invalid credentials');
    }
});