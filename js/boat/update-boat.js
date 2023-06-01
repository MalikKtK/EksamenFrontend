document.addEventListener('DOMContentLoaded', function () {
    const updateBoatForm = document.getElementById('update-boat-form');
    const boatSelect = document.getElementById('boat');
    const nameInput = document.getElementById('name');
    const boatTypeSelect = document.getElementById('boat-type');

    fetch('http://localhost:8080/boats')
        .then(response => response.json())
        .then(data => {
            const boats = data;
            boats.forEach(boat => {
                const option = document.createElement('option');
                option.value = boat.id;
                option.textContent = boat.name;
                boatSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    fetch('http://localhost:8080/boats/types')
        .then(response => response.json())
        .then(data => {
            const boatTypes = data;
            boatTypes.forEach(boatType => {
                const option = document.createElement('option');
                option.value = boatType.id;
                option.textContent = boatType.name;
                boatTypeSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    updateBoatForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const boatId = boatSelect.value;
        const name = nameInput.value;
        const boatTypeId = boatTypeSelect.value;

        const boat = {
            id: boatId,
            name: name,
            boatType: { id: boatTypeId }
        };

        fetch(`http://localhost:8080/boats/${boatId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(boat)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Boat updated:', data);
                updateBoatForm.reset();
                window.location.reload(); // Reload the page after update
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    boatSelect.addEventListener('change', function () {
        const boatId = boatSelect.value;
        fetch(`http://localhost:8080/boats/${boatId}`)
            .then(response => response.json())
            .then(data => {
                nameInput.value = data.name;
                boatTypeSelect.value = data.boatType.id;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
