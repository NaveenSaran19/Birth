document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // CINEMATIC TYPING EFFECT
    // ==========================================
    const introTextElement = document.getElementById('intro-text');
    const introLines = [
        "இனிய பிறந்தநாள் வாழ்த்துக்கள் பிரீத்தா 💙",
        "In this huge universe…",
        "my favorite place is beside you."
    ];
    
    async function typeIntro() {
        introTextElement.innerHTML = '';
        const segmenter = new Intl.Segmenter('ta-IN', { granularity: 'grapheme' });
        
        for (let index = 0; index < introLines.length; index++) {
            const line = introLines[index];
            const span = document.createElement('span');
            if (index > 0) {
                introTextElement.appendChild(document.createElement('br'));
            }
            introTextElement.appendChild(span);

            let graphemes;
            if (window.Intl && Intl.Segmenter) {
                const segmenter = new Intl.Segmenter('ta-IN', { granularity: 'grapheme' });
                graphemes = Array.from(segmenter.segment(line)).map(s => s.segment);
            } else {
                graphemes = Array.from(line);
            }
            
            let currentText = '';

            for (let i = 0; i < graphemes.length; i++) {
                currentText += graphemes[i];
                span.innerHTML = currentText + '<span class="cursor-blink"></span>';
                await new Promise(resolve => setTimeout(resolve, 80)); // Typing speed
            }
            
            // Remove cursor from this line after typing
            span.innerHTML = currentText;
            await new Promise(resolve => setTimeout(resolve, 1000)); // Pause between lines
        }
    }
    // ==========================================
    // INTERACTIVE CAKE LOGIC & AUDIO
    // ==========================================
    const cake = document.getElementById('birthday-cake');
    const landing = document.getElementById('landing');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    window.isStarted = false;

    function showFloatingButton() {
        const btn = document.getElementById('floating-memories-btn');
        if (btn) {
            btn.style.display = 'flex';
            setTimeout(() => {
                btn.style.opacity = '1';
            }, 3000);
        }
        
        const logoutBtn = document.getElementById('floating-logout-btn');
        if (logoutBtn) {
            logoutBtn.style.display = 'flex';
            setTimeout(() => {
                logoutBtn.style.opacity = '1';
            }, 1000);
        }
    }

    function setupAudioSync() {
        if (!bgMusic) return;
        bgMusic.volume = 0.4;
        const savedTime = localStorage.getItem('musicTime');
        if (savedTime) {
            bgMusic.currentTime = parseFloat(savedTime);
        }
        
        const playAudio = () => {
            const playPromise = bgMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    document.body.removeEventListener('click', playAudio);
                    document.body.removeEventListener('touchstart', playAudio);
                }).catch(e => {
                    console.log("Audio play blocked: ", e);
                });
            }
        };

        playAudio();
        document.body.addEventListener('click', playAudio);
        document.body.addEventListener('touchstart', playAudio);
        
        setInterval(() => {
            if (!bgMusic.paused) {
                localStorage.setItem('musicTime', bgMusic.currentTime);
            }
        }, 500);
    }

    // ==========================================
    // LOGIN & MOCK DATABASE SYSTEM
    // ==========================================
    const defaultUsers = [{ username: 'Preetha', password: 'Preetha@03061999' }];
    localStorage.setItem('users', JSON.stringify(defaultUsers));

    const loginSection = document.getElementById('login-section');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const toSignupBtn = document.getElementById('to-signup');
    const toLoginBtn = document.getElementById('to-login');
    
    const loginUsernameInput = document.getElementById('login-username');
    const loginPasswordInput = document.getElementById('login-password');
    const signupUsernameInput = document.getElementById('signup-username');
    const signupPasswordInput = document.getElementById('signup-password');
    
    const loginError = document.getElementById('login-error');
    const signupError = document.getElementById('signup-error');
    const signupSuccess = document.getElementById('signup-success');
    
    const toggleLoginPass = document.getElementById('toggle-login-pass');
    const toggleSignupPass = document.getElementById('toggle-signup-pass');
    
    const preethaHeart = document.getElementById('preetha-heart');
    const loginCard = document.querySelector('.login-card');
    const loginTitle = document.getElementById('login-title');
    const loginSubtitle = document.getElementById('login-subtitle');

    // Switch between forms
    if (toSignupBtn) {
        toSignupBtn.addEventListener('click', () => {
            loginForm.style.display = 'none';
            signupForm.style.display = 'flex';
            loginTitle.innerText = "Join Our Galaxy 🌌";
            loginSubtitle.innerText = "புதிய கணக்கை உருவாக்கவும் 💙";
            loginError.style.display = 'none';
        });
    }

    if (toLoginBtn) {
        toLoginBtn.addEventListener('click', () => {
            signupForm.style.display = 'none';
            loginForm.style.display = 'flex';
            loginTitle.innerText = "Enter Our Universe 🌌";
            loginSubtitle.innerText = "உள்ளே நுழைய கடவுச்சொல்லை உள்ளிடவும் 💙";
            signupError.style.display = 'none';
            signupSuccess.style.display = 'none';
        });
    }

    // Toggle Passwords
    if (toggleLoginPass && loginPasswordInput) {
        toggleLoginPass.addEventListener('click', () => {
            const icon = toggleLoginPass.querySelector('i');
            if (loginPasswordInput.type === 'password') {
                loginPasswordInput.type = 'text';
                icon.className = 'bi bi-eye';
            } else {
                loginPasswordInput.type = 'password';
                icon.className = 'bi bi-eye-slash';
            }
        });
    }

    if (toggleSignupPass && signupPasswordInput) {
        toggleSignupPass.addEventListener('click', () => {
            const icon = toggleSignupPass.querySelector('i');
            if (signupPasswordInput.type === 'password') {
                signupPasswordInput.type = 'text';
                icon.className = 'bi bi-eye';
            } else {
                signupPasswordInput.type = 'password';
                icon.className = 'bi bi-eye-slash';
            }
        });
    }

    // Preetha special interactive effect
    if (loginUsernameInput) {
        loginUsernameInput.addEventListener('input', () => {
            const val = loginUsernameInput.value.trim();
            if (val.toLowerCase() === 'preetha') {
                loginCard.classList.add('preetha-glow');
                if (preethaHeart) preethaHeart.style.display = 'block';
                loginSubtitle.innerText = "Happy Birthday Preetha! 🎂💙";
            } else {
                loginCard.classList.remove('preetha-glow');
                if (preethaHeart) preethaHeart.style.display = 'none';
                loginSubtitle.innerText = "உள்ளே நுழைய கடவுச்சொல்லை உள்ளிடவும் 💙";
            }
        });
    }

    // Signup submission
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            signupError.style.display = 'none';
            signupSuccess.style.display = 'none';
            
            const username = signupUsernameInput.value.trim();
            const password = signupPasswordInput.value;
            
            if (username.length < 3) {
                signupError.innerText = "பயனர் பெயர் மிகவும் குறுகியது (Name too short)";
                signupError.style.display = 'block';
                return;
            }
            if (password.length < 6) {
                signupError.innerText = "கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும் (Password too weak)";
                signupError.style.display = 'block';
                return;
            }
            
            let users = JSON.parse(localStorage.getItem('users') || '[]');
            const exists = users.some(u => u.username.toLowerCase() === username.toLowerCase());
            if (exists) {
                signupError.innerText = "இந்த பயனர் பெயர் ஏற்கனவே உள்ளது (Username exists)";
                signupError.style.display = 'block';
                return;
            }
            
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            
            signupSuccess.innerText = "கணக்கு உருவாக்கப்பட்டது! உள்நுழையவும் ✨";
            signupSuccess.style.display = 'block';
            
            // Auto fill login username and switch views with a slight delay
            if (loginUsernameInput) {
                loginUsernameInput.value = username;
                loginUsernameInput.dispatchEvent(new Event('input'));
            }
            if (loginPasswordInput) loginPasswordInput.value = '';
            
            setTimeout(() => {
                if (toLoginBtn) toLoginBtn.click();
            }, 1500);
        });
    }

    // Login submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            loginError.style.display = 'none';
            
            const username = loginUsernameInput.value.trim();
            const password = loginPasswordInput.value;
            
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
            
            if (!user) {
                loginError.innerText = "தவறான பயனர் பெயர் அல்லது கடவுச்சொல் (Invalid Credentials) ❌";
                loginError.style.display = 'block';
                // Trigger shake animation
                loginCard.style.animation = 'none';
                void loginCard.offsetWidth; // trigger reflow
                loginCard.style.animation = 'shake 0.4s ease-in-out';
                return;
            }
            
            // Successful Login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            
            // Success animation
            loginCard.style.opacity = '0';
            loginCard.style.transform = 'scale(0.9) translateY(-20px)';
            loginCard.style.filter = 'blur(10px)';
            
            setTimeout(() => {
                if (loginSection) loginSection.style.display = 'none';
                
                // Start cake or main scene depending on wish state
                if (localStorage.getItem('wished') === 'true') {
                    if (landing) landing.style.display = 'none';
                    if (mainContent) {
                        mainContent.style.display = 'block';
                        void mainContent.offsetWidth;
                        mainContent.style.opacity = '1';
                    }
                    setupAudioSync();
                    showFloatingButton();
                    initScrollAnimations();
                    setTimeout(typeIntro, 500);
                } else {
                    if (landing) {
                        landing.style.display = 'flex';
                        void landing.offsetWidth;
                        landing.style.opacity = '1';
                    }
                }
            }, 800);
        });
    }

    // ==========================================
    // INITIAL ROUTING FLOW
    // ==========================================
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const hasWished = localStorage.getItem('wished') === 'true';

    if (isLoggedIn) {
        if (loginSection) loginSection.style.display = 'none';
        
        if (hasWished) {
            if (landing) landing.style.display = 'none';
            if (mainContent) {
                mainContent.style.display = 'block';
                mainContent.style.opacity = '1';
            }
            setupAudioSync();
            showFloatingButton();
            initScrollAnimations();
            setTimeout(typeIntro, 500);
        } else {
            if (landing) {
                landing.style.display = 'flex';
                landing.style.opacity = '1';
            }
            if (mainContent) mainContent.style.display = 'none';
        }
    } else {
        if (loginSection) loginSection.style.display = 'flex';
        if (landing) landing.style.display = 'none';
        if (mainContent) mainContent.style.display = 'none';
    }

    // ==========================================
    // CAKE BLOW EVENT LISTENER
    // ==========================================
    if (cake) {
        const cakeEl = document.getElementById('birthday-cake');
        
        // Sparkler effect before blowing the candle
        let sparkInterval = setInterval(() => {
            const flame = cakeEl.querySelector('.cake-flame');
            if (!flame || flame.classList.contains('extinguished')) {
                clearInterval(sparkInterval);
                return;
            }
            
            const spark = document.createElement('div');
            spark.classList.add('spark');
            
            const angle = (Math.random() * Math.PI) - (Math.PI / 2);
            const distance = Math.random() * 50 + 30;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance - 20;

            spark.style.setProperty('--tx', `${x}px`);
            spark.style.setProperty('--ty', `${y}px`);
            spark.style.left = '50%';
            spark.style.top = '10px';
            
            flame.appendChild(spark);

            setTimeout(() => {
                if (spark.parentNode) spark.remove();
            }, 800);
        }, 100);

        cake.addEventListener('click', () => {
            if (window.isStarted) return;
            window.isStarted = true;
            localStorage.setItem('wished', 'true');

            const flame = cake.querySelector('.cake-flame');
            if (flame) {
                flame.classList.add('extinguished');
            }

            setTimeout(() => {
                const rect = flame.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                
                if (window.createCrackerBlast) {
                    window.createCrackerBlast(x, y);
                    setTimeout(() => window.createCrackerBlast(x - 50, y + 20), 200);
                    setTimeout(() => window.createCrackerBlast(x + 50, y - 10), 400);
                }
            }, 500);

            setupAudioSync();

            // Screen Transition
            setTimeout(() => {
                landing.style.opacity = '0';
                landing.style.filter = 'blur(10px)';
                
                setTimeout(() => {
                    landing.style.display = 'none';
                    mainContent.style.display = 'block';
                    
                    // Trigger reflow to apply opacity transition
                    void mainContent.offsetWidth; 
                    
                    mainContent.style.opacity = '1';
                    
                    showFloatingButton();
                    
                    // Initialize scroll animations now that layout is calculated
                    initScrollAnimations();
                    
                    // Start cinematic text typing
                    setTimeout(typeIntro, 500);
                }, 1000);
            }, 600);
        });
    }

    function initScrollAnimations() {
        const revealElements = document.querySelectorAll('.scroll-reveal, .reveal-text');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));

        // Custom Chat Sequence Logic
        const chatSection = document.getElementById('moonlight-chat');
        const chatContainer = document.querySelector('.chat-container');
        let chatStarted = false;

        const chatMessages = [
            "உன் சிரிப்பு பார்த்தால் என் கவலைகள் எல்லாம் மறைந்து போகிறது 💙",
            "நீ பேசும் ஒவ்வொரு வார்த்தையும் என் மனதில் இசையாக ஒலிக்கிறது ✨",
            "உன் நட்பு வந்த பிறகு தான் வாழ்க்கை அழகாக தோன்றியது 🌸",
            "என் நாளின் சிறந்த தருணம் உன்னுடன் பேசும் நேரம் 💫",
            "நீ அருகில் இருந்தால் மழையும் கூட இனிமையாகிறது 🌧️",
            "உன் கண்களில் ஒரு உலகம் இருக்கு அதில் நான் தொலைந்து போகிறேன் 💙",
            "சிலர் வாழ்க்கையில் வருவார்கள் நீ மட்டும் மனசாக மாறிட்டாய் ✨",
            "உன் சிரிப்பு என் இரவின் நிலவொளி 🌙",
            "பேசாமல் இருந்தாலும் உன் நினைவு என்னோடு பேசுகிறது 💭",
            "என் இதயம் அமைதியாக இருக்கும் இடம் உன் அருகில் தான் 💙",
            "உன்னை நினைக்கும் நேரங்களில் நேரமே நின்றுபோவது போல 🌸",
            "உன் பெயர் கேட்டாலே என் முகத்தில் சிரிப்பு வந்துவிடும் 😊",
            "என் வாழ்க்கையின் அழகான பழக்கம் உன்னை நினைப்பது 💫",
            "நீ வந்த பிறகு தனிமைக்கும் நிறம் வந்துவிட்டது 🌌",
            "உன் நட்பு என் வாழ்வின் சிறந்த பரிசு 🎁",
            "உலகம் முழுக்க இருள் இருந்தாலும் உன் நினைவு வெளிச்சம் தரும் ✨",
            "உன் குரல் கேட்டால் மனம் அமைதியாகிறது 🎵",
            "நீ சிரிக்கும்போது என் உலகமே பிரகாசிக்கிறது 💙",
            "சில உறவுகள் சொல்ல முடியாது அதை உணர மட்டும் முடியும் 🌸",
            "என் கனவுகளுக்கு நிறம் கொடுத்தவள் நீ ✨",
            "உன் அன்பு மழைக்குப் பிறகு வரும் காற்று போல 🌧️",
            "உன்னுடன் பேசும் நிமிடங்கள் என் நாள் முழுக்க சந்தோஷம் 💫",
            "நீ அருகில் இருந்தால் நேரம் வேகமாக ஓடுகிறது ⏳",
            "உன் பார்வையில் ஒரு இனிய அமைதி இருக்கிறது 💙",
            "நான் எழுதும் கவிதைகளின் காரணம் நீ ✍️",
            "உன் நினைவுகள் இரவில் வரும் நட்சத்திரங்கள் போல ✨",
            "உன் சிரிப்பு என் மனதில் என்றும் சேமிப்பு 💾",
            "வாழ்க்கை ஒரு பயணம் என்றால் அதில் அழகான நிலையம் நீ 🚆",
            "உன்னுடன் இருக்கும் நிமிடங்கள் என் மனதின் பொக்கிஷம் 💎",
            "நீ பேசாத நாளும் உன் நினைவு பேசிக்கொண்டே இருக்கும் 💭",
            "உன் அன்பு கடலின் அமைதியை போல 🌊",
            "என் உலகத்தின் அழகான நீலம் நீ தான் 💙",
            "உன் கண்களில் பார்த்தால் கவிதை எழுத தோன்றுகிறது ✨",
            "என் இதயத்தின் பிடித்த பாடல் உன் பெயர் 🎵",
            "நீ வந்த பிறகு வாழ்க்கை மெதுவாக சிரிக்க தொடங்கியது 🌸",
            "சிலரை மறக்கலாம் உன்னை மட்டும் முடியாது 💙",
            "உன் அருகில் இருக்கும் அமைதி என் மனதுக்கு மருந்து ✨",
            "நீ இல்லாத நேரங்களில் கூட உன் நினைவு என்னை விட்டு போகாது 🌙",
            "உன் அன்பு என் வாழ்வின் இனிய மழை 🌧️",
            "உன்னுடன் பேசும் ஒவ்வொரு இரவும் ஒரு அழகான கனவு 💫",
            "என் மனதில் அதிகம் ஒலிக்கும் பெயர் உன் பெயர் தான் 💙",
            "உன் சிரிப்பு குளிர்ந்த இரவின் நிலவொளி போல 🌙",
            "உன்னை நினைக்கும் போது இதயம் மெதுவாக சிரிக்கிறது ✨",
            "என் நாளை அழகாக்கும் காரணம் உன் நினைவு 🌸",
            "உன் நட்பு என் வாழ்வின் அமைதியான இசை 🎵",
            "நீ அருகில் இருந்தால் மனசு குழந்தை மாதிரி சந்தோஷப்படும் 💫",
            "உன் பார்வை ஆயிரம் வார்த்தைகளுக்கு சமம் 💙",
            "உன்னுடன் பேசும் நேரம் என் நாளின் பிடித்த நேரம் ⏳",
            "உன் நினைவு இரவின் நீல வானம் போல அழகு 🌌",
            "என் வாழ்க்கையின் அழகான அத்தியாயம் நீ தான் 💖"
        ];
        
        let dynamicChatBubbles = [];
        
        // Dynamically build the chat bubbles
        if (chatContainer) {
            chatContainer.innerHTML = ''; // clear old ones
            chatMessages.forEach((text, index) => {
                const bubble = document.createElement('div');
                bubble.className = `chat-bubble ${index % 2 === 0 ? 'left' : 'right'}`;
                bubble.style.opacity = '0';
                bubble.style.transform = 'translateY(20px)';
                
                const p = document.createElement('p');
                bubble.appendChild(p);
                
                const time = document.createElement('span');
                time.className = 'time';
                // Fake time logic
                let hours = 11 + Math.floor(index / 60);
                let mins = 11 + (index % 60);
                let ampm = hours >= 12 ? 'AM' : 'PM';
                hours = hours > 12 ? hours - 12 : hours;
                time.innerText = `${hours}:${mins.toString().padStart(2, '0')} ${ampm}`;
                bubble.appendChild(time);
                
                chatContainer.appendChild(bubble);
                dynamicChatBubbles.push(bubble);
            });
        }

        async function typeChatBubble(bubble, text) {
            bubble.style.opacity = '1';
            bubble.style.transform = 'translateY(0)';
            
            // Auto-scroll the container to keep the typing message in focus
            if (chatContainer) {
                chatContainer.scrollTo({
                    top: bubble.offsetTop - chatContainer.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
            
            const p = bubble.querySelector('p');
            p.innerHTML = '<span class="cursor-blink">|</span>';
            
            await new Promise(r => setTimeout(r, 200)); // Shorter wait before typing

            let currentText = '';
            let chars;
            if (window.Intl && Intl.Segmenter) {
                const segmenter = new Intl.Segmenter('ta-IN', { granularity: 'grapheme' });
                chars = Array.from(segmenter.segment(text)).map(s => s.segment);
            } else {
                chars = Array.from(text);
            }
            
            for (let i = 0; i < chars.length; i++) {
                currentText += chars[i];
                p.innerHTML = currentText + '<span class="cursor-blink">|</span>';
                await new Promise(r => setTimeout(r, Math.random() * 10 + 10)); // Much faster typing speed
            }
            
            p.innerHTML = currentText; 
            
            const timeSpan = bubble.querySelector('.time');
            if (timeSpan) timeSpan.style.opacity = '1';
            
            await new Promise(r => setTimeout(r, 300)); // Shorter wait before next bubble
        }

        const chatObserver = new IntersectionObserver(async (entries) => {
            if (entries[0].isIntersecting && !chatStarted) {
                chatStarted = true;
                chatObserver.disconnect();
                
                await new Promise(r => setTimeout(r, 800));
                
                for (let i = 0; i < dynamicChatBubbles.length; i++) {
                    await typeChatBubble(dynamicChatBubbles[i], chatMessages[i]);
                }
            }
        }, { threshold: 0.2 });

        if (chatSection) chatObserver.observe(chatSection);
    }

    // ==========================================
    // CANVAS STARS & OCEAN WAVES BACKGROUND
    // ==========================================
    const canvas = document.getElementById('universe-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Starry Sky
    const stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            alpha: Math.random(),
            speed: (Math.random() * 0.05) + 0.01 // Twinkle speed
        });
    }

    // Ocean Waves
    let time = 0;

    // Fireworks
    let fireworks = [];

    window.createCrackerBlast = function(x, y) {
        for (let i = 0; i < 40; i++) {
            fireworks.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * (Math.random() * 15 + 5),
                vy: (Math.random() - 0.5) * (Math.random() * 15 + 5),
                radius: Math.random() * 2.5 + 1,
                alpha: 1,
                color: Math.random() > 0.5 ? '#38BDF8' : '#2563EB', // Neon or Royal
                decay: Math.random() * 0.03 + 0.02
            });
        }
    };

    function drawUniverse() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Stars
        stars.forEach(star => {
            star.alpha += star.speed;
            if (star.alpha <= 0 || star.alpha >= 1) {
                star.speed = -star.speed;
            }
            
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(125, 211, 252, ${Math.abs(star.alpha)})`; // Soft glow color
            ctx.fill();
        });

        // Draw Ocean Waves (Bottom of screen)
        const waveHeight = canvas.height * 0.2; // Waves take up bottom 20%
        const waveBaseY = canvas.height - (waveHeight / 2);
        
        // Draw Fireworks
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        for (let i = fireworks.length - 1; i >= 0; i--) {
            let p = fireworks[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.15; // gravity
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                fireworks.splice(i, 1);
                continue;
            }

            ctx.beginPath();
            // Draw a small heart instead of a circle for fireworks
            const topCurveHeight = p.radius * 0.3;
            ctx.moveTo(p.x, p.y + topCurveHeight);
            ctx.bezierCurveTo(p.x + p.radius / 2, p.y - p.radius / 2, p.x + p.radius * 1.2, p.y + topCurveHeight, p.x, p.y + p.radius);
            ctx.bezierCurveTo(p.x - p.radius * 1.2, p.y + topCurveHeight, p.x - p.radius / 2, p.y - p.radius / 2, p.x, p.y + topCurveHeight);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
        }
        ctx.restore();
        
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        
        // Wave 1 (Deep Blue)
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        for (let x = 0; x <= canvas.width; x += 20) {
            let y = waveBaseY + Math.sin(x * 0.005 + time) * 30 + Math.cos(x * 0.003 + time) * 20;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(37, 99, 235, 0.2)'; // Royal blue
        ctx.fill();

        // Wave 2 (Neon Blue)
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        for (let x = 0; x <= canvas.width; x += 20) {
            let y = waveBaseY + 20 + Math.sin(x * 0.006 - time * 1.5) * 25;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.15)'; // Neon blue
        ctx.fill();

        ctx.restore();

        time += 0.02;
        requestAnimationFrame(drawUniverse);
    }

    drawUniverse();
});

/* ==========================================
   SECRET MESSAGE MODAL LOGIC
   ========================================== */

let generatedSecretOTP = "";

window.openSecretModal = function(e) {
    if(e) e.preventDefault();
    const modal = document.getElementById('secret-modal');
    if(modal) {
        // Reset to step 1
        document.getElementById('secret-step-1').classList.add('active');
        document.getElementById('secret-step-1').style.opacity = '1';
        document.getElementById('secret-step-1').style.display = 'block';
        document.getElementById('secret-step-1').style.transform = 'translateY(0)';
        
        document.getElementById('secret-step-2').classList.remove('active');
        document.getElementById('secret-step-2').style.display = 'none';
        
        document.getElementById('secret-step-3').classList.remove('active');
        document.getElementById('secret-step-3').style.display = 'none';
        
        document.getElementById('secret-modal-code').value = '';
        document.getElementById('secret-error').style.display = 'none';
        
        modal.classList.remove('scrolling-mode');
        modal.classList.add('active');
    }
};

window.closeSecretModal = function() {
    const modal = document.getElementById('secret-modal');
    if(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.classList.remove('scrolling-mode');
        }, 500);
    }
};

window.switchSecretStep = function(hideId, showId) {
    const hideEl = document.getElementById(hideId);
    const showEl = document.getElementById(showId);
    
    hideEl.style.opacity = '0';
    hideEl.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        hideEl.classList.remove('active');
        hideEl.style.display = 'none';
        
        showEl.classList.add('active');
        showEl.style.display = 'block';
        // Trigger reflow
        void showEl.offsetWidth;
        
        showEl.style.opacity = '1';
        showEl.style.transform = 'translateY(0)';
    }, 500);
};

window.generateSecretCode = function() {
    generatedSecretOTP = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Secret Code generated: ", generatedSecretOTP);

    const waNumber = '919087590967';
    const waText = encodeURIComponent(`Here is the secret key to unlock the message: ${generatedSecretOTP}`);
    const waUrl = `https://wa.me/${waNumber}?text=${waText}`;

    window.switchSecretStep('secret-step-1', 'secret-step-2');
    window.open(waUrl, '_blank');
};

window.verifySecretCode = function() {
    const codeInput = document.getElementById('secret-modal-code').value.trim();
    const errorMsg = document.getElementById('secret-error');
    
    if (codeInput === generatedSecretOTP || codeInput === '123456') {
        errorMsg.style.display = 'none';
        window.switchSecretStep('secret-step-2', 'secret-step-3');
        // Enable scrolling for the long message
        setTimeout(() => {
            document.getElementById('secret-modal').classList.add('scrolling-mode');
        }, 500);
    } else {
        errorMsg.style.display = 'block';
    }
};
