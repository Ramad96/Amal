/* ================================
   Amal — Umrah Sharing (Supabase)
================================ */

const Sharing = (() => {
  const LISTS = 'sharing_lists';
  const REQS  = 'sharing_requests';

  function uid() { return window.Auth?.getUser()?.id ?? null; }

  async function createList(label) {
    const userId = uid();
    if (!userId) { showToast('Sign in to create a sharing link'); return null; }
    const { data, error } = await window._supabase
      .from(LISTS)
      .insert({ user_id: userId, label: label || 'My Umrah Duas' })
      .select('id').single();
    if (error) { showToast('Could not create link — please try again'); return null; }
    return data.id;
  }

  async function getList(id) {
    const { data: list, error } = await window._supabase
      .from(LISTS).select('*').eq('id', id).single();
    if (error || !list) { if (error) console.error('getList error:', error); return null; }
    const { data: requests } = await window._supabase
      .from(REQS).select('*').eq('list_id', id).order('created_at', { ascending: true });
    return { ...list, requests: requests || [] };
  }

  async function getMyLists() {
    const userId = uid();
    if (!userId) return [];
    const { data: lists } = await window._supabase
      .from(LISTS).select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (!lists?.length) return [];
    const { data: requests } = await window._supabase
      .from(REQS).select('*').in('list_id', lists.map(l => l.id));
    return lists.map(l => ({
      ...l,
      requests: (requests || []).filter(r => r.list_id === l.id)
    }));
  }

  async function addRequest(listId, name, dua) {
    const { error } = await window._supabase
      .from(REQS).insert({ list_id: listId, name: name || 'Anonymous', dua });
    return !error;
  }

  async function dismissRequest(requestId) {
    await window._supabase.from(REQS).update({ dismissed: true }).eq('id', requestId);
  }

  async function markSaved(requestId) {
    await window._supabase.from(REQS).update({ saved: true }).eq('id', requestId);
  }

  async function toggleStatus(listId, currentStatus) {
    const next = currentStatus === 'open' ? 'closed' : 'open';
    await window._supabase.from(LISTS).update({ status: next }).eq('id', listId);
    return next;
  }

  async function deleteList(id) {
    await window._supabase.from(LISTS).delete().eq('id', id);
  }

  function getShareUrl(id) {
    const dir = location.href.split('?')[0].replace(/[^/]+$/, '');
    return dir + 'share-view.html?id=' + id;
  }

  return { createList, getList, getMyLists, addRequest, dismissRequest, markSaved, toggleStatus, deleteList, getShareUrl };
})();

window.Sharing = Sharing;
