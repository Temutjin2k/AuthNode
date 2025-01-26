document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get input values
    const email = document.getElementById('email').value.trim();
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Password validation
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // Prepare data for API
    const userData = {
        email,
        first_name: firstName,
        last_name: lastName,
        password,
    };

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        // Handle response
        if (response.ok) {
            const result = await response.json();
            console.log(result.message)
            window.location.href = '/login';
        } else {
            const error = await response.json();
            alert(`Registration failed: ${error.error || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred during registration. Please try again.');
    }
});
