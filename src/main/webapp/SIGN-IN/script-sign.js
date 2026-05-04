const themeBtn = document.getElementById('theme-toggle');
const body = document.body;


if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    if (themeBtn) themeBtn.textContent = 'Dark Mode';
} else {
    body.classList.remove('light-mode');
    if (themeBtn) themeBtn.textContent = 'Light Mode';
}

if (themeBtn) {
    themeBtn.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            themeBtn.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light'); 
        } else {
            themeBtn.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark'); 
        }
    });
}


