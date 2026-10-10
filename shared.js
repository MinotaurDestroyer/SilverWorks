/* shared.js - Silverworks logic shared by index.html (client form) and portal.html (production portal) */
const SW = (() => {
  const CONFIG = {
    PORTAL_URL: 'portal.html',                    // <-- set to the real production portal URL
    BRANCHES: [
      'SM Mall of Asia (Pasay City)',
      'SM Megamall (Mandaluyong City)',
      'SM City North EDSA (Quezon City)',
      'SM City Manila (Ermita, Manila)',
      'SM City San Lazaro (Sta. Cruz, Manila)',
      'SM City Sta. Mesa (Mesa, Manila)',
      'SM City Fairview (Quezon City)',
      'SM City Novaliches (Quezon City)',
      'SM City Marikina (Marikina City)',
      'SM City Bicutan (Paranaque City)',
      'SM Southmall (Alabang-Zapote Rd, Las Piñas)',
      'SM City Sucat (Paranaque City)',
      'SM Center Angono (Rizal)',
      'SM City Masinag (Antipolo, Rizal)',
      'SM City Taytay (Rizal)',
      'SM City Bacoor (Cavite)',
      'SM City Dasmariñas (Cavite)',
      'SM City Tanza (Cavite)',
      'SM City Santa Rosa (Laguna)',
      'SM City Calamba (Laguna)',
      'SM City San Pablo (Laguna)',
      'SM City Lipa (Batangas)',
      'SM City Batangas (Batangas City)',
      'SM City Lucena (Quezon Province)',
      'SM City Naga (Camarines Sur)',
      'SM City San Jose Del Monte (Bulacan)',
      'SM City Marilao (Bulacan)',
      'SM City Baliwag (Bulacan)',
      'SM City Pampanga (San Fernando, Pampanga)',
      'SM City Clark (Angeles, Pampanga)',
      'SM City Cabanatuan (Nueva Ecija)',
      'SM City La Union (San Fernando, La Union)',
      'SM City Cebu (Cebu City)',
      'SM Seaside City Cebu (Cebu City)',
      'SM City Iloilo (Mandurriao, Iloilo City)',
      'SM City Bacolod (Bacolod City)',
      'SM City Davao (Ecoland, Davao City)',
      'SM CDO Downtown Premier (Cagayan de Oro)',
      'SM City General Santos (South Cotabato)',
      'Robinsons Place Manila (Ermita, Manila)',
      'Robinsons Galleria (Ortigas Center, Quezon City)',
      'Robinsons Metro East (Pasig City / Cainta)',
      'Robinsons Antipolo (Rizal)',
      'Robinsons General Trias (Cavite)',
      'Robinsons Starmills (San Fernando, Pampanga)',
      'Glorietta (Ayala Center, Makati City)',
      'TriNoma (North Triangle, Quezon City)',
      'Market! Market! (BGC, Taguig City)',
      'Abreeza Mall (Davao City)',
      'Centrio Mall (Cagayan de Oro)',
      'Festival Supermall / Filinvest Alabang (Muntinlupa City)',
      'Sta. Lucia East Grand Mall (Cainta, Rizal)',
      'Fisher Mall (Quezon Avenue, Quezon City)',
      'Limketkai Mall (Cagayan de Oro City)',
    ],
    TX_KEY: 'silverworks_transactions',
    SESSION_KEY: 'silverworks_session',
    STATUSES: ['Pending', 'Sent to Production', 'In Production', 'Completed'],
    // DEMO accounts only. Real logins must be checked on a server (see notes).
    USERS: [
      { username: 'randolf',     password: 'imreinhehe',    role: 'super_admin', branch: null, displayName: 'Randolf (Super Admin)' },
      { username: 'chelseakaye', password: 'imsopretty',    role: 'production_head', branch: null, displayName: 'ChelseaKaye' },
      { username: 'production',  password: 'production123', role: 'production_head', branch: null, displayName: 'Production Head' },
      { username: 'smmallofasia', password: 'f2LJo51Y', role: 'branch', branch: 'SM Mall of Asia (Pasay City)', displayName: 'SM Mall of Asia' },
      { username: 'smmegamall', password: 'hrJOezSR', role: 'branch', branch: 'SM Megamall (Mandaluyong City)', displayName: 'SM Megamall' },
      { username: 'smcitynorthedsa', password: 'fvmv81ab', role: 'branch', branch: 'SM City North EDSA (Quezon City)', displayName: 'SM City North EDSA' },
      { username: 'smcitymanila', password: 'cwcqsXgA', role: 'branch', branch: 'SM City Manila (Ermita, Manila)', displayName: 'SM City Manila' },
      { username: 'smcitysanlazaro', password: 'l10rSEtR', role: 'branch', branch: 'SM City San Lazaro (Sta. Cruz, Manila)', displayName: 'SM City San Lazaro' },
      { username: 'smcitystamesa', password: '88CNbuNw', role: 'branch', branch: 'SM City Sta. Mesa (Mesa, Manila)', displayName: 'SM City Sta. Mesa' },
      { username: 'smcityfairview', password: 'Cyt2goHr', role: 'branch', branch: 'SM City Fairview (Quezon City)', displayName: 'SM City Fairview' },
      { username: 'smcitynovaliches', password: 'IhpDYatY', role: 'branch', branch: 'SM City Novaliches (Quezon City)', displayName: 'SM City Novaliches' },
      { username: 'smcitymarikina', password: '8a88gZ0N', role: 'branch', branch: 'SM City Marikina (Marikina City)', displayName: 'SM City Marikina' },
      { username: 'smcitybicutan', password: 'LVHEMupt', role: 'branch', branch: 'SM City Bicutan (Paranaque City)', displayName: 'SM City Bicutan' },
      { username: 'smsouthmall', password: '2mVY3Kam', role: 'branch', branch: 'SM Southmall (Alabang-Zapote Rd, Las Piñas)', displayName: 'SM Southmall' },
      { username: 'smcitysucat', password: 'zi3X5ZXW', role: 'branch', branch: 'SM City Sucat (Paranaque City)', displayName: 'SM City Sucat' },
      { username: 'smcenterangono', password: 'VWFFI5o2', role: 'branch', branch: 'SM Center Angono (Rizal)', displayName: 'SM Center Angono' },
      { username: 'smcitymasinag', password: 'HWWmP8ab', role: 'branch', branch: 'SM City Masinag (Antipolo, Rizal)', displayName: 'SM City Masinag' },
      { username: 'smcitytaytay', password: 'NEw3nIjr', role: 'branch', branch: 'SM City Taytay (Rizal)', displayName: 'SM City Taytay' },
      { username: 'smcitybacoor', password: '5Fbv21rB', role: 'branch', branch: 'SM City Bacoor (Cavite)', displayName: 'SM City Bacoor' },
      { username: 'smcitydasmarias', password: 'AWnKes7n', role: 'branch', branch: 'SM City Dasmariñas (Cavite)', displayName: 'SM City Dasmariñas' },
      { username: 'smcitytanza', password: 'fjLltMkx', role: 'branch', branch: 'SM City Tanza (Cavite)', displayName: 'SM City Tanza' },
      { username: 'smcitysantarosa', password: 'FkVTLtYv', role: 'branch', branch: 'SM City Santa Rosa (Laguna)', displayName: 'SM City Santa Rosa' },
      { username: 'smcitycalamba', password: '3QdvWp8i', role: 'branch', branch: 'SM City Calamba (Laguna)', displayName: 'SM City Calamba' },
      { username: 'smcitysanpablo', password: 'vLUBi0fZ', role: 'branch', branch: 'SM City San Pablo (Laguna)', displayName: 'SM City San Pablo' },
      { username: 'smcitylipa', password: 'wRkS3HAk', role: 'branch', branch: 'SM City Lipa (Batangas)', displayName: 'SM City Lipa' },
      { username: 'smcitybatangas', password: '1RQQYRbG', role: 'branch', branch: 'SM City Batangas (Batangas City)', displayName: 'SM City Batangas' },
      { username: 'smcitylucena', password: 'lE2eMRqm', role: 'branch', branch: 'SM City Lucena (Quezon Province)', displayName: 'SM City Lucena' },
      { username: 'smcitynaga', password: '1lMrZG8k', role: 'branch', branch: 'SM City Naga (Camarines Sur)', displayName: 'SM City Naga' },
      { username: 'smcitysanjosedelmonte', password: '4Yt72S89', role: 'branch', branch: 'SM City San Jose Del Monte (Bulacan)', displayName: 'SM City San Jose Del Monte' },
      { username: 'smcitymarilao', password: 'dxfI2rW1', role: 'branch', branch: 'SM City Marilao (Bulacan)', displayName: 'SM City Marilao' },
      { username: 'smcitybaliwag', password: 'hakZlmzf', role: 'branch', branch: 'SM City Baliwag (Bulacan)', displayName: 'SM City Baliwag' },
      { username: 'smcitypampanga', password: 'Oa0C4n4k', role: 'branch', branch: 'SM City Pampanga (San Fernando, Pampanga)', displayName: 'SM City Pampanga' },
      { username: 'smcityclark', password: 'zBbOUIpl', role: 'branch', branch: 'SM City Clark (Angeles, Pampanga)', displayName: 'SM City Clark' },
      { username: 'smcitycabanatuan', password: 'WYbXrVQQ', role: 'branch', branch: 'SM City Cabanatuan (Nueva Ecija)', displayName: 'SM City Cabanatuan' },
      { username: 'smcitylaunion', password: 'RnQjNvz7', role: 'branch', branch: 'SM City La Union (San Fernando, La Union)', displayName: 'SM City La Union' },
      { username: 'smcitycebu', password: '4nMBo5G9', role: 'branch', branch: 'SM City Cebu (Cebu City)', displayName: 'SM City Cebu' },
      { username: 'smseasidecitycebu', password: 'bO0dEpHD', role: 'branch', branch: 'SM Seaside City Cebu (Cebu City)', displayName: 'SM Seaside City Cebu' },
      { username: 'smcityiloilo', password: 'F6FPU7S4', role: 'branch', branch: 'SM City Iloilo (Mandurriao, Iloilo City)', displayName: 'SM City Iloilo' },
      { username: 'smcitybacolod', password: 'xSmIi0d6', role: 'branch', branch: 'SM City Bacolod (Bacolod City)', displayName: 'SM City Bacolod' },
      { username: 'smcitydavao', password: 'SRpIn6KA', role: 'branch', branch: 'SM City Davao (Ecoland, Davao City)', displayName: 'SM City Davao' },
      { username: 'smcdodowntownpremier', password: 'KpHNs1E4', role: 'branch', branch: 'SM CDO Downtown Premier (Cagayan de Oro)', displayName: 'SM CDO Downtown Premier' },
      { username: 'smcitygeneralsantos', password: 'W081R8YU', role: 'branch', branch: 'SM City General Santos (South Cotabato)', displayName: 'SM City General Santos' },
      { username: 'robinsonsplacemanila', password: 'nyNyhFrb', role: 'branch', branch: 'Robinsons Place Manila (Ermita, Manila)', displayName: 'Robinsons Place Manila' },
      { username: 'robinsonsgalleria', password: '1Ehm4VlC', role: 'branch', branch: 'Robinsons Galleria (Ortigas Center, Quezon City)', displayName: 'Robinsons Galleria' },
      { username: 'robinsonsmetroeast', password: 'gBaqw3Vf', role: 'branch', branch: 'Robinsons Metro East (Pasig City / Cainta)', displayName: 'Robinsons Metro East' },
      { username: 'robinsonsantipolo', password: 'zLT0mlMA', role: 'branch', branch: 'Robinsons Antipolo (Rizal)', displayName: 'Robinsons Antipolo' },
      { username: 'robinsonsgeneraltrias', password: 'pLBVKIfY', role: 'branch', branch: 'Robinsons General Trias (Cavite)', displayName: 'Robinsons General Trias' },
      { username: 'robinsonsstarmills', password: 'VjjDEqho', role: 'branch', branch: 'Robinsons Starmills (San Fernando, Pampanga)', displayName: 'Robinsons Starmills' },
      { username: 'glorietta', password: 'cgDUnmPo', role: 'branch', branch: 'Glorietta (Ayala Center, Makati City)', displayName: 'Glorietta' },
      { username: 'trinoma', password: 'zmV2kl7v', role: 'branch', branch: 'TriNoma (North Triangle, Quezon City)', displayName: 'TriNoma' },
      { username: 'marketmarket', password: 'sKM1Sx3h', role: 'branch', branch: 'Market! Market! (BGC, Taguig City)', displayName: 'Market! Market!' },
      { username: 'abreezamall', password: 'feqECJlK', role: 'branch', branch: 'Abreeza Mall (Davao City)', displayName: 'Abreeza Mall' },
      { username: 'centriomall', password: 'My0gYhOi', role: 'branch', branch: 'Centrio Mall (Cagayan de Oro)', displayName: 'Centrio Mall' },
      { username: 'festivalsupermallfilinvestalabang', password: 'LyLjqpnp', role: 'branch', branch: 'Festival Supermall / Filinvest Alabang (Muntinlupa City)', displayName: 'Festival Supermall / Filinvest Alabang' },
      { username: 'staluciaeastgrandmall', password: 'A9vwm2l6', role: 'branch', branch: 'Sta. Lucia East Grand Mall (Cainta, Rizal)', displayName: 'Sta. Lucia East Grand Mall' },
      { username: 'fishermall', password: 'IDxNVWF7', role: 'branch', branch: 'Fisher Mall (Quezon Avenue, Quezon City)', displayName: 'Fisher Mall' },
      { username: 'limketkaimall', password: 'JWvJLVH4', role: 'branch', branch: 'Limketkai Mall (Cagayan de Oro City)', displayName: 'Limketkai Mall' },
    ],
  };

  const TERMS = [
    'Once the layout has been approved, production will proceed based on the approved design. Cancellations or requests for changes or modifications will no longer be accepted after 24 hours from the time of approval.',
    'Any requested changes or modifications made within the 24-hour period must be communicated immediately.',
    'Once the 24-hour period has elapsed, the approved layout will be considered final and any subsequent changes may be subject to additional charges and/or production delays.',
    'Due Date: The 30\u201340 working-day lead time will start once the layout has been approved.',
  ];
  const AGREEMENT = 'I have read, understood, and agreed to the Terms and Conditions stated above.';

  /* ---------- storage ---------- */
  function loadTransactions() {
    try { return JSON.parse(localStorage.getItem(CONFIG.TX_KEY)) || []; } catch (e) { return []; }
  }
  function saveTransactions(list) {
    localStorage.setItem(CONFIG.TX_KEY, JSON.stringify(list)); // can throw if storage is full
  }
  function addTransaction(tx) {
    const list = loadTransactions();
    list.unshift(tx);
    saveTransactions(list);
  }
  function updateTransaction(id, changes) {
    const list = loadTransactions();
    const tx = list.find(t => t.id === id);
    if (tx) { Object.assign(tx, changes); saveTransactions(list); }
  }

  /* ---------- ids & dates ---------- */
  function generateSerial() {
    const d = new Date();
    const ymd = d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
    const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `SW-${ymd}-${rnd}`;
  }
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }
  function formatDate(d = new Date()) {
    return d.toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  /* ---------- authentication & role-based access control ---------- */
  function login(username, password) {
    const u = CONFIG.USERS.find(x => x.username === username.trim().toLowerCase() && x.password === password);
    if (!u) return null;
    const session = { username: u.username, role: u.role, branch: u.branch, displayName: u.displayName };
    sessionStorage.setItem(CONFIG.SESSION_KEY, JSON.stringify(session));
    return session;
  }
  function getSession() {
    try { return JSON.parse(sessionStorage.getItem(CONFIG.SESSION_KEY)); } catch (e) { return null; }
  }
  function logout() { sessionStorage.removeItem(CONFIG.SESSION_KEY); }

  // Access rules:
  //  - Branch: sees only its own forms, including Pending ones. Can send its own Pending forms to production.
  //    The form stays in the branch list as its copy.
  //  - Production Head: sees only forms sent to production (not Pending). Moves them to In Production, then Completed.
  //  - Super Admin: sees every form and can take any step.
  function canViewTransaction(session, tx) {
    if (!session) return false;
    if (session.role === 'super_admin') return true;
    if (session.role === 'production_head') return tx.status !== 'Pending';
    return session.role === 'branch' && tx.branch === session.branch;
  }
  function visibleTransactions(session) {
    return loadTransactions().filter(tx => canViewTransaction(session, tx));
  }
  // The single next step this account may take on a form, or null if it has none
  function nextStatus(session, tx) {
    if (!session || !canViewTransaction(session, tx)) return null;
    const isSuper = session.role === 'super_admin';
    const isProduction = session.role === 'production_head' || isSuper;
    const isOwnBranch = session.role === 'branch' && tx.branch === session.branch;
    if (tx.status === 'Pending' && (isSuper || isOwnBranch)) return 'Sent to Production';
    if (tx.status === 'Sent to Production' && isProduction) return 'In Production';
    if (tx.status === 'In Production' && isProduction) return 'Completed';
    return null;
  }
  // Moves a form to its next status and records who did it and when
  function advanceStatus(session, id) {
    const list = loadTransactions();
    const tx = list.find(t => t.id === id);
    const next = tx && nextStatus(session, tx);
    if (!next) return null;
    tx.status = next;
    tx.statusLog = (tx.statusLog || []).concat([{ status: next, at: new Date().toISOString(), by: session.displayName }]);
    saveTransactions(list);
    return next;
  }

  /* ---------- images ---------- */
  // Converts a PNG/JPG/WEBP file to a white-background JPEG so it embeds cleanly in the PDF.
  function fileToJpeg(file, maxSize = 1200, quality = 0.9) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Could not read the file.'));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error('That file is not a valid image.'));
        img.onload = () => {
          const s = Math.min(1, maxSize / Math.max(img.width, img.height));
          const w = Math.round(img.width * s), h = Math.round(img.height * s);
          const c = document.createElement('canvas');
          c.width = w; c.height = h;
          const ctx = c.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          resolve({ dataUrl: c.toDataURL('image/jpeg', quality), width: w, height: h });
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  /* ---------- one-page PDF ---------- */
  function buildPDF(tx) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const W = 210, M = 15;
    let y = 20;

    doc.setFont('helvetica', 'bold'); doc.setFontSize(18);
    doc.text('SILVERWORKS', M, y);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
    doc.text('Client Agreement - Official Terms & Conditions', M, y + 6);
    doc.setDrawColor(160); doc.line(M, y + 10, W - M, y + 10);
    y += 18;

    const rows = [
      ['Serial Number', tx.serial], ['Date', tx.date], ['Branch', tx.branch],
      ['Client Name', tx.clientName], ['Retailer Name', tx.retailerName],
      ['Waiver / IS', tx.waiverIS || '-'], ['Client Email', tx.clientEmail], ['Status', tx.status || 'Pending'],
    ];
    doc.setFontSize(10);
    rows.forEach(([k, v]) => {
      doc.setFont('helvetica', 'bold'); doc.text(k + ':', M, y);
      doc.setFont('helvetica', 'normal'); doc.text(String(v), M + 40, y);
      y += 6.5;
    });

    // Reference image, scaled to fit 120 x 75 mm
    y += 4;
    doc.setFont('helvetica', 'bold'); doc.text('Reference Image / Design', M, y);
    y += 3;
    const img = tx.referenceImage;
    const k = Math.min(120 / img.width, 75 / img.height);
    doc.addImage(img.dataUrl, 'JPEG', M, y, img.width * k, img.height * k);
    y += img.height * k + 8;

    // Terms
    doc.setFont('helvetica', 'bold'); doc.setFontSize(11);
    doc.text('Terms and Conditions', M, y); y += 6;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
    TERMS.forEach(t => {
      const lines = doc.splitTextToSize('- ' + t, W - 2 * M);
      doc.text(lines, M, y);
      y += lines.length * 4.5 + 1.5;
    });
    y += 2;
    doc.setFont('helvetica', 'bold');
    doc.text(doc.splitTextToSize('[X] ' + AGREEMENT, W - 2 * M), M, y);
    y += 10;

    // Signature
    doc.setFontSize(10);
    doc.text('Client E-Signature:', M, y); y += 2;
    const sig = tx.signature;
    const sk = Math.min(70 / sig.width, 25 / sig.height);
    doc.addImage(sig.dataUrl, 'JPEG', M, y, sig.width * sk, sig.height * sk);
    y += sig.height * sk + 1;
    doc.setDrawColor(0); doc.line(M, y, M + 80, y);
    y += 4.5;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
    doc.text('Signature over Printed Name of Client: ' + tx.clientName, M, y);

    // Footer
    doc.setFontSize(8); doc.setTextColor(120);
    doc.text('\u00A9 2026 SILVERWORKS. All rights reserved. Secure Client Portal.', M, 287);
    doc.setTextColor(0);
    return doc;
  }

  return {
    CONFIG, TERMS, AGREEMENT,
    loadTransactions, addTransaction, updateTransaction,
    generateSerial, generateId, formatDate,
    login, getSession, logout, canViewTransaction, visibleTransactions, nextStatus, advanceStatus,
    fileToJpeg, buildPDF,
  };
})();
