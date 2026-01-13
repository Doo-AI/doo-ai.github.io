(() => {
  const root = document.documentElement;
  const themeKey = 'dooai_theme';

  function setTheme(next) {
    root.setAttribute('data-theme', next);
    try { localStorage.setItem(themeKey, next); } catch {}
  }

  function getPreferredTheme() {
    try {
      const saved = localStorage.getItem(themeKey);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function updateThemeButton() {
    const btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    const current = root.getAttribute('data-theme') || 'dark';
    btn.setAttribute('aria-pressed', current === 'light' ? 'true' : 'false');
    btn.querySelector('[data-theme-label]').textContent = current === 'light' ? '浅色' : '深色';
  }

  setTheme(getPreferredTheme());
  updateThemeButton();

  document.addEventListener('click', (e) => {
    const t = e.target;
    const toggle = t && (t.closest ? t.closest('[data-theme-toggle]') : null);
    if (toggle) {
      const current = root.getAttribute('data-theme') || 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
      updateThemeButton();
      return;
    }

    const a = t && (t.closest ? t.closest('a[href^="#"]') : null);
    if (a) {
      const id = a.getAttribute('href');
      const el = id ? document.querySelector(id) : null;
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', id);
      }
    }
  });
})();
