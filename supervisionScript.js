document.addEventListener('DOMContentLoaded', function () {
    let valorHora = 10;

    document.getElementById('valorHoraInput').addEventListener('change', function () {
        valorHora = parseFloat(this.value) || 0;
        displayUserRecords(valorHora);
    });

    // Adiciona um evento de clique à lista de registros para delegação de eventos
    document.getElementById('userRecords').addEventListener('click', function (event) {
        const deleteButton = event.target.closest('.deleteButton');
        if (deleteButton) {
            const key = deleteButton.getAttribute('data-key');
            deleteUserRecord(key);
        }
    });

    displayUserRecords(valorHora);
});

function displayUserRecords(valorHora) {
    const allUsers = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('userData_')) {
            const userData = JSON.parse(localStorage.getItem(key));
            userData.key = key;
            allUsers.push(userData);
        }
    }

    const userRecordsList = document.getElementById('userRecords');
    userRecordsList.innerHTML = '';

    if (allUsers.length === 0) {
        const listItem = document.createElement('li');
        listItem.textContent = 'Nenhum usuário registrado.';
        userRecordsList.appendChild(listItem);
    } else {
        const groupedUsers = groupUsersByEmail(allUsers);

        for (const group in groupedUsers) {
            const usersInGroup = groupedUsers[group];

            const groupItem = document.createElement('li');
            groupItem.textContent = `Detalhes para ${group}`;
            userRecordsList.appendChild(groupItem);

            const userList = document.createElement('ul');
            let totalHoursGroup = 0;
            let totalAmountGroup = 0;

            usersInGroup.forEach((user) => {
                const userItem = document.createElement('li');
                const formattedDate = new Date(user.dateWorked).toLocaleDateString('pt-BR');
                const totalAmount = valorHora * parseFloat(user.hoursWorked);

                userItem.innerHTML = `
                    Nome: ${user.username}, 
                    Email: ${user.email}, 
                    Horas: ${user.hoursWorked}, 
                    Data: ${formattedDate}, 
                    Valor/Hora: R$ ${valorHora.toFixed(2)}, 
                    Total: R$ ${totalAmount.toFixed(2)}
                    <button class="deleteButton" data-key="${user.key}">Excluir</button>
                `;

                userList.appendChild(userItem);

                totalHoursGroup += parseFloat(user.hoursWorked);
                totalAmountGroup += totalAmount;
            });

            groupItem.appendChild(userList);

            const totalHoursItem = document.createElement('li');
            totalHoursItem.textContent = `Total de Horas para ${group}: ${totalHoursGroup.toFixed(2)} horas`;
            userList.appendChild(totalHoursItem);

            const totalAmountItem = document.createElement('li');
            totalAmountItem.textContent = `Total em Reais para ${group}: R$ ${totalAmountGroup.toFixed(2)}`;
            userList.appendChild(totalAmountItem);
        }
    }
}

function groupUsersByEmail(users) {
    const userGroups = {};

    users.forEach((user) => {
        const key = `${user.username}_${user.email}`;
        if (!userGroups[key]) {
            userGroups[key] = [];
        }
        userGroups[key].push(user);
    });

    return userGroups;
}

function deleteUserRecord(key) {
    localStorage.removeItem(key);
    displayUserRecords(parseFloat(document.getElementById('valorHoraInput').value) || 0);
}
