const signupForm = document.getElementById('signupForm');

if (signupForm) {
    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Create the data to send to the Java Servlet
        const params = new URLSearchParams();
        params.append('email', email);
        params.append('password', password);

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params
            });

            if (response.ok) {
                alert("Account created! Please log in.");
                window.location.href = 'Login.html';
            } else {
                alert("Signup failed. Email might already exist.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
        }
    });
}