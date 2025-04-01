document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".navbar li a");
    const projectTiles = document.querySelectorAll(".project-tile");
    const filterButtons = document.querySelectorAll(".filter-btn");

    // Add active class to current page nav link
    navLinks.forEach(link => {
        if (window.location.href.includes(link.getAttribute("href"))) {
            link.classList.add("active");
        }
        
        link.addEventListener("click", function(e) {
            navLinks.forEach(link => link.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Project filtering functionality
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Toggle active class
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                projectTiles.forEach(tile => {
                    const category = tile.getAttribute('data-category');
                    
                    // Show all or filter by category
                    if (filter === 'all' || filter === category) {
                        tile.style.display = 'flex';
                        setTimeout(() => {
                            tile.style.opacity = 1;
                            tile.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        tile.style.opacity = 0;
                        tile.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            tile.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.project-tile, .content, .embed-container');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in');
                element.style.opacity = 1;
            }
        });
    }
    
    // Initial animation for elements visible on page load
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Handle fade-in animations on home page
    let delay = 0;
    document.querySelectorAll(".fade-in").forEach((element) => {
        setTimeout(() => {
            element.style.opacity = 1;
        }, delay);
        delay += 400; // Reduced delay for smoother experience
    });

    // Add hover effects to project tiles
    projectTiles.forEach(tile => {
        tile.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.2)';
        });
        
        tile.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
});

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    modal.style.display = "flex";
    
    // Add animation classes
    modal.classList.add('modal-active');
    setTimeout(() => {
        modal.querySelector('.modal-content').classList.add('modal-content-active');
    }, 100);
    
    // Prevent scrolling on body
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Remove animation classes
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.classList.remove('modal-content-active');
    }
    
    setTimeout(() => {
        modal.classList.remove('modal-active');
        modal.style.display = "none";
        
        // Re-enable scrolling
        document.body.style.overflow = 'auto';
    }, 300);
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            closeModal(modals[i].id);
        }
    }
}

// Add key press support for closing modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="display: flex"]');
        openModals.forEach(modal => {
            closeModal(modal.id);
        });
    }
});
