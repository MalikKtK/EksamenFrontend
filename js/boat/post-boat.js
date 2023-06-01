
function populateBoatTypes() {
    fetch('http://localhost:8080/boats/types')
        .then(response => response.json())
        .then(data => {
            const selectElement = document.getElementById('boat-type');
            selectElement.innerHTML = '';

            data.forEach(boatType => {
                const optionElement = document.createElement('option');
                optionElement.value = boatType.id;
                optionElement.textContent = boatType.name;
                selectElement.appendChild(optionElement);
            });
        })
        .catch(error => {
            console.error('Error fetching boat types:', error);
        });
}

function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const boatName = form.elements['name'].value;
    const boatTypeId = form.elements['boat-type'].value;

    const boat = {
        name: boatName,
        boatType: {
            id: boatTypeId
        }
    };

    fetch('http://localhost:8080/boats', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(boat)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Boat created:', data);
            form.reset();
            populateBoatTypes();
        })
        .catch(error => {
            console.error('Error creating boat:', error);
        });
}

document.getElementById('create-boat-form').addEventListener('submit', handleFormSubmit);

populateBoatTypes();
