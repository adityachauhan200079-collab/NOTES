const $ = (sel) => document.querySelector(sel);

const loginForm = $('#login-form');
const registerForm = $('#register-form');
const status = $('#status');
const showLogin = $('#show-login');
const showRegister = $('#show-register');
const submitButtons = Array.from(document.querySelectorAll('.primary-btn'));
const passwordToggleButtons = Array.from(document.querySelectorAll('.toggle-password'));

const THEME_KEY = 'manan-theme';

const setTheme = (theme) => {
  const normalizedTheme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', normalizedTheme);
  localStorage.setItem(THEME_KEY, normalizedTheme);
};

const getPreferredTheme = () => {
  const storedTheme = localStorage.getItem(THEME_KEY);
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

setTheme(getPreferredTheme());

const setStatus = (message, tone = '') => {
  status.textContent = message;
  status.className = `status${tone ? ` ${tone}` : ''}`;
};

const setMode = (mode, options = {}) => {
  const { clearStatus = true } = options;
  const isLogin = mode === 'login';
  showLogin.classList.toggle('active', isLogin);
  showRegister.classList.toggle('active', !isLogin);
  showLogin.setAttribute('aria-selected', String(isLogin));
  showRegister.setAttribute('aria-selected', String(!isLogin));
  loginForm.classList.toggle('hidden', !isLogin);
  registerForm.classList.toggle('hidden', isLogin);
  if (clearStatus) setStatus('');
};

const setLoading = (isLoading) => {
  submitButtons.forEach((button) => {
    button.disabled = isLoading;
    if (isLoading) {
      button.dataset.originalText = button.textContent;
      button.textContent = 'Please wait...';
    } else if (button.dataset.originalText) {
      button.textContent = button.dataset.originalText;
      delete button.dataset.originalText;
    }
  });
};

const readResponseBody = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) return { message: await response.text(), data: null };
  try { const data = await response.json(); return { message: data.message || '', data }; } catch { return { message: '', data: null }; }
};

passwordToggleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const input = document.getElementById(button.dataset.target);
    if (!input) return;
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    button.textContent = isHidden ? 'Hide' : 'Show';
    button.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
  });
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = $('#login-email').value.trim();
  const password = $('#login-password').value.trim();
  setStatus('Logging in...');
  setLoading(true);

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const { message, data } = await readResponseBody(res);
    if (res.ok) {
      if (!data?.accessToken) throw new Error('Missing access token');
      localStorage.setItem('accessToken', data.accessToken);
      setStatus('Login successful.', 'success');
      // Redirect to root app or dashboard
      window.location.href = '/';
    } else {
      setStatus(message || 'Login failed', 'error');
    }
  } catch (err) {
    setStatus('Network error. Please try again.', 'error');
  } finally {
    setLoading(false);
  }
});

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = $('#reg-name').value.trim();
  const email = $('#reg-email').value.trim();
  const password = $('#reg-password').value.trim();
  setStatus('Creating account...');
  setLoading(true);

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    });

    const { message } = await readResponseBody(res);
    if (res.ok) {
      setStatus('Registration successful. You can log in now.', 'success');
      registerForm.reset();
      setMode('login', { clearStatus: false });
    } else {
      setStatus(message || 'Registration failed', 'error');
    }
  } catch (err) {
    setStatus('Network error. Please try again.', 'error');
  } finally {
    setLoading(false);
  }
});

showLogin.addEventListener('click', () => setMode('login'));
showRegister.addEventListener('click', () => setMode('register'));

// Determine initial mode: allow `?mode=register` or `#register` to open register form directly
const params = new URLSearchParams(window.location.search);
const modeParam = params.get('mode') || (window.location.hash ? window.location.hash.slice(1) : null);
if (modeParam === 'register' || modeParam === 'signup') {
  setMode('register');
} else {
  setMode('login');
}