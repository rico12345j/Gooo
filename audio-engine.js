// ================================================================
//  AUDIO ENGINE – CRYPTO SOUND GENERATOR
//  يحاكي آلة تشفير نبضية مع ترددات متغيرة وتشويش عشوائي
// ================================================================

let audioCtx = null;
let isAudioRunning = false;
let audioInterval = null;
let audioTimeout = null;
let cryptoStatus = 'ENCRYPTED';
const cryptoBtn = document.getElementById('crypto-btn');
const cryptoStatusEl = document.getElementById('cryptoStatus');
const audioViz = document.getElementById('audioViz');

// ================================================================
//  تهيئة السياق الصوتي
// ================================================================
function initAudio() {
    if (audioCtx) return;
    try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        console.log('[AUDIO] Context initialized.');
    } catch (e) {
        console.warn('[AUDIO] Web Audio not supported.');
    }
}

// ================================================================
//  توليد نغمة تشفير مفردة
// ================================================================
function playCryptoBeep(freq, duration, type, volume) {
    if (!audioCtx) return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const noiseGain = audioCtx.createGain();

        osc.type = type || 'square';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(volume || 0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (duration || 0.08));

        // تشويش خفيف (ضوضاء بيضاء)
        const bufferSize = audioCtx.sampleRate * (duration || 0.08);
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.05;
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        noiseGain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (duration || 0.08));

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        noise.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + (duration || 0.08));
        noise.start();
        noise.stop(audioCtx.currentTime + (duration || 0.08));
    } catch (e) {
        // صمت
    }
}

// ================================================================
//  تشغيل الصوت المستمر – نبضات متقطعة بتعقيد عالٍ
// ================================================================
function startCryptoAudio() {
    if (isAudioRunning) return;
    initAudio();
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    isAudioRunning = true;
    cryptoStatus = 'ENCRYPTED';
    if (cryptoStatusEl) cryptoStatusEl.textContent = '🔐 ENCRYPTED';
    if (cryptoBtn) {
        cryptoBtn.textContent = '🔊 CRYPTO SOUND: ON';
        cryptoBtn.classList.add('active');
    }
    if (audioViz) audioViz.classList.add('active');

    let count = 0;
    let baseFreq = 770;

    // وظيفة النبض الرئيسية
    function generatePulse() {
        if (!isAudioRunning) return;

        // ترددات متغيرة تشبه التشفير
        const freqVariation = Math.sin(count * 0.1) * 150 + Math.random() * 200;
        const freq = baseFreq + freqVariation;
        const duration = 0.03 + Math.random() * 0.12;
        const types = ['square', 'sawtooth', 'triangle', 'square'];
        const type = types[Math.floor(Math.random() * types.length)];
        const volume = 0.06 + Math.random() * 0.10;

        playCryptoBeep(freq, duration, type, volume);

        // نبضات عميقة كل 7 نبضات
        if (count % 7 === 0) {
            setTimeout(() => {
                playCryptoBeep(180 + Math.random() * 220, 0.2, 'sawtooth', 0.08);
            }, 30);
        }

        // نبضات عالية كل 13 نبضة
        if (count % 13 === 0) {
            setTimeout(() => {
                playCryptoBeep(1200 + Math.random() * 400, 0.04, 'triangle', 0.04);
            }, 60);
        }

        // تغيير القاعدة كل 20 نبضة
        if (count % 20 === 0) {
            baseFreq = 600 + Math.random() * 500;
        }

        count++;

        // تحديث المؤقت مع تأخير عشوائي
        const nextDelay = 150 + Math.random() * 350;
        audioTimeout = setTimeout(generatePulse, nextDelay);
    }

    // بدء الدورة
    generatePulse();

    // تحديث الـ Visualizer بشكل متزامن
    if (audioViz) {
        const spans = audioViz.querySelectorAll('span');
        let vizInterval = setInterval(() => {
            if (!isAudioRunning) {
                clearInterval(vizInterval);
                return;
            }
            spans.forEach((span, i) => {
                const h = 6 + Math.random() * 44;
                span.style.height = h + 'px';
                span.style.opacity = 0.3 + Math.random() * 0.7;
            });
        }, 120);
        audioViz._vizInterval = vizInterval;
    }
}

// ================================================================
//  إيقاف الصوت
// ================================================================
function stopCryptoAudio() {
    isAudioRunning = false;
    cryptoStatus = 'DECRYPTED';
    if (cryptoStatusEl) cryptoStatusEl.textContent = '🔓 DECRYPTED';
    if (cryptoBtn) {
        cryptoBtn.textContent = '🔊 CRYPTO SOUND: OFF';
        cryptoBtn.classList.remove('active');
    }
    if (audioViz) {
        audioViz.classList.remove('active');
        const spans = audioViz.querySelectorAll('span');
        spans.forEach(span => {
            span.style.height = '8px';
            span.style.opacity = '0.3';
        });
        if (audioViz._vizInterval) {
            clearInterval(audioViz._vizInterval);
            audioViz._vizInterval = null;
        }
    }
    if (audioTimeout) {
        clearTimeout(audioTimeout);
        audioTimeout = null;
    }
    if (audioCtx && audioCtx.state !== 'closed') {
        audioCtx.suspend();
    }
}

// ================================================================
//  تبديل الصوت
// ================================================================
function toggleCryptoAudio() {
    if (isAudioRunning) {
        stopCryptoAudio();
    } else {
        startCryptoAudio();
    }
}

// ================================================================
//  ربط الزر
// ================================================================
if (cryptoBtn) {
    cryptoBtn.addEventListener('click', toggleCryptoAudio);
}

// بدء الصوت تلقائياً عند أول نقرة في الصفحة (لتفعيل AudioContext)
document.addEventListener('click', () => {
    if (!audioCtx) {
        initAudio();
    }
}, { once: true });

// تصدير الدوال للاستخدام الخارجي
window.toggleCryptoAudio = toggleCryptoAudio;
window.startCryptoAudio = startCryptoAudio;
window.stopCryptoAudio = stopCryptoAudio;

console.log('[AUDIO] Engine loaded. Press the crypto button to unleash the noise.');