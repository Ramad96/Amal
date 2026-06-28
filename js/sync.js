/* ================================
   Amal — Cloud Sync (Supabase)
================================ */

const CloudSync = (() => {
  const TABLE = 'user_library';

  function uid() {
    return window.Auth?.getUser()?.id ?? null;
  }

  async function push(item) {
    const id = uid();
    if (!id) return;
    await window._supabase.from(TABLE).upsert({
      user_id:     id,
      dua_id:      item.id,
      dua_data:    item,
      saved_at:    item.savedAt    ? new Date(item.savedAt).toISOString()    : new Date().toISOString(),
      answered:    !!item.answered,
      answered_at: item.answeredAt ? new Date(item.answeredAt).toISOString() : null
    }, { onConflict: 'user_id,dua_id' });
  }

  async function remove(duaId) {
    const id = uid();
    if (!id) return;
    await window._supabase.from(TABLE).delete()
      .eq('user_id', id).eq('dua_id', duaId);
  }

  async function pull() {
    const id = uid();
    if (!id) return;
    const { data, error } = await window._supabase
      .from(TABLE)
      .select('dua_data, answered, answered_at')
      .eq('user_id', id);
    if (error || !data?.length) return;

    const merged = { ...(window.Library?.getAll() ?? {}) };
    for (const row of data) {
      const d = row.dua_data;
      if (!d?.id) continue;
      merged[d.id] = {
        ...d,
        answered:    row.answered,
        answeredAt:  row.answered_at ? new Date(row.answered_at).getTime() : undefined
      };
    }
    localStorage.setItem('amal_library', JSON.stringify(merged));
    window.dispatchEvent(new CustomEvent('amal:synced'));
  }

  async function pushAll() {
    const items = window.Library?.list() ?? [];
    for (const item of items) await push(item);
  }

  // On sign-in: pull cloud library then push any local-only items
  Auth.onChange(async (user, event) => {
    if (user && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
      await pull();
      await pushAll();
    }
  });

  return { push, remove, pull };
})();

window.CloudSync = CloudSync;
