document.addEventListener('DOMContentLoaded', function () {
    const updateParticipantForm = document.getElementById('update-participant-form');
    const participantSelect = document.getElementById('participant');
    const nameInput = document.getElementById('name');
    const boatSelect = document.getElementById('boat');
    const raceSelect = document.getElementById('race');
    const pointsInput = document.getElementById('points');
    let participants = [];

    fetch('http://localhost:8080/participants')
        .then(response => response.json())
        .then(data => {
            participants = data;
            participants.forEach(participant => {
                const option = document.createElement('option');
                option.value = participant.id;
                option.textContent = participant.name;
                participantSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    fetch('http://localhost:8080/races')
        .then(response => response.json())
        .then(data => {
            data.forEach(race => {
                const option = document.createElement('option');
                option.value = race.id;
                option.textContent = race.date;
                raceSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    fetch('http://localhost:8080/boats')
        .then(response => response.json())
        .then(data => {
            data.forEach(boat => {
                const option = document.createElement('option');
                option.value = boat.id;
                option.textContent = boat.name;
                boatSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    participantSelect.addEventListener('change', function () {
        const selectedParticipant = participants.find(participant => participant.id === Number(participantSelect.value));
        nameInput.value = selectedParticipant.name;
        boatSelect.value = selectedParticipant.boat.id;
        raceSelect.value = selectedParticipant.race.id;
        pointsInput.value = selectedParticipant.points;
    });

    updateParticipantForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const participantId = participantSelect.value;
        const name = nameInput.value;
        const boatId = boatSelect.value;
        const raceId = raceSelect.value;
        const points = pointsInput.value;

        const participant = {
            id: participantId,
            name: name,
            boat: { id: boatId },
            race: { id: raceId },
            points: points
        };

        fetch(`http://localhost:8080/participants/${participantId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(participant)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Participant updated:', data);
                updateParticipantForm.reset();
                window.location.reload(); // Reload the page
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
