const usersKey = 'bleed-users';
const currentUserKey = 'bleed-current-user';
const defaultConfig = {
  active: true,
  notifications: true,
  region: 'EU',
  shortcut: 'ALT+G',
  tag: 'BLEED'
};

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authMessage = document.getElementById('authMessage');
const loginCard = document.getElementById('loginCard');
const registerCard = document.getElementById('registerCard');
const tabButtons = document.querySelectorAll('.tab-button');
const portalButton = document.getElementById('portalButton');
const dashboardSection = document.getElementById('dashboard');
const displayName = document.getElementById('displayName');
const logoutButton = document.getElementById('logoutButton');
const saveSettingsButton = document.getElementById('saveSettingsButton');
const saveStatus = document.getElementById('saveStatus');

const profileNameInput = document.getElementById('profileName');
const profileEmailInput = document.getElementById('profileEmail');
const profileTagInput = document.getElementById('profileTag');
const configActiveInput = document.getElementById('configActive');
const configNotificationsInput = document.getElementById('configNotifications');
const configRegionInput = document.getElementById('configRegion');
const configShortcutInput = document.getElementById('configShortcut');

function getUsers() {
  return JSON.parse(localStorage.getItem(usersKey) || '[]');
}

function saveUsers(users) {
  localStorage.setItem(usersKey, JSON.stringify(users));
}

function getCurrentUser() {
  return localStorage.getItem(currentUserKey);
}

function setCurrentUser(username) {
  if (username) {
    localStorage.setItem(currentUserKey, username);
  } else {
    localStorage.removeItem(currentUserKey);
  }
}

function getUserConfig(username) {
  const saved = localStorage.getItem(`bleed-config-${username}`);
  if (!saved) {
    return { ...defaultConfig, username };
  }
  return JSON.parse(saved);
}

function saveUserConfig(username, config) {
  localStorage.setItem(`bleed-config-${username}`, JSON.stringify(config));
}

function showMessage(message, type = 'info') {
  if (!authMessage) return;
  authMessage.textContent = message;
  authMessage.style.color = type === 'error' ? '#ff8da1' : '#a7d0ff';
  if (message) {
    setTimeout(() => { if (authMessage) authMessage.textContent = ''; }, 6000);
  }
}

function switchMode(mode) {
  tabButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.mode === mode);
  });
  loginCard.classList.toggle('hidden', mode !== 'login');
  registerCard.classList.toggle('hidden', mode !== 'register');
  showMessage('');
}

function showDashboard(username) {
  const config = getUserConfig(username);
  dashboardSection.classList.remove('hidden');
  document.getElementById('portal').scrollIntoView({ behavior: 'smooth' });
  displayName.textContent = config.username || username;
  profileNameInput.value = config.username || username;
  profileEmailInput.value = config.email || '';
  profileTagInput.value = config.tag || defaultConfig.tag;
  configActiveInput.checked = config.active;
  configNotificationsInput.checked = config.notifications;
  configRegionInput.value = config.region;
  configShortcutInput.value = config.shortcut;
  showMessage('Angemeldet als ' + username + '.', 'info');
}

function hideDashboard() {
  dashboardSection.classList.add('hidden');
  displayName.textContent = '';
}

function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!username || !password) {
    showMessage('Bitte Benutzername und Passwort eingeben.', 'error');
    return;
  }

  const users = getUsers();
  const user = users.find(u => u.username === username);
  if (!user || user.password !== password) {
    showMessage('Benutzername oder Passwort falsch.', 'error');
    return;
  }

  setCurrentUser(username);
  showDashboard(username);
}

function handleRegister(event) {
  event.preventDefault();
  const username = document.getElementById('registerUsername').value.trim();
  const password = document.getElementById('registerPassword').value;
  const email = document.getElementById('registerEmail').value.trim();

  if (!username || !password || !email) {
    showMessage('Bitte alle Felder ausfüllen.', 'error');
    return;
  }

  const users = getUsers();
  if (users.some(u => u.username === username)) {
    showMessage('Benutzername existiert bereits.', 'error');
    return;
  }

  users.push({ username, password, email });
  saveUsers(users);
  saveUserConfig(username, { ...defaultConfig, username, email });
  // Auto-login after registration for better UX
  setCurrentUser(username);
  showMessage('Registrierung erfolgreich. Du bist nun angemeldet.', 'info');
  showDashboard(username);
}

function handleLogout() {
  setCurrentUser(null);
  hideDashboard();
  showMessage('Abgemeldet.', 'info');
}

function handleSaveSettings() {
  const username = getCurrentUser();
  if (!username) {
    showMessage('Du bist nicht angemeldet.', 'error');
    return;
  }

  const updatedConfig = {
    username: profileNameInput.value.trim() || username,
    email: profileEmailInput.value,
    tag: profileTagInput.value.trim() || defaultConfig.tag,
    active: configActiveInput.checked,
    notifications: configNotificationsInput.checked,
    region: configRegionInput.value,
    shortcut: configShortcutInput.value.trim() || defaultConfig.shortcut
  };

  saveUserConfig(username, updatedConfig);
  displayName.textContent = updatedConfig.username;
  saveStatus.textContent = 'Einstellungen gespeichert.';
  setTimeout(() => {
    saveStatus.textContent = '';
  }, 2500);
}

function init() {
  tabButtons.forEach(button => {
    button.addEventListener('click', () => switchMode(button.dataset.mode));
  });

  portalButton.addEventListener('click', () => {
    document.getElementById('portal').scrollIntoView({ behavior: 'smooth' });
  });

  loginForm.addEventListener('submit', handleLogin);
  registerForm.addEventListener('submit', handleRegister);
  logoutButton.addEventListener('click', handleLogout);
  saveSettingsButton.addEventListener('click', handleSaveSettings);

  const storedUser = getCurrentUser();
  if (storedUser) {
    showDashboard(storedUser);
  } else {
    switchMode('login');
  }
}

init();

// Ensure basic demo user exists to allow immediate testing
;(function ensureDemoUser(){
  try {
    const users = getUsers();
    if (!users || users.length === 0) {
      users.push({ username: 'demo', password: 'demo', email: 'demo@example.com' });
      saveUsers(users);
      saveUserConfig('demo', { ...defaultConfig, username: 'demo', email: 'demo@example.com' });
      console.info('BLEED: demo user created (demo/demo)');
    }
  } catch (e) {
    console.warn('BLEED: could not create demo user', e);
  }
})();
