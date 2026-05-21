document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // CINEMATIC TYPING EFFECT
    // ==========================================
    const introTextElement = document.getElementById('intro-text');
    const introLines = [
        "In this huge universe…",
        "my favorite place is beside you. 💙"
    ];
    
    async function typeIntro() {
        introTextElement.innerHTML = '';
        for (let index = 0; index < introLines.length; index++) {
            const line = introLines[index];
            const span = document.createElement('span');
            if (index > 0) {
                introTextElement.appendChild(document.createElement('br'));
            }
            introTextElement.appendChild(span);

            for (let i = 0; i <= line.length; i++) {
                span.innerHTML = line.substring(0, i) + '<span class="cursor-blink"></span>';
                await new Promise(resolve => setTimeout(resolve, 80)); // Typing speed
            }
            
            // Remove cursor from this line after typing
            span.innerHTML = line;
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
    let isStarted = false;

    function setupAudioSync() {
        if (!bgMusic) return;
        bgMusic.volume = 0.4;
        const savedTime = localStorage.getItem('musicTime');
        if (savedTime) {
            bgMusic.currentTime = parseFloat(savedTime);
        }
        bgMusic.play().catch(e => console.log("Audio play blocked: ", e));
        
        setInterval(() => {
            if (!bgMusic.paused) {
                localStorage.setItem('musicTime', bgMusic.currentTime);
            }
        }, 500);
    }

    if (localStorage.getItem('wished') === 'true') {
        // Skip candle if already wished
        if (landing) landing.style.display = 'none';
        if (mainContent) {
            mainContent.style.display = 'block';
            mainContent.style.opacity = '1';
        }
        setupAudioSync();
        initScrollAnimations();
        setTimeout(typeIntro, 500);
    } else if (cake) {
        cake.addEventListener('click', () => {
            if (isStarted) return;
            isStarted = true;
            localStorage.setItem('wished', 'true');

            const flame = cake.querySelector('.cake-flame');
            if (flame) {
                flame.classList.add('extinguished');
                
                const rect = flame.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                
                if (window.createCrackerBlast) {
                    window.createCrackerBlast(x, y);
                    setTimeout(() => window.createCrackerBlast(x - 50, y + 20), 200);
                    setTimeout(() => window.createCrackerBlast(x + 50, y - 10), 400);
                }
            }

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
            const chars = Array.from(text);
            
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
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
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
