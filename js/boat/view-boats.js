document.addEventListener('DOMContentLoaded', function () {
    const boatList = document.getElementById('boat-list');

    // Fetch boats and populate the table
    fetch('http://localhost:8080/boats')
        .then(response => response.json())
        .then(data => {
            const boats = data;
            boats.forEach(boat => {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                const typeCell = document.createElement('td');

                nameCell.textContent = boat.name;
                typeCell.textContent = boat.boatType.name;

                row.appendChild(nameCell);
                row.appendChild(typeCell);
                boatList.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
