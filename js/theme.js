(function () {
  var t = localStorage.getItem('amal_theme');
  if (t === 'dark' || t === 'light') {
    document.documentElement.setAttribute('data-theme', t);
  }
})();
