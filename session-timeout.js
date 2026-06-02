(function() {
    let timeout;
    // 3 minutes timeout = 3 * 60 * 1000 = 180000 ms
    const INACTIVITY_LIMIT = 180000; 

    window.logoutUser = function logout() {
        // Only logout if the user is actually logged in
        if (localStorage.getItem('isLoggedIn') === 'true') {
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.removeItem('currentUser');
            
            // If already on the homepage, update the DOM without reloading
            if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/birth')) {
                const loginSection = document.getElementById('login-section');
                const landing = document.getElementById('landing');
                const mainContent = document.getElementById('main-content');
                const loginCard = document.querySelector('.login-card');
                
                // Full State Reset
                window.isStarted = false;
                localStorage.removeItem('wished');
                const flame = document.querySelector('.cake-flame');
                if (flame) flame.classList.remove('extinguished');
                
                if (mainContent) {
                    mainContent.style.opacity = '0';
                    mainContent.style.display = 'none';
                }
                if (landing) {
                    landing.style.opacity = '0';
                    landing.style.display = 'none';
                }
                if (loginSection) {
                    loginSection.style.display = 'flex';
                    // Reset login card animation styles
                    if (loginCard) {
                        loginCard.style.opacity = '1';
                        loginCard.style.transform = 'none';
                        loginCard.style.filter = 'none';
                        // Reset password fields if any
                        const passInput = document.getElementById('login-password');
                        if (passInput) passInput.value = '';
                    }
                }
                
                // Pause background music
                const bgMusic = document.getElementById('bg-music');
                if (bgMusic && !bgMusic.paused) bgMusic.pause();
                
                // Hide floating memories button
                const floatBtn = document.getElementById('floating-memories-btn');
                if (floatBtn) floatBtn.style.display = 'none';
                
                const logoutBtn = document.getElementById('floating-logout-btn');
                if (logoutBtn) logoutBtn.style.display = 'none';
                
            } else {
                // If on another page like image.html, redirect back to index.html
                window.location.href = 'index.html';
            }
        }
    }

    function resetTimer() {
        clearTimeout(timeout);
        // Only start timer if logged in
        if (localStorage.getItem('isLoggedIn') === 'true') {
            timeout = setTimeout(logout, INACTIVITY_LIMIT);
        }
    }

    // Initialize timer on load
    document.addEventListener('DOMContentLoaded', () => {
        resetTimer();
        
        // Listen for activity events to reset the timer
        const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
        events.forEach(event => {
            document.addEventListener(event, resetTimer, { passive: true });
        });
    });
    
    // Also listen to storage changes in case another tab logs out
    window.addEventListener('storage', (event) => {
        if (event.key === 'isLoggedIn' && event.newValue !== 'true') {
            clearTimeout(timeout);
            if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/birth')) {
                const loginSection = document.getElementById('login-section');
                const landing = document.getElementById('landing');
                const mainContent = document.getElementById('main-content');
                const loginCard = document.querySelector('.login-card');
                
                window.isStarted = false;
                localStorage.removeItem('wished');
                const flame = document.querySelector('.cake-flame');
                if (flame) flame.classList.remove('extinguished');
                
                if (mainContent) {
                    mainContent.style.opacity = '0';
                    mainContent.style.display = 'none';
                }
                if (landing) {
                    landing.style.opacity = '0';
                    landing.style.display = 'none';
                }
                if (loginSection) {
                    loginSection.style.display = 'flex';
                    if (loginCard) {
                        loginCard.style.opacity = '1';
                        loginCard.style.transform = 'none';
                        loginCard.style.filter = 'none';
                    }
                }
                const bgMusic = document.getElementById('bg-music');
                if (bgMusic && !bgMusic.paused) bgMusic.pause();
                
                const floatBtn = document.getElementById('floating-memories-btn');
                if (floatBtn) floatBtn.style.display = 'none';
                
                const logoutBtn = document.getElementById('floating-logout-btn');
                if (logoutBtn) logoutBtn.style.display = 'none';
            } else {
                window.location.href = 'index.html';
            }
        }
    });
})();
