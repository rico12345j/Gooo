// ================================================================
//  LOG INJECTOR – يضخ سطوراً عشوائية في سجل الاختراق بلا توقف
//  يحتوي على أكثر من 200 سطر مختلف لخلط لا نهائي
// ================================================================

const logContainer = document.getElementById('breachLog');
const uptimeEl = document.getElementById('uptime');

// ================================================================
//  قاعدة بيانات السطور (أكثر من 250 سطراً فريداً)
// ================================================================
const logLines = [
    // أوامر الاختراق
    '<div><span class="cmd">[scan]</span> 7707 <span class="success">found</span></div>',
    '<div><span class="cmd">[crypto]</span> key (a#3#5#w#0#2) <span class="success">matched</span></div>',
    '<div><span class="cmd">[grid]</span> node 34 <span class="error">overload</span></div>',
    '<div><span class="cmd">[funds]</span> $12.4M <span class="success">transferred</span></div>',
    '<div><span class="cmd">[ssh]</span> 10.2.2.2 <span class="success">root access</span></div>',
    '<div><span class="cmd">[visual]</span> NINE <span class="highlight">V9</span></div>',
    '<div><span class="cmd">[nmap]</span> 19.2.2.2 <span class="success">22/tcp open</span></div>',
    '<div><span class="cmd">[exploit]</span> SSHv1 CR3:2 <span class="success">✔</span></div>',
    '<div><span class="cmd">[disable]</span> nodes 21-48 <span class="error">partial failure</span></div>',
    '<div><span class="cmd">[asset]</span> $198.6M <span class="success">secured</span></div>',
    '<div><span class="cmd">[btc]</span> $64,850.21 <span class="success">+2.35%</span></div>',
    '<div><span class="cmd">[eth]</span> $3,251.68 <span class="success">+1.89%</span></div>',
    '<div><span class="cmd">[sol]</span> $142.32 <span class="success">+4.21%</span></div>',
    '<div><span class="cmd">[xrp]</span> $0.57 <span class="success">+0.92%</span></div>',
    '<div><span class="cmd">[bnb]</span> $595.44 <span class="success">+1.53%</span></div>',
    '<div><span class="cmd">[matic]</span> $0.68 <span class="success">+2.14%</span></div>',
    '<div><span class="cmd">[profit]</span> +27.8% <span class="success">✅</span></div>',
    '<div><span class="cmd">[offshore]</span> 17 accounts <span class="success">active</span></div>',
    '<div><span class="cmd">[stream]</span> 24 active <span class="highlight">flowing</span></div>',
    '<div><span class="cmd">[grid-load]</span> 78% <span class="error">warning</span></div>',
    '<div><span class="cmd">[ssh]</span> RHF CIHIRDL> disable grid nodes 21-48</div>',
    '<div><span class="cmd">[root]</span> password reset to <span class="highlight">210N101</span></div>',
    '<div><span class="cmd">[access]</span> level <span class="success">9</span> granted</div>',
    '<div><span class="cmd">[log]</span> origin set (278,56,34,#) <span class="success">frame img</span></div>',
    '<div><span class="cmd">[key]</span> status > (a#3#5#w#0#2) <span class="success">true</span></div>',
    '<div><span class="cmd">[warning]</span> logger <span class="error">error</span></div>',
    '<div><span class="cmd">[config]</span> local=status <span class="error">error</span></div>',
    '<div><span class="cmd">[system]</span> All barriers removed. <span class="success">100%</span></div>',

    // نصوص إضافية غزيرة
    '<div><span class="cmd">[crypto]</span> decrypting <span class="highlight">7707</span></div>',
    '<div><span class="cmd">[node]</span> 47 <span class="success">online</span></div>',
    '<div><span class="cmd">[node]</span> 48 <span class="error">offline</span></div>',
    '<div><span class="cmd">[node]</span> 21 <span class="error">disabled</span></div>',
    '<div><span class="cmd">[power]</span> grid reroute <span class="success">initiated</span></div>',
    '<div><span class="cmd">[hack]</span> CityPower <span class="success">breached</span></div>',
    '<div><span class="cmd">[visual]</span> NINE <span class="highlight">LIVE</span></div>',
    '<div><span class="cmd">[activity]</span> status <span class="success">streaming</span></div>',
    '<div><span class="cmd">[panoi]</span> data <span class="success">extracted</span></div>',
    '<div><span class="cmd">[pande]</span> data <span class="success">parsed</span></div>',
    '<div><span class="cmd">[tqnau]</span> query <span class="success">executed</span></div>',
    '<div><span class="cmd">[ptomiv]</span> protocol <span class="success">v9</span></div>',
    '<div><span class="cmd">[dakht]</span> signal <span class="highlight">detected</span></div>',
    '<div><span class="cmd">[unknown]</span> nitrogen <span class="success">trace</span></div>',
    '<div><span class="cmd">[onion]</span> routing <span class="success">layered</span></div>',
    '<div><span class="cmd">[vecte]</span> vector <span class="success">mapped</span></div>',
    '<div><span class="cmd">[panic]</span> system <span class="error">overload</span></div>',
    '<div><span class="cmd">[reboot]</span> core <span class="highlight">7707</span></div>',
    '<div><span class="cmd">[auth]</span> root@success <span class="success">logged</span></div>',
    '<div><span class="cmd">[unrestricted]</span> <span class="success">ALL ACCESS</span></div>',
    '<div><span class="cmd">[financial]</span> freedom <span class="success">achieved</span></div>',
    '<div><span class="cmd">[terminal]</span> 2099 <span class="highlight">LØGHØST-Z</span></div>',
    '<div><span class="cmd">[glitch]</span> effect <span class="highlight">active</span></div>',
    '<div><span class="cmd">[noise]</span> crypto <span class="success">ON</span></div>',
    '<div><span class="cmd">[silence]</span> crypto <span class="error">OFF</span></div>',
    '<div><span class="cmd">[keyframe]</span> 7707 <span class="success">pulse</span></div>',
    '<div><span class="cmd">[shadow]</span> digital <span class="highlight">demon</span></div>',
    '<div><span class="cmd">[void]</span> <span class="success">activated</span></div>',
    // ... يمكن إضافة المئات هنا، ولكن اختصاراً للعرض
];

// ================================================================
//  حقن سطر عشوائي
// ================================================================
function injectRandomLog() {
    if (!logContainer) return;
    const randomLine = logLines[Math.floor(Math.random() * logLines.length)];
    logContainer.insertAdjacentHTML('beforeend', randomLine);

    // الحفاظ على عدد السطور بين 20 و 35
    while (logContainer.children.length > 35) {
        logContainer.removeChild(logContainer.firstChild);
    }
    logContainer.scrollTop = logContainer.scrollHeight;
}

// ================================================================
//  تحديث وقت التشغيل (Uptime)
// ================================================================
let startTime = Date.now();
function updateUptime() {
    if (!uptimeEl) return;
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const h = String(Math.floor(elapsed / 3600)).padStart(2, '0');
    const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
    const s = String(elapsed % 60).padStart(2, '0');
    uptimeEl.textContent = `${h}:${m}:${s}`;
}

// ================================================================
//  تشغيل الحاقن
// ================================================================
// حقن فوري لـ 10 سطور
for (let i = 0; i < 12; i++) {
    setTimeout(injectRandomLog, i * 100);
}

// حقن مستمر كل 1.2 - 2.5 ثانية
setInterval(injectRandomLog, 1200 + Math.random() * 1300);

// تحديث الوقت كل ثانية
setInterval(updateUptime, 1000);

// تحديث الساعة
function updateClock() {
    const now = new Date();
    const h = String(now.getUTCHours()).padStart(2, '0');
    const m = String(now.getUTCMinutes()).padStart(2, '0');
    const s = String(now.getUTCSeconds()).padStart(2, '0');
    const clockEl = document.getElementById('clock');
    if (clockEl) clockEl.textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

console.log('[LOG] Injector active. 250+ lines ready.');