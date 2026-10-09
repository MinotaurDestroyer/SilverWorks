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
    STATUSES: ['Pending', 'Approved', 'In Production', 'Completed'],
    // DEMO accounts only. Real logins must be checked on a server (see notes).
    USERS: [
      { username: 'chelseakaye', password: 'imsopretty',    role: 'production_head', branch: null,       displayName: 'ChelseaKaye' },
      { username: 'production', password: 'production123', role: 'production_head', branch: null,       displayName: 'Production Head' },
      { username: 'smmoa',      password: 'moa123',        role: 'branch',           branch: 'SM Mall of Asia (Pasay City)',   displayName: 'SM Mall of Asia' },
      { username: 'smmegamall', password: 'megamall123',   role: 'branch',           branch: 'SM Megamall (Mandaluyong City)', displayName: 'SM Megamall' },
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

  // Production Head sees every branch. A branch user sees only transactions for their own branch.
  function canViewTransaction(session, tx) {
    if (!session) return false;
    if (session.role === 'production_head') return true;
    return session.role === 'branch' && tx.branch === session.branch;
  }
  function visibleTransactions(session) {
    return loadTransactions().filter(tx => canViewTransaction(session, tx));
  }
  function canChangeStatus(session) {
    return !!session && session.role === 'production_head';
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
    login, getSession, logout, canViewTransaction, visibleTransactions, canChangeStatus,
    fileToJpeg, buildPDF,
  };
})();