document.addEventListener('DOMContentLoaded', function () {
    const racesTable = document.getElementById('races-table');
    const racesBody = document.getElementById('races-body');
    const participantsTable = document.getElementById('participants-table');
    const participantsBody = document.getElementById('participants-body');
    const boatsTable = document.getElementById('boats-table');
    const boatsBody = document.getElementById('boats-body');

    fetch('http://localhost:8080/races')
        .then(response => response.json())
        .then(data => {
            data.forEach(race => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${race.id}</td>
                    <td>${race.date}</td>
                `;
                racesBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    fetch('http://localhost:8080/participants')
        .then(response => response.json())
        .then(data => {
            data.forEach(participant => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${participant.id}</td>
                    <td>${participant.name}</td>
                    <td>${participant.race.id}</td>
                    <td>${participant.boat.id}</td>
                    <td>${participant.points}</td>
                `;
                participantsBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    fetch('http://localhost:8080/boats')
        .then(response => response.json())
        .then(data => {
            data.forEach(boat => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${boat.id}</td>
                    <td>${boat.name}</td>
                    <td>${boat.boatType.name}</td>
                `;
                boatsBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
