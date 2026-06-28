/* ================================
   Amal — Core App
================================ */

window.AMAL_VERSION = 'v6';

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

// ---- Toast ----
function showToast(msg, duration = 2200) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), duration);
}
window.showToast = showToast;

// ---- Active nav link ----
function setActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    a.classList.toggle('active', href === path || (path === '' && href === 'index.html'));
  });
}
document.addEventListener('DOMContentLoaded', setActiveNav);

// ---- Load duas JSON ----
let _duasCache = null;
async function loadDuas() {
  if (_duasCache) return _duasCache;
  const base = getBasePath();
  const res = await fetch(base + 'data/duas.json');
  _duasCache = await res.json();
  return _duasCache;
}
window.loadDuas = loadDuas;

// ---- Base path helper (works on GitHub Pages subdirectory) ----
function getBasePath() {
  const scripts = document.querySelectorAll('script[src]');
  for (const s of scripts) {
    const src = s.getAttribute('src');
    if (src.includes('app.js')) {
      return src.replace('js/app.js', '');
    }
  }
  return '/';
}
window.getBasePath = getBasePath;

// ---- Category labels ----
window.CATEGORIES = {
  'morning':      { label: 'Morning',         emoji: '🌅' },
  'evening':      { label: 'Evening',         emoji: '🌙' },
  'daily':        { label: 'Daily',           emoji: '✦'  },
  'travel':       { label: 'Travelling',      emoji: '✈️'  },
  'umrah':        { label: 'Umrah & Hajj',    emoji: '🕋' },
  'anxiety':      { label: 'Anxiety',         emoji: '🤲' },
  'hardship':     { label: 'Hardship',        emoji: '💪' },
  'forgiveness':  { label: 'Forgiveness',     emoji: '🌿' },
  'parents':      { label: 'For Parents',     emoji: '❤️'  },
  'gratitude':    { label: 'Gratitude',       emoji: '🌸' },
  'illness':      { label: 'Illness',         emoji: '🩺' },
  'general':      { label: 'General',         emoji: '✨' },
  'before-eating':{ label: 'Before Eating',   emoji: '🍽️'  },
  'after-eating': { label: 'After Eating',    emoji: '🍽️'  },
  'protection':   { label: 'Protection',      emoji: '🛡️'  },
  'salawat':      { label: 'Salawat',         emoji: '☪️'  },
  'trust':        { label: 'Tawakkul',        emoji: '🌟' }
};

// ---- Render a dua card ----
window.renderDuaCard = function(dua, opts = {}) {
  const saved = Library.isSaved(dua.id);
  const answered = Library.isAnswered(dua.id);
  const cats = (dua.categories || []).slice(0, 2).map(c => {
    const cat = CATEGORIES[c] || { label: c };
    return `<span class="tag">${cat.label}</span>`;
  }).join('');

  return `
    <div class="card dua-card" data-id="${dua.id}" onclick="openDua('${dua.id}')">
      <div class="dua-arabic">${dua.arabic}</div>
      <div class="dua-translation">${dua.translation}</div>
      <div class="dua-meta">
        ${cats}
        ${answered ? '<span class="answered-badge">✓ Answered</span>' : ''}
      </div>
    </div>`;
};

// ---- Open dua detail (sets localStorage and navigates) ----
window.openDua = function(id) {
  sessionStorage.setItem('amal_dua_id', id);
  const base = getBasePath();
  location.href = base + 'pages/dua.html?id=' + id;
};

// ---- UUID generator ----
window.uuid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
};
