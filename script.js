// Smooth scrolling for navigation links
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

// Search functionality
function addSearchFeature() {
    const searchHTML = `
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Search courses, subjects, or topics...">
            <button onclick="performSearch()"><i class="fas fa-search"></i></button>
        </div>

        
    `;
    
    // Add search to navigation
    const navbar = document.querySelector('.navbar .container');
    navbar.insertAdjacentHTML('beforeend', searchHTML);
}

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const searchableElements = document.querySelectorAll('h3, h4, p, li a');
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        const parent = element.closest('.semester-card, .download-card, .video-card');
        
        if (text.includes(searchTerm) && searchTerm !== '') {
            if (parent) parent.style.backgroundColor = '#fff3cd';
            element.style.backgroundColor = '#fff3cd';
        } else {
            if (parent) parent.style.backgroundColor = '';
            element.style.backgroundColor = '';
        }
    });
}

// Initialize search when page loads
document.addEventListener('DOMContentLoaded', function() {
    addSearchFeature();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Progress tracking (optional)
function trackProgress() {
    const completedTopics = JSON.parse(localStorage.getItem('completedTopics') || '[]');
    
    // Mark topic as completed
    function markCompleted(topicId) {
        if (!completedTopics.includes(topicId)) {
            completedTopics.push(topicId);
            localStorage.setItem('completedTopics', JSON.stringify(completedTopics));
            updateProgressDisplay();
        }
    }
    
    // Update progress display
    function updateProgressDisplay() {
        const totalTopics = document.querySelectorAll('[data-topic]').length;
        const completedCount = completedTopics.length;
        const progressPercent = (completedCount / totalTopics) * 100;
        
        // Update progress bar if exists
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = progressPercent + '%';
        }
    }
}
