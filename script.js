(() => {
  'use strict';

  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const storageKey = 'fear-labs-theme';

  const savedTheme = localStorage.getItem(storageKey);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    root.dataset.theme = savedTheme;
  }

  const currentTheme = () => root.dataset.theme || (systemTheme.matches ? 'dark' : 'light');

  const updateLabel = () => {
    if (!button) return;
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    button.setAttribute('aria-label', `Switch to ${next} theme`);
    button.setAttribute('title', `Switch to ${next} theme`);
  };

  button?.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem(storageKey, next);
    updateLabel();
  });

  systemTheme.addEventListener('change', updateLabel);
  updateLabel();
})();
