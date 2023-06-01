document.addEventListener('DOMContentLoaded', function () {
    const participantList = document.getElementById('participant-list');

    fetch('http://localhost:8080/participants')
        .then(response => response.json())
        .then(data => {
            data.forEach(participant => {
                const row = document.createElement('tr');

                // Participant name
                const nameCell = document.createElement('td');
                nameCell.textContent = participant.name;
                row.appendChild(nameCell);

                // Boat
                const boatCell = document.createElement('td');
                boatCell.textContent = participant.boat.name;
                row.appendChild(boatCell);

                // Race
                const raceCell = document.createElement('td');
                raceCell.textContent = participant.race.date;
                row.appendChild(raceCell);

                // Points
                const pointsCell = document.createElement('td');
                pointsCell.textContent = participant.points;
                row.appendChild(pointsCell);

                participantList.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
