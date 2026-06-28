/* ================================
   Amal — Auth (Supabase + Google)
================================ */

const Auth = (() => {
  let _user = null;
  let _initialized = false;
  const _listeners = [];

  window._supabase.auth.onAuthStateChange((event, session) => {
    _user = session?.user ?? null;
    _initialized = true;
    _updateNavBtn(_user);
    _listeners.forEach(fn => fn(_user, event));
  });

  // Triggers OAuth code exchange when returning from Google redirect
  window._supabase.auth.getSession();

  function getUser() { return _user; }

  function onChange(fn) {
    _listeners.push(fn);
    // Fire immediately if auth has already resolved (handles race condition)
    if (_initialized) fn(_user, null);
  }

  async function signIn() {
    const { error } = await window._supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'https://amal.amanahdigital.co.uk/' }
    });
    if (error) showToast('Sign in failed — please try again');
  }

  async function signOut() {
    await window._supabase.auth.signOut();
    showToast('Signed out');
  }

  function _updateNavBtn(user) {
    const btn = document.getElementById('nav-auth-btn');
    if (!btn) return;
    btn.style.display = 'inline-flex';
    if (!user) {
      btn.title = 'Sign in';
      btn.onclick = () => signIn();
      btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span>Sign in</span>`;
    } else {
      const inPages = window.location.pathname.includes('/pages/');
      const settingsPath = inPages ? 'settings.html' : 'pages/settings.html';
      btn.title = user.user_metadata?.full_name || user.email || 'Account';
      btn.onclick = () => { window.location.href = settingsPath; };
      const avatarUrl = user.user_metadata?.avatar_url;
      if (avatarUrl) {
        btn.innerHTML = `<img src="${avatarUrl.replace(/"/g, '%22')}" alt="" class="nav-auth-avatar-img">`;
      } else {
        const initial = (user.email || '?')[0].toUpperCase();
        btn.innerHTML = `<span class="nav-auth-initial">${initial}</span>`;
      }
    }
  }

  return { getUser, onChange, signIn, signOut };
})();

window.Auth = Auth;
