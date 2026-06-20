const THEME_KEY = 'manan-theme';
const themeToggle = document.querySelector('#theme-toggle');
const existingToken = localStorage.getItem('accessToken');

if (existingToken && window.location.pathname === '/') {
  window.location.href = '/logs.html';
}

const getPreferredTheme = () => {
  const storedTheme = localStorage.getItem(THEME_KEY);

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const setTheme = (theme) => {
  const normalizedTheme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', normalizedTheme);
  localStorage.setItem(THEME_KEY, normalizedTheme);

  if (themeToggle) {
    themeToggle.textContent = normalizedTheme === 'dark' ? 'Light mode' : 'Dark mode';
    themeToggle.setAttribute('aria-pressed', String(normalizedTheme === 'light'));
  }
};

setTheme(getPreferredTheme());

themeToggle?.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href')?.slice(1);
    const target = targetId ? document.getElementById(targetId) : null;

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});