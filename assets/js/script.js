// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.work-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form submission - clear fields and show success message
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    // Character counter for textarea
    const messageField = document.getElementById('message');
    const charCount = document.querySelector('.char-count');
    
    if (messageField && charCount) {
        messageField.addEventListener('input', function() {
            charCount.textContent = `(${this.value.length}/500)`;
        });
    }
    
    contactForm.addEventListener('submit', function(e) {
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Change button text immediately
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.disabled = true;
        
        // Clear fields after a brief moment
        setTimeout(() => {
            contactForm.reset();
            if (charCount) {
                charCount.textContent = '(0/500)';
            }
        }, 100);
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 3000);
    });
}

// Work item hover preview modal
const workItems = document.querySelectorAll('.work-item');
const modal = document.getElementById('workPreviewModal');
const previewImage = document.getElementById('previewImage');
const previewTitle = document.getElementById('previewTitle');
const closeBtn = document.querySelector('.work-preview-close');

let hideTimeout;

// Work item hover preview modal

workItems.forEach(item => {
    // Click image to open modal
    const workImage = item.querySelector('.work-image');
    workImage.addEventListener('click', function() {
        const image = item.dataset.image;
        const title = item.dataset.title;
        
        previewImage.src = image;
        previewTitle.textContent = title;
        modal.classList.add('active');
    });
    
    // Click title to open GitHub
    const workTitle = item.querySelector('.work-title');
    workTitle.addEventListener('click', function() {
        const github = item.dataset.github;
        window.open(github, '_blank');
    });
    
    // Hide modal on mouseleave
    item.addEventListener('mouseleave', function() {
        hideTimeout = setTimeout(() => {
            modal.classList.remove('active');
        }, 200);
    });
});

// Keep modal open when hovering over it
modal.addEventListener('mouseenter', function() {
    clearTimeout(hideTimeout);
});

modal.addEventListener('mouseleave', function() {
    hideTimeout = setTimeout(() => {
        modal.classList.remove('active');
    }, 200);
});

// Close modal when clicking X
closeBtn.addEventListener('click', function() {
    modal.classList.remove('active');
});

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});
