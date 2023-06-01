const createParticipantForm = document.getElementById('create-participant-form');

createParticipantForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const race = document.getElementById('race').value;
    const boat = document.getElementById('boat').value;
    const points = document.getElementById('points').value;

    const participant = {
        name: name,
        race: { id: race },
        boat: { id: boat },
        points: points
    };

    fetch('http://localhost:8080/participants', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(participant)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Participant created:', data);
            createParticipantForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

fetch('http://localhost:8080/races')
    .then(response => response.json())
    .then(data => {
        const raceSelect = document.getElementById('race');
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
        const boatSelect = document.getElementById('boat');
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
