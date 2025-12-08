
// ============================================
// MOBILE MENU TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const navbar = document.querySelector('.navbar');
    
    // Create mobile menu toggle button
    const menuToggle = document.createElement('div');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.cssText = `
        display: none;
        font-size: 30px;
        color: white;
        cursor: pointer;
        padding: 10px;
        z-index: 1001;
    `;
    
    // Insert menu toggle before navbar
    if (header && navbar) {
        header.insertBefore(menuToggle, navbar);
    }
    
    // Show/hide menu toggle based on screen size
    function checkScreenSize() {
            if (window.innerWidth <= 768) {
                menuToggle.style.display = 'block';
            } else {
                menuToggle.style.display = 'none';
                if (navbar) {
                    navbar.classList.remove('mobile-active');
                    document.body.style.overflow = '';
                }
            }
    }
    
    // Toggle menu on click
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        if (navbar) {
            navbar.classList.toggle('mobile-active');
            
            if (navbar.classList.contains('mobile-active')) {
                menuToggle.innerHTML = '✕';
                menuToggle.style.fontSize = '35px';
                document.body.style.overflow = 'hidden';
            } else {
                menuToggle.innerHTML = '☰';
                menuToggle.style.fontSize = '30px';
                document.body.style.overflow = '';
            }
        }
    });
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 1050 && navbar) {
                navbar.classList.remove('mobile-active');
                menuToggle.innerHTML = '☰';
                menuToggle.style.fontSize = '30px';
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1050 && navbar) {
            if (!navbar.contains(e.target) && !menuToggle.contains(e.target)) {
                if (navbar.classList.contains('mobile-active')) {
                    navbar.classList.remove('mobile-active');
                    menuToggle.innerHTML = '☰';
                    menuToggle.style.fontSize = '30px';
                    document.body.style.overflow = '';
                }
            }
        }
    });
    
    // Initial check and listen for resize
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    const navbar = document.querySelector('.navbar');
                    const menuToggle = document.querySelector('.mobile-menu-toggle');
                    if (navbar && navbar.classList.contains('mobile-active')) {
                        navbar.classList.remove('mobile-active');
                        if (menuToggle) {
                            menuToggle.innerHTML = '☰';
                            menuToggle.style.fontSize = '30px';
                        }
                        document.body.style.overflow = '';
                    }
                }
            }
        });
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;
    
    if (header) {
        if (currentScroll > 100) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
            header.style.padding = '15px 20px';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.boxShadow = 'none';
            header.style.padding = '20px';
        }
    }
    
    lastScroll = currentScroll;
});

// ============================================
// ACTIVE SECTION HIGHLIGHTING
// ============================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// PROJECT FILTER FUNCTIONALITY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects with smooth animation
            projectCards.forEach((card, index) => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                    // Stagger animation
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100);
                } else {
                    card.classList.remove('visible');
                    setTimeout(() => {
                        card.classList.add('hidden');
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// ============================================
// PROJECT CARD TOGGLE DETAILS
// ============================================
function toggleDetails(button) {
    const card = button.closest('.project-card');
    const detail = card.querySelector('.project-detail');
    const techLabel = card.querySelector('.tech-label');
    const technologies = card.querySelector('.technologies');
    const viewBtn = card.querySelector('.view-project-btn');
    
    const isExpanded = detail.classList.contains('expanded');
    
    if (isExpanded) {
        detail.classList.remove('expanded');
        techLabel.classList.remove('expanded');
        technologies.classList.remove('expanded');
        viewBtn.classList.remove('show');
        button.textContent = 'LEARN MORE';
        
        // Smooth collapse
        detail.style.maxHeight = '0';
        techLabel.style.maxHeight = '0';
        technologies.style.maxHeight = '0';
    } else {
        detail.classList.add('expanded');
        techLabel.classList.add('expanded');
        technologies.classList.add('expanded');
        viewBtn.classList.add('show');
        button.textContent = 'SHOW LESS';
        
        // Smooth expand
        detail.style.maxHeight = detail.scrollHeight + 'px';
        techLabel.style.maxHeight = '50px';
        technologies.style.maxHeight = '100px';
    }
}

// ============================================
// CONTACT FORM HANDLING
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show success message
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.classList.add('show');
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            }
            
            // Reset form
            this.reset();
            
            // Log form data (in production, send to server)
            console.log('Form submitted:', { name, email, subject, message });
        });
    }
});

// ============================================
// INPUT FOCUS EFFECTS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (this.parentElement) {
                this.parentElement.style.transform = 'translateX(2px)';
                this.parentElement.style.transition = 'transform 0.2s ease';
            }
        });
        
        input.addEventListener('blur', function() {
            if (this.parentElement) {
                this.parentElement.style.transform = 'translateX(0)';
            }
        });
    });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.certificate-card, .competency-card, .project-card, .education-container, .about-container, .info-box');
    
    reveals.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 100); // Stagger animation
        }
    });
}

// Set initial state for reveal elements
document.addEventListener('DOMContentLoaded', function() {
    const reveals = document.querySelectorAll('.certificate-card, .competency-card, .project-card, .education-container, .about-container, .info-box');
    reveals.forEach(element => {
        element.classList.remove('visible');
    });
    
    // Trigger initial reveal check
    revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// ============================================
// DOWNLOAD CV FUNCTIONALITY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('cvDownloadBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // Create a temporary anchor element to trigger download
            const link = document.createElement('a');
            link.href = 'cv.png';
            link.download = 'Kasun_Banneheka_CV.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Optional: Show a success message
            const originalText = downloadBtn.textContent;
            downloadBtn.textContent = '✓ CV Downloaded!';
            downloadBtn.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';
            downloadBtn.style.color = '#000';
            
            setTimeout(() => {
                downloadBtn.textContent = originalText;
                downloadBtn.style.background = '';
                downloadBtn.style.color = '';
            }, 2000);
        });
    }
    
    // Also handle CV viewing in a modal
    const cvViewBtn = document.getElementById('cvViewBtn');
    if (cvViewBtn) {
        cvViewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showCVModal();
        });
    }
});

// ============================================
// CV MODAL VIEWER
// ============================================
function showCVModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'cv-modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: fadeIn 0.3s ease;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'cv-modal-content';
    modalContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90vh;
        background: white;
        border-radius: 10px;
        overflow: auto;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        animation: slideUp 0.3s ease;
    `;
    
    // Create CV image
    const cvImage = document.createElement('img');
    cvImage.src = 'cv.png';
    cvImage.alt = 'Kasun Banneheka CV';
    cvImage.style.cssText = `
        width: 100%;
        height: auto;
        display: block;
    `;
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.className = 'cv-modal-close';
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 0, 0, 0.8)';
        this.style.transform = 'rotate(90deg)';
    });
    
    closeBtn.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(0, 0, 0, 0.7)';
        this.style.transform = 'rotate(0deg)';
    });
    
    // Create download button in modal
    const modalDownloadBtn = document.createElement('button');
    modalDownloadBtn.innerHTML = '📥 Download CV';
    modalDownloadBtn.style.cssText = `
        position: absolute;
        bottom: 20px;
        right: 20px;
        padding: 12px 24px;
        background: linear-gradient(135deg, #000000, #4954e4);
        color: rgb(2, 252, 156);
        border: none;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        z-index: 10001;
        transition: all 0.3s ease;
    `;
    
    modalDownloadBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    modalDownloadBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    modalDownloadBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = 'cv.png';
        link.download = 'Kasun_Banneheka_CV.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    
    // Close modal function
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.body.contains(modal)) {
            closeModal();
        }
    });
    
    // Append elements
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(cvImage);
    modalContent.appendChild(modalDownloadBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Add CSS animations
    if (!document.getElementById('cv-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'cv-modal-styles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ff0000, #00ff9d);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 999;
        display: none;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.style.display = 'block';
            setTimeout(() => backToTop.style.opacity = '1', 10);
        } else {
            backToTop.style.opacity = '0';
            setTimeout(() => backToTop.style.display = 'none', 300);
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ============================================
// RESPONSIVE IMAGE LOADING
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
    });
});

// ============================================
// PREVENT DEFAULT FOR EMPTY HASH LINKS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const hashLinks = document.querySelectorAll('a[href="#"]');
    
    hashLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
});

// ============================================
// TYPING EFFECT (Optional Enhancement)
// ============================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ============================================
// RESPONSIVE TABLE HANDLING
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    function handleResponsiveElements() {
        const width = window.innerWidth;
        
        // Adjust about section on mobile
        const aboutContainer = document.querySelector('.about-container');
        if (aboutContainer) {
            if (width <= 768) {
                aboutContainer.style.flexDirection = 'column';
            } else {
                aboutContainer.style.flexDirection = 'row';
            }
        }
        
        // Adjust development container on mobile
        const devContainer = document.querySelector('.development-container');
        if (devContainer) {
            if (width <= 768) {
                devContainer.style.flexDirection = 'column';
            } else {
                devContainer.style.flexDirection = 'row';
            }
        }
    }
    
    handleResponsiveElements();
    window.addEventListener('resize', handleResponsiveElements);
});

// ============================================
// SMOOTH HEADER TRANSITION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    if (header) {
        header.style.transition = 'all 0.3s ease';
    }
});

// ============================================
// CONSOLE LOG STYLING (Easter Egg)
// ============================================
console.log('%c🚀 Welcome to Kasun Banneheka\'s Portfolio! ', 'background: #000; color: #00ff9d; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cInterested in the code? Let\'s connect!', 'color: #ff0000; font-size: 14px; font-weight: bold;');
console.log('%c📧 kasunbanneheka0719@gmail.com', 'color: #00ff9d; font-size: 12px;');

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedReveal = debounce(revealOnScroll, 10);
window.removeEventListener('scroll', revealOnScroll);
window.addEventListener('scroll', debouncedReveal);

// ============================================
// LOADING SCREEN (Optional)
// ============================================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

});
