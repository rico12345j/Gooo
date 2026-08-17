// ================================================================
//  GLITCH EFFECTS – تشويش بصري، تغير ألوان، اهتزازات
//  يجعل الموقع يتنفس بعصبية
// ================================================================

const main7707 = document.getElementById('main7707');
const gridLoad = document.getElementById('gridLoad');
const energyFill = document.getElementById('energyFill');

// ================================================================
//  1. تغيير لون 7707 بشكل مستمر
// ================================================================
function glitch7707() {
    if (!main7707) return;
    const hue = Math.floor(Math.random() * 360);
    const sat = 80 + Math.random() * 20;
    const lig = 50 + Math.random() * 30;
    main7707.style.textShadow = `
        0 0 60px hsl(${hue}, ${sat}%, ${lig}%),
        0 0 120px hsl(${hue}, ${sat}%, ${lig-20}%),
        0 0 200px hsl(${hue}, ${sat}%, ${lig-40}%)
    `;
    main7707.style.color = `hsl(${hue}, ${sat}%, ${lig-40}%)`;
}
setInterval(glitch7707, 1800);

// ================================================================
//  2. تغيير عشوائي لحمل الشبكة (Grid Load)
// ================================================================
function randomizeGridLoad() {
    if (!gridLoad || !energyFill) return;
    const load = 50 + Math.random() * 45;
    gridLoad.textContent = Math.round(load) + '%';
    energyFill.style.width = load + '%';
    // تغيير لون الشريط حسب الحمل
    if (load > 80) {
        energyFill.style.background = 'linear-gradient(90deg, #ff3366, #ffaa00)';
    } else if (load > 60) {
        energyFill.style.background = 'linear-gradient(90deg, #ffaa00, #66ff99)';
    } else {
        energyFill.style.background = 'linear-gradient(90deg, #66ff99, #00ffcc)';
    }
}
setInterval(randomizeGridLoad, 4000 + Math.random() * 3000);

// ================================================================
//  3. اهتزاز عشوائي لبعض العناصر (glitch مؤقت)
// ================================================================
function applyRandomGlitch() {
    const elements = document.querySelectorAll('.grid-card, .status-item, .mega-mashup span');
    const el = elements[Math.floor(Math.random() * elements.length)];
    if (!el) return;
    const x = (Math.random() - 0.5) * 6;
    const y = (Math.random() - 0.5) * 6;
    el.style.transform = `translate(${x}px, ${y}px)`;
    el.style.transition = '0.05s';
    setTimeout(() => {
        el.style.transform = 'translate(0,0)';
    }, 150);
}
setInterval(applyRandomGlitch, 700);

// ================================================================
//  4. وميض عشوائي للخلفية (فلاشات خفيفة)
// ================================================================
function randomFlash() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = `rgba(0, 255, 204, ${0.02 + Math.random() * 0.06})`;
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '9998';
    flash.style.transition = 'opacity 0.1s';
    document.body.appendChild(flash);
    setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => flash.remove(), 200);
    }, 80);
}
setInterval(randomFlash, 3000 + Math.random() * 4000);

// ================================================================
//  5. تغيير عشوائي للنصوص في المزج السفلي
// ================================================================
const mashupWords = [
    '7707', 'VISUAL-NINE', 'LIVE', 'ACTIVITYSTATUS',
    'SCAN', 'DATA', 'PANOI', 'PANDE', 'TQNAU',
    'PTOMIV', 'DAKHT', 'DAKHT', 'DAKHT', 'DAKHT',
    'DAK', 'UNKNOWN', 'NITROGEN', 'ONION', 'Vecte',
    'RHF CIHIRDL', '210N101', 'root@success', '$198.6M',
    '+27.8%', 'BTC', 'ETH', 'SOL', 'XRP', 'BNB', 'MATIC'
];
function shuffleMashup() {
    const container = document.querySelector('.mega-mashup');
    if (!container) return;
    const spans = container.querySelectorAll('span');
    const shuffled = [...mashupWords].sort(() => Math.random() - 0.5);
    spans.forEach((span, i) => {
        if (i < shuffled.length) {
            span.textContent = shuffled[i];
        }
    });
}
setInterval(shuffleMashup, 7000);

console.log('[GLITCH] All visual chaos engines running.');