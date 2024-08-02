document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".navbar li a");

    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            navLinks.forEach(link => link.classList.remove("active"));
            this.classList.add("active");
        });
    });

    let delay = 0;
    document.querySelectorAll(".fade-in").forEach((element) => {
        setTimeout(() => {
            element.style.opacity = 1;
        }, delay);
        delay += 1000; // Increase delay for the next element
    });
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    var modals = document.getElementsByClassName('modal');
    for (var i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = "none";
        }
    }
}
