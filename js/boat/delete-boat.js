document.addEventListener('DOMContentLoaded', function () {
    const deleteBoatForm = document.getElementById('delete-boat-form');
    const boatSelect = document.getElementById('boat');

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

    deleteBoatForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const boatId = boatSelect.value;

        fetch(`http://localhost:8080/boats/${boatId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    console.log('Boat deleted successfully');
                    deleteBoatForm.reset();
                    window.location.reload(); // Reload the page
                } else {
                    console.error('Error:', response.status);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
