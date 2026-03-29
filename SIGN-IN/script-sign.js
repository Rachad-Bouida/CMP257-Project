const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

themeBtn.addEventListener('click', function() {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        themeBtn.textContent = 'Dark Mode';
    } else {
        themeBtn.textContent = 'Light Mode';
    }
});


const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    
    if (emailInput === 'placeholder@gmail.com' && passwordInput === 'placeholder') {
        window.location.href = '/main.html';
    } else {
        alert('Incorrect email or password. Please try again!');
    }
});