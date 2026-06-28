/* ================================
   Amal — Open Dua Board
   localStorage key: amal_board → [{ id, name, dua, createdAt, ameen }]
   Note: Board is local-only at launch. Replace localStorage with
   a Supabase fetch call in getBoard() / postToBoard() to go live.
================================ */

const Board = (() => {
  const KEY = 'amal_board';

  function getBoard() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  }

  function saveBoard(posts) {
    localStorage.setItem(KEY, JSON.stringify(posts));
  }

  function post(name, dua) {
    const posts = getBoard();
    const entry = {
      id: uuid(),
      name: name || 'Anonymous',
      dua,
      createdAt: Date.now(),
      ameen: 0,
      myAmeen: false
    };
    posts.unshift(entry);
    saveBoard(posts);
    return entry;
  }

  function tapAmeen(id) {
    const posts = getBoard();
    const p = posts.find(x => x.id === id);
    if (p) {
      if (p.myAmeen) { p.ameen = Math.max(0, p.ameen - 1); p.myAmeen = false; }
      else { p.ameen++; p.myAmeen = true; }
      saveBoard(posts);
      return p;
    }
    return null;
  }

  function remove(id) {
    saveBoard(getBoard().filter(p => p.id !== id));
  }

  function timeAgo(ts) {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  }

  return { getBoard, post, tapAmeen, remove, timeAgo };
})();

window.Board = Board;
