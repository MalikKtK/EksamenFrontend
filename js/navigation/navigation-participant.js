
document.addEventListener('DOMContentLoaded', function() {
    const placeholder = document.getElementById('nav-participant-placeholder');

    fetch('/fragment/navigation-participant.html')
        .then(response => response.text())
        .then(data => {
            placeholder.innerHTML = data;

            const toggleButton = document.getElementById('nav-toggle');
            const navList = document.getElementById('nav-list');

            toggleButton.addEventListener('click', function() {
                navList.classList.toggle('active');
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
