/* ================================
   Amal — Personal Library
   localStorage keys:
     amal_library  → { [id]: { id, arabic, transliteration, translation, source, categories, savedAt, answered, answeredAt, custom } }
================================ */

const Library = (() => {
  const KEY = 'amal_library';

  function getAll() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch { return {}; }
  }

  function save(dua) {
    const all = getAll();
    if (!all[dua.id]) {
      all[dua.id] = { ...dua, savedAt: Date.now(), answered: false };
      localStorage.setItem(KEY, JSON.stringify(all));
    }
    return all[dua.id];
  }

  function remove(id) {
    const all = getAll();
    delete all[id];
    localStorage.setItem(KEY, JSON.stringify(all));
  }

  function isSaved(id) {
    return !!getAll()[id];
  }

  function markAnswered(id) {
    const all = getAll();
    if (all[id]) {
      all[id].answered = true;
      all[id].answeredAt = Date.now();
      localStorage.setItem(KEY, JSON.stringify(all));
    }
  }

  function unmarkAnswered(id) {
    const all = getAll();
    if (all[id]) {
      all[id].answered = false;
      delete all[id].answeredAt;
      localStorage.setItem(KEY, JSON.stringify(all));
    }
  }

  function isAnswered(id) {
    return !!(getAll()[id] || {}).answered;
  }

  function addCustom(dua) {
    const all = getAll();
    const id = 'custom_' + uuid();
    all[id] = { ...dua, id, custom: true, savedAt: Date.now(), answered: false };
    localStorage.setItem(KEY, JSON.stringify(all));
    return id;
  }

  function update(id, changes) {
    const all = getAll();
    if (all[id]) {
      all[id] = { ...all[id], ...changes };
      localStorage.setItem(KEY, JSON.stringify(all));
    }
  }

  function list() {
    return Object.values(getAll()).sort((a, b) => b.savedAt - a.savedAt);
  }

  function listAnswered() {
    return list().filter(d => d.answered);
  }

  function listActive() {
    return list().filter(d => !d.answered);
  }

  return { getAll, save, remove, isSaved, markAnswered, unmarkAnswered, isAnswered, addCustom, update, list, listAnswered, listActive };
})();

window.Library = Library;
