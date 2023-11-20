function registerWork() {
    const hoursWorked = document.getElementById('hours').value;
    const dateWorked = document.getElementById('date').value;

    if (!hoursWorked || !dateWorked) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Obter dados do usuário registrado
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
        alert('Nenhum usuário registrado. Por favor, registre-se primeiro.');
        return;
    }

    // Adicionando informações de nome e e-mail aos dados de registro
    userData.hoursWorked = hoursWorked;
    userData.dateWorked = dateWorked;

    // Armazenando os dados de registro no localStorage
    const key = `userData_${Date.now()}`;
    localStorage.setItem(key, JSON.stringify(userData));

    alert(`Horas ${hoursWorked} registradas com sucesso em ${dateWorked}.`);
    window.
    // Adicionando uma chamada para a função displayUserRecords após o registro bem-sucedido
    displayUserRecords();
}
