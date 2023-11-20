function registerUser() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!username || !email || !password || !confirmPassword) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (password !== confirmPassword) {
        alert('As senhas não coincidem.');
        return;
    }

    const userData = {
        username: username,
        email: email,
        password: password
    };

    // Armazenando os dados do usuário no localStorage
    localStorage.setItem('userData', JSON.stringify(userData));

    alert('Usuário registrado com sucesso!');
    window.location.href = 'index2.html';
    // Adicionando uma chamada para a função displayUserRecords após o registro bem-sucedido
    displayUserRecords();
}
