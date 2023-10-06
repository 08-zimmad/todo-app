document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');


    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        // Make a POST request to the login endpoint
        try {
            const response = await fetch('/auth/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;

                // Store the token in local storage (for simplicity, use a more secure method in production)
                localStorage.setItem('token', token);

                // Display a success message
                window.location.href = 'http://172.0.0.1:8000/auth/api';
            } else {
                // Display an error message
                messageElement.textContent = 'Login failed. Invalid credentials.';
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });
});
