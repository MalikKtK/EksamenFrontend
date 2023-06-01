
document.addEventListener('DOMContentLoaded', function() {
    const placeholder = document.getElementById('nav-overview-placeholder');

    fetch('/fragment/navigation-overview.html')
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
