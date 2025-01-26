document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Unauthorized');
        window.location.href = '/login';
        return;
    }

    try {
        const response = await fetch('/api/profile/info', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const profileData = await response.json();
            
            // Заполняем страницу данными профиля
            document.getElementById('profile-name').innerHTML = `<strong>First Name:</strong> ${profileData.first_name} ${profileData.last_name}`;
            document.getElementById('profile-email').innerHTML = `<strong>Email:</strong> ${profileData.email}`;
        } else {
            const error = await response.json();
            alert(`Ошибка: ${error.error}`);
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    } catch (error) {
        console.error('Ошибка при загрузке профиля:', error);
        alert('Произошла ошибка. Попробуйте снова.');
    }
});
