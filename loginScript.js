function authenticateUser() {
    // Get login form values
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Retrieve registered user data from localStorage
    const storedUserData = localStorage.getItem('userData');

    // Check if user data exists
    if (storedUserData) {
        // Parse the stored user data from JSON
        const userData = JSON.parse(storedUserData);

        // Check if login credentials match
        if (loginUsername === userData.username && loginPassword === userData.password) {
            alert('Login bem-sucedido!');
            // You can redirect the user to a different page here
            window.location.href = 'index3.html';
        } else {
            alert('Credenciais inválidas. Por favor, tente novamente.');
        }
    } else {
        alert('Nenhum usuário registrado. Por favor, registre-se primeiro.');
    }
   
}
