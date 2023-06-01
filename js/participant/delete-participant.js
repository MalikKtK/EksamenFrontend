const participantList = document.getElementById('participant-list');

participantList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
        const participantId = event.target.dataset.participantId;

        fetch(`http://localhost:8080/participants/${participantId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.log('Participant deleted successfully');
                    // Remove the deleted participant row from the table
                    event.target.closest('tr').remove();
                } else {
                    console.error('Error:', response.status);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});

fetch('http://localhost:8080/participants')
    .then(response => response.json())
    .then(data => {
        data.forEach(participant => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = participant.name;
            row.appendChild(nameCell);

            const boatCell = document.createElement('td');
            boatCell.textContent = participant.boat.name;
            row.appendChild(boatCell);

            const raceCell = document.createElement('td');
            raceCell.textContent = participant.race.date;
            row.appendChild(raceCell);

            const pointsCell = document.createElement('td');
            pointsCell.textContent = participant.points;
            row.appendChild(pointsCell);

            const actionCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = 'Delete';
            deleteButton.dataset.participantId = participant.id;
            actionCell.appendChild(deleteButton);
            row.appendChild(actionCell);

            participantList.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
