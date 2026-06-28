/* ================================
   Amal — Umrah Sharing
   localStorage keys:
     amal_share_[uuid]  → { id, requests: [{ name, dua, createdAt }], createdAt, label }
     amal_my_shares     → [uuid, ...]
================================ */

const Sharing = (() => {
  const MY_KEY = 'amal_my_shares';

  function createList(label = '') {
    const id = uuid();
    const data = { id, label: label || 'My Umrah Duas', requests: [], createdAt: Date.now() };
    localStorage.setItem('amal_share_' + id, JSON.stringify(data));
    const mine = getMyIds();
    mine.unshift(id);
    localStorage.setItem(MY_KEY, JSON.stringify(mine));
    return id;
  }

  function getList(id) {
    try { return JSON.parse(localStorage.getItem('amal_share_' + id)); }
    catch { return null; }
  }

  function getMyIds() {
    try { return JSON.parse(localStorage.getItem(MY_KEY)) || []; }
    catch { return []; }
  }

  function getMyLists() {
    return getMyIds().map(id => getList(id)).filter(Boolean);
  }

  function addRequest(listId, name, dua) {
    const data = getList(listId);
    if (!data) return false;
    data.requests.push({ name: name || 'Anonymous', dua, createdAt: Date.now() });
    localStorage.setItem('amal_share_' + listId, JSON.stringify(data));
    return true;
  }

  function getShareUrl(id) {
    const base = location.origin + getBasePath();
    return base + 'pages/share-view.html?id=' + id;
  }

  function deleteList(id) {
    localStorage.removeItem('amal_share_' + id);
    const mine = getMyIds().filter(i => i !== id);
    localStorage.setItem(MY_KEY, JSON.stringify(mine));
  }

  return { createList, getList, getMyIds, getMyLists, addRequest, getShareUrl, deleteList };
})();

window.Sharing = Sharing;
