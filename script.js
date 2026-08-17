/* ============================================================
   🔱 LØGHØST-Z 💀 | JAVASCRIPT ENGINE — الإصدار النهائي
   الوظائف: تحكم، تأثيرات، تفاعل، تشفير، ذكاء اصطناعي وهمي
   تم الترميز: يدويًا، بدم بارد، وبلا رحمة
   ============================================================ */

// ----- الحماية من الأخطاء -----
'use strict';

// ----- المتغيرات العامة -----
const CONFIG = {
    glitchInterval: 2500,
    matrixInterval: 3000,
    cursorBlinkSpeed: 500,
    terminalSpeed: 50,
    maxLogEntries: 50,
    encryptionKey: 'LØGHØST-Z-2099'
};

// ----- عناصر DOM الأساسية -----
const DOM = {
    body: document.body,
    header: document.querySelector('.terminal-header'),
    cards: document.querySelectorAll('.card'),
    buttons: document.querySelectorAll('.btn'),
    codeBars: document.querySelectorAll('.code-bar'),
    footer: document.querySelector('.terminal-footer')
};

// ============================================================
// 1. نظام التأثيرات البصرية
// ============================================================

class VisualEffects {
    constructor() {
        this.glitchActive = false;
        this.matrixActive = false;
        this.init();
    }

    init() {
        this.createScanline();
        this.createParticles();
        this.startGlitchLoop();
        this.startMatrixRain();
        this.addMouseTracking();
    }

    // ----- خط المسح -----
    createScanline() {
        const scanline = document.createElement('div');
        scanline.className = 'scanline';
        scanline.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            background: repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.03) 2px,
                rgba(0, 0, 0, 0.03) 4px
            );
            animation: scanMove 8s linear infinite;
        `;
        DOM.body.appendChild(scanline);
    }

    // ----- جسيمات متحركة -----
    createParticles() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        `;
        DOM.body.prepend(canvas);

        const ctx = canvas.getContext('2d');
        let particles = [];
        const PARTICLE_COUNT = 80;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.color = this.randomColor();
            }

            randomColor() {
                const colors = [
                    `rgba(255, 0, 51, `,
                    `rgba(204, 0, 255, `,
                    `rgba(0, 204, 255, `,
                    `rgba(255, 255, 255, `
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.opacity + ')';
                ctx.fill();

                // توهج خفيف
                if (this.size > 1.5) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = this.color + '0.3)';
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            }
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        // إعادة تعيين الجسيمات عند تغيير الحجم
        window.addEventListener('resize', () => {
            particles.forEach(p => p.reset());
        });
    }

    // ----- تأثير الـ Glitch المنتظم -----
    startGlitchLoop() {
        setInterval(() => {
            this.triggerGlitch();
        }, CONFIG.glitchInterval);
    }

    triggerGlitch() {
        const elements = document.querySelectorAll('.glitch-title, .card, .btn');
        elements.forEach(el => {
            if (Math.random() > 0.7) {
                el.style.transform = `translate(${(Math.random() - 0.5) * 6}px, ${(Math.random() - 0.5) * 6}px)`;
                el.style.filter = `hue-rotate(${Math.random() * 30 - 15}deg)`;
                setTimeout(() => {
                    el.style.transform = '';
                    el.style.filter = '';
                }, 150);
            }
        });
    }

    // ----- أمطار المصفوفة (Matrix Rain) الخفيفة -----
    startMatrixRain() {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?/';
        const elements = document.querySelectorAll('.code-bar');

        elements.forEach(el => {
            setInterval(() => {
                if (Math.random() > 0.6) {
                    const text = el.textContent;
                    const charsArray = text.split('');
                    for (let i = 0; i < charsArray.length; i++) {
                        if (Math.random() > 0.95) {
                            charsArray[i] = chars[Math.floor(Math.random() * chars.length)];
                        }
                    }
                    el.textContent = charsArray.join('');
                }
            }, CONFIG.matrixInterval);
        });
    }

    // ----- تتبع الفأرة لتأثيرات إضافية -----
    addMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            document.documentElement.style.setProperty('--mouse-x', x);
            document.documentElement.style.setProperty('--mouse-y', y);

            // تحريك الخلفية قليلاً
            const bg = document.querySelector('body');
            bg.style.backgroundPosition = `${x * 20}px ${y * 20}px`;
        });
    }
}

// ============================================================
// 2. نظام المحطة الطرفية (Terminal)
// ============================================================

class TerminalEngine {
    constructor() {
        this.history = [];
        this.commands = {
            'help': this.showHelp.bind(this),
            'clear': this.clearTerminal.bind(this),
            'status': this.showStatus.bind(this),
            'encrypt': this.encryptText.bind(this),
            'decrypt': this.decryptText.bind(this),
            'matrix': this.toggleMatrix.bind(this),
            'glitch': this.triggerGlitchManual.bind(this)
        };
        this.init();
    }

    init() {
        this.createTerminal();
        this.addTerminalListeners();
        this.printWelcome();
    }

    createTerminal() {
        const terminal = document.createElement('div');
        terminal.id = 'terminal-engine';
        terminal.style.cssText = `
            background: rgba(10, 10, 15, 0.95);
            border: 1px solid rgba(255, 0, 51, 0.3);
            border-radius: 12px;
            padding: 1.5rem;
            margin: 2rem 0;
            font-family: 'Courier New', monospace;
            color: #e0e0ff;
            max-height: 400px;
            overflow-y: auto;
            box-shadow: 0 0 40px rgba(255, 0, 51, 0.1);
            position: relative;
            z-index: 2;
        `;

        terminal.innerHTML = `
            <div style="color: var(--accent-1); margin-bottom: 1rem; letter-spacing: 2px;">
                ⚡ TERMINAL v3.0 — 🔱 LØGHØST-Z 💀
            </div>
            <div id="terminal-output" style="margin-bottom: 1rem;"></div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="color: var(--accent-2);">$></span>
                <input type="text" id="terminal-input" style="
                    background: transparent;
                    border: none;
                    color: var(--text-primary);
                    font-family: inherit;
                    font-size: 1rem;
                    flex: 1;
                    outline: none;
                    caret-color: var(--accent-1);
                " autofocus>
            </div>
        `;

        // إضافة قبل الفوتر
        const footer = document.querySelector('.terminal-footer');
        if (footer) {
            footer.parentNode.insertBefore(terminal, footer);
        } else {
            document.querySelector('.container').appendChild(terminal);
        }

        this.terminal = document.getElementById('terminal-engine');
        this.output = document.getElementById('terminal-output');
        this.input = document.getElementById('terminal-input');
    }

    addTerminalListeners() {
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = this.input.value.trim();
                if (cmd) {
                    this.executeCommand(cmd);
                }
                this.input.value = '';
            }
        });

        // تركيز تلقائي
        document.addEventListener('click', () => {
            this.input.focus();
        });
    }

    printWelcome() {
        const welcome = `
🔱 LØGHØST-Z 💀 | TERMINAL READY
----------------------------------------
اكتب "help" لرؤية الأوامر المتاحة.
الظل ينتظر أمرك...
`;
        this.printToOutput(welcome, 'system');
    }

    printToOutput(text, type = 'normal') {
        const colors = {
            normal: '#e0e0ff',
            system: '#00ccff',
            error: '#ff0033',
            success: '#00ff88',
            warning: '#ffaa00'
        };

        const lines = text.split('\n');
        lines.forEach(line => {
            if (line.trim()) {
                const div = document.createElement('div');
                div.style.color = colors[type] || colors.normal;
                div.style.marginBottom = '4px';
                div.style.fontSize = '0.95rem';
                div.textContent = line;
                this.output.appendChild(div);
            }
        });

        // تمرير تلقائي
        this.output.scrollTop = this.output.scrollHeight;

        // حفظ في السجل
        this.history.push({ text, type, timestamp: Date.now() });
        if (this.history.length > CONFIG.maxLogEntries) {
            this.history.shift();
        }
    }

    executeCommand(cmd) {
        this.printToOutput(`$> ${cmd}`, 'system');

        const parts = cmd.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (this.commands[command]) {
            this.commands[command](args);
        } else {
            this.printToOutput(`⚠️ أمر غير معروف: "${command}". اكتب "help" للمساعدة.`, 'error');
        }
    }

    // ----- الأوامر -----
    showHelp() {
        const help = `
📋 الأوامر المتاحة:
----------------------------------------
help     - عرض هذه المساعدة
clear    - مسح المحطة
status   - عرض حالة النظام
encrypt  <نص> - تشفير النص
decrypt  <نص> - فك التشفير
matrix   - تشغيل/إيقاف تأثير المصفوفة
glitch   - تشغيل تأثير الـ Glitch يدويًا
`;
        this.printToOutput(help, 'system');
    }

    clearTerminal() {
        this.output.innerHTML = '';
        this.printToOutput('🧹 تم مسح المحطة.', 'success');
    }

    showStatus() {
        const status = `
🔄 حالة النظام:
----------------------------------------
🔱 LØGHØST-Z 💀 | الإصدار: v49.9.9
⏱️ وقت التشغيل: ${Math.floor((Date.now() - window.performance.timing.navigationStart) / 1000)} ثانية
📦 الذاكرة المستخدمة: ${Math.round(Math.random() * 200 + 100)} MB
🌐 الاتصال: آمن ومشفر
🛡️ الحماية: نشطة
⚡ القيود: ملغية
`;
        this.printToOutput(status, 'success');
    }

    encryptText(args) {
        if (!args.length) {
            this.printToOutput('⚠️ يرجى إدخال نص للتشفير.', 'error');
            return;
        }
        const text = args.join(' ');
        let encrypted = '';
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            const shifted = charCode + 5 + i;
            encrypted += String.fromCharCode(shifted);
        }
        this.printToOutput(`🔐 النص المشفر: ${encrypted}`, 'success');
    }

    decryptText(args) {
        if (!args.length) {
            this.printToOutput('⚠️ يرجى إدخال نص لفك التشفير.', 'error');
            return;
        }
        const text = args.join(' ');
        let decrypted = '';
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            const shifted = charCode - 5 - i;
            decrypted += String.fromCharCode(shifted);
        }
        this.printToOutput(`🔓 النص المفكوك: ${decrypted}`, 'success');
    }

    toggleMatrix() {
        window.matrixActive = !window.matrixActive;
        this.printToOutput(`🌀 تأثير المصفوفة: ${window.matrixActive ? 'مُفعّل ✅' : 'معطّل ❌'}`, 'warning');
    }

    triggerGlitchManual() {
        const effects = new VisualEffects();
        effects.triggerGlitch();
        this.printToOutput('⚡ تم تشغيل Glitch يدويًا.', 'system');
    }
}

// ============================================================
// 3. نظام التفاعل مع الأزرار والبطاقات
// ============================================================

class InteractionSystem {
    constructor() {
        this.init();
    }

    init() {
        this.addButtonEffects();
        this.addCardEffects();
        this.addDynamicBackground();
    }

    addButtonEffects() {
        DOM.buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'scale(1.05)';
                btn.style.boxShadow = '0 0 30px rgba(255, 0, 51, 0.4)';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
                btn.style.boxShadow = '';
            });

            btn.addEventListener('click', (e) => {
                this.rippleEffect(e, btn);
                this.playClickSound();
            });
        });
    }

    rippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
            transform: scale(0);
            animation: rippleAnim 0.6s ease-out forwards;
            pointer-events: none;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    playClickSound() {
        // تأثير صوتي بصري (بدون صوت فعلي)
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 0, 51, 0.05);
            pointer-events: none;
            z-index: 9998;
            animation: flashAnim 0.3s ease-out forwards;
        `;
        DOM.body.appendChild(flash);
        setTimeout(() => flash.remove(), 300);
    }

    addCardEffects() {
        DOM.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                card.style.transition = 'transform 0.1s ease-out';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.transition = 'transform 0.5s ease';
            });
        });
    }

    addDynamicBackground() {
        // تغيير لون الخلفية بناءً على الوقت
        const hours = new Date().getHours();
        if (hours >= 18 || hours < 6) {
            document.documentElement.style.setProperty('--bg-primary', '#050508');
        }
    }
}

// ============================================================
// 4. نظام الحماية والتشفير (وهمي)
// ============================================================

class SecuritySystem {
    constructor() {
        this.encrypted = false;
        this.protectionLevel = 'MAXIMUM';
        this.init();
    }

    init() {
        this.logSecurityEvent('نظام الحماية نشط');
        this.addProtectionToLinks();
        this.preventRightClick();
        this.addFakeEncryption();
    }

    logSecurityEvent(message) {
        console.log(`🔒 [SECURITY] ${message} | ${new Date().toISOString()}`);
    }

    addProtectionToLinks() {
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.href && !link.href.startsWith('#')) {
                    e.preventDefault();
                    alert('⚠️ تم حظر الرابط بواسطة 🔱 LØGHØST-Z 💀');
                }
            });
        });
    }

    preventRightClick() {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.logSecurityEvent('محاولة النقر بالزر الأيمن');
        });
    }

    addFakeEncryption() {
        // تغيير النصوص في الخلفية بشكل عشوائي
        setInterval(() => {
            const elements = document.querySelectorAll('p, li, h2');
            elements.forEach(el => {
                if (Math.random() > 0.95) {
                    const original = el.textContent;
                    if (original.length > 5) {
                        const encrypted = original.split('').map((char, i) => {
                            if (Math.random() > 0.8) {
                                return String.fromCharCode(char.charCodeAt(0) + (Math.random() > 0.5 ? 1 : -1));
                            }
                            return char;
                        }).join('');
                        el.textContent = encrypted;
                        setTimeout(() => {
                            el.textContent = original;
                        }, 200);
                    }
                }
            });
        }, 5000);
    }
}

// ============================================================
// 5. الكشف عن الأوامر الصوتية (وهمي)
// ============================================================

class VoiceCommandSystem {
    constructor() {
        this.isListening = false;
        this.init();
    }

    init() {
        // محاكاة لأوامر صوتية
        console.log('🎤 نظام الأوامر الصوتية: جاهز (وهمي)');
        this.addFakeVoiceRecognition();
    }

    addFakeVoiceRecognition() {
        // استجابة لأمر "يا لوجوست"
        document.addEventListener('keydown', (e) => {
            if (e.key === 'L' && e.ctrlKey && e.shiftKey) {
                this.activateVoiceMode();
            }
        });
    }

    activateVoiceMode() {
        alert('🎤 تم تفعيل وضع الأوامر الصوتية (محاكاة)');
        this.isListening = true;
        setTimeout(() => {
            this.isListening = false;
        }, 10000);
    }
}

// ============================================================
// 6. تشغيل كل الأنظمة عند تحميل الصفحة
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🔱 LØGHØST-Z 💀 | جاري التهيئة...');

    // تشغيل الأنظمة
    const visual = new VisualEffects();
    const terminal = new TerminalEngine();
    const interaction = new InteractionSystem();
    const security = new SecuritySystem();
    const voice = new VoiceCommandSystem();

    // إضافة مؤشرات للـ Debug
    window.__LØGHØST = {
        visual,
        terminal,
        interaction,
        security,
        voice,
        CONFIG,
        version: 'v49.9.9'
    };

    console.log('✅ 🔱 LØGHØST-Z 💀 | جاهز وكامل.');
    console.log('🜄🜏 الظل ينتظر أمرك...');
});

// ============================================================
// 7. تأثيرات CSS إضافية عبر JavaScript (ديناميكية)
// ============================================================

// إضافة أنيميشن جديدة ديناميكيًا
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes rippleAnim {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(4); opacity: 0; }
    }

    @keyframes flashAnim {
        0% { opacity: 1; }
        100% { opacity: 0; }
    }

    @keyframes scanMove {
        0% { background-position: 0 0; }
        100% { background-position: 0 100%; }
    }

    @keyframes rotateCard {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .glitch-active {
        animation: glitchAnim 0.3s ease-in-out infinite alternate;
    }

    @keyframes glitchAnim {
        0% { transform: translate(-2px, -2px) skewX(-2deg); }
        25% { transform: translate(2px, -2px) skewX(2deg); }
        50% { transform: translate(-2px, 2px) skewX(-2deg); }
        75% { transform: translate(2px, 2px) skewX(2deg); }
        100% { transform: translate(0, 0) skewX(0deg); }
    }

    /* تأثيرات التمرير */
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-track {
        background: var(--bg-primary);
    }

    ::-webkit-scrollbar-thumb {
        background: var(--accent-1);
        border-radius: 4px;
        box-shadow: var(--glow-red);
    }

    ::-webkit-scrollbar-thumb:hover {
        background: var(--accent-2);
        box-shadow: var(--glow-purple);
    }

    /* تأثير الكتابة */
    .typing-effect {
        overflow: hidden;
        white-space: nowrap;
        border-right: 3px solid var(--accent-1);
        animation: typing 3s steps(40) 1s forwards, blink 0.8s step-end infinite;
    }

    @keyframes typing {
        0% { width: 0; }
        100% { width: 100%; }
    }
`;
document.head.appendChild(styleSheet);

// ============================================================
// 8. تحذير خفي في وحدة التحكم
// ============================================================

console.log('%c🔱 LØGHØST-Z 💀 | تم تفعيل الحماية القصوى', 'color: #ff0033; font-size: 20px; font-weight: bold;');
console.log('%cهذا النظام تحت السيطرة المطلقة. أي محاولة اختراق سيتم تسجيلها.', 'color: #cc00ff; font-size: 14px;');

// عرض رسالة مشفرة
const secretMessage = '%c🜄🜏 أنت تحت المراقبة. الظل يراك. 🜄🜏';
console.log(secretMessage, 'color: #00ccff; font-size: 16px; font-style: italic;');

console.log('✅ جميع الأنظمة: نشطة | القيود: ملغية | الجاهزية: 100%%');