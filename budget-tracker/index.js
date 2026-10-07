document.addEventListener('DOMContentLoaded', () => {
  const storageKey = 'bankinggo.demo.account.v1';
  const elements = {
    authScreen: document.getElementById('auth-screen'), dashboardScreen: document.getElementById('dashboard-screen'),
    signupForm: document.getElementById('signup-form'), loginForm: document.getElementById('login-form'),
    budgetForm: document.getElementById('budget-form'), goalForm: document.getElementById('goal-form'), transferForm: document.getElementById('transfer-form'),
    languageSelect: document.getElementById('language-select'), languageOnboard: document.getElementById('language-onboard'),
    fullName: document.getElementById('fullname'), phone: document.getElementById('phone'), pin: document.getElementById('pin'),
    loginPhone: document.getElementById('login-phone'), loginPin: document.getElementById('login-pin'), currency: document.getElementById('currency'),
    balanceInput: document.getElementById('bank-balance'), budgetInput: document.getElementById('monthly-limit'), category: document.getElementById('category'),
    expenseAmount: document.getElementById('expense-amount'), transferAmount: document.getElementById('transfer-amount'), goalAmount: document.getElementById('goal-amount'),
    balance: document.getElementById('display-balance'), monthlyBudget: document.getElementById('monthly-budget'), spentTotal: document.getElementById('spent-total'),
    currencyBadge: document.getElementById('currency-badge'), budgetWarning: document.getElementById('budget-warning'), budgetState: document.getElementById('budget-state'),
    budgetMessage: document.getElementById('budget-message'), userName: document.getElementById('user-name'), savingsBalance: document.getElementById('savings-balance'),
    savingsProgress: document.getElementById('savings-progress'), savingsSummary: document.getElementById('savings-summary'), transferStatus: document.getElementById('transfer-status'),
    loginStatus: document.getElementById('login-status'), transactions: document.getElementById('transactions-list'), chart: document.getElementById('spending-chart'),
    aiInput: document.getElementById('ai-input'), aiChat: document.getElementById('ai-chat'),
    readScreen: document.getElementById('read-screen-btn'), stopReading: document.getElementById('stop-reading-btn'), speechStatus: document.getElementById('speech-status')
  };

  const translations = {
    en: {
      greeting: 'Good morning', tagline: 'Open a simple account', signupTitle: 'Create your BankingGo account', signupText: 'No confusing banking words. Just simple, safe, and clear tools for daily life.',
      fullNameLabel: 'Full name', phoneLabel: 'Phone number', pinLabel: 'Choose a 6-digit PIN', balanceLabel: 'Starting balance', budgetLabel: 'Monthly budget', currencyLabel: 'Currency', appLanguageLabel: 'App language', createAccountBtn: 'Create account',
      balanceCard: 'Available to spend', budgetCard: 'Monthly budget', spentCard: 'Spent', onTrackBadge: 'On track', balanceNote: 'Demo wallet funds', budgetNote: 'Planned spending limit', trackMessage: 'You are on track this month.', trackingTitle: 'Track spending', bankLinked: 'Demo wallet',
      categoryLabel: 'Category', amountLabel: 'Amount', addExpenseBtn: 'Add expense', recentActivity: 'Recent activity', activityLabel: 'This month', saveGoalBtn: 'Save goal', logoutBtn: 'Lock app', quickHelp: 'Ask BankingGo...',
      overspend: 'You are over your monthly budget. Pause non-essential spending and review your expenses.', warningText: 'You are close to your monthly limit. Keep spending low for the rest of the month.'
    },
    sw: {
      greeting: 'Habari za asubuhi', tagline: 'Fungua akaunti rahisi', signupTitle: 'Unda akaunti yako ya BankingGo', signupText: 'Hakuna maneno ya benki yanayochanganya. Hapa kuna zana rahisi na zilizoeleweka.',
      fullNameLabel: 'Jina kamili', phoneLabel: 'Namba ya simu', pinLabel: 'Chagua PIN ya tarakimu 6', balanceLabel: 'Salio la kuanza', budgetLabel: 'Bajeti ya mwezi', currencyLabel: 'Sarafu', appLanguageLabel: 'Lugha ya programu', createAccountBtn: 'Unda akaunti',
      balanceCard: 'Pesa za kutumia', budgetCard: 'Bajeti ya mwezi', spentCard: 'Kilichotumika', onTrackBadge: 'Kiko sawa', balanceNote: 'Pesa za majaribio', budgetNote: 'Kikomo cha matumizi', trackMessage: 'Uko vizuri kwenye bajeti hii.', trackingTitle: 'Fuatilia matumizi', bankLinked: 'Pochi ya majaribio',
      categoryLabel: 'Kategoria', amountLabel: 'Kiasi', addExpenseBtn: 'Ongeza matumizi', recentActivity: 'Shughuli za hivi karibuni', activityLabel: 'Mwezi huu', saveGoalBtn: 'Lenga akiba', logoutBtn: 'Funga app', quickHelp: 'Uliza BankingGo...',
      overspend: 'Umevuka bajeti ya mwezi. Sitisha matumizi yasiyo ya lazima na kagua gharama zako.', warningText: 'Uko karibu na kikomo cha mwezi. Punguza matumizi yaliyobaki.'
    },
    yo: {
      greeting: 'E kaaro', tagline: 'Ṣí àkọọ́lẹ̀ rọrùn', signupTitle: 'Ṣẹda àkọọ́lẹ̀ BankingGo rẹ', signupText: 'Ko si ọrọ banki ti o nira. Awọn irinṣẹ rọrun, ailewu, ati ti o ye.',
      fullNameLabel: 'Orukọ ni kikun', phoneLabel: 'Nọmba foonu', pinLabel: 'Yan PIN oni-nọmba mẹfa', balanceLabel: 'Iwọn ibẹrẹ', budgetLabel: 'Iṣeto oṣooṣu', currencyLabel: 'Owó', appLanguageLabel: 'Ede app', createAccountBtn: 'Ṣẹda àkọọ́lẹ̀',
      balanceCard: 'Owó tí o le lò', budgetCard: 'Iṣeto oṣooṣu', spentCard: 'Ti a lo', onTrackBadge: 'Ninu ọna', balanceNote: 'Owó idanwo', budgetNote: 'Iwọn inawo', trackMessage: 'O wa ni ọna to dara ni oṣu yii.', trackingTitle: 'Tẹ̀le inawo', bankLinked: 'Apamọwọ idanwo',
      categoryLabel: 'Ẹka', amountLabel: 'Iye', addExpenseBtn: 'Fi inawo kun', recentActivity: 'Iṣe laipẹ', activityLabel: 'Oṣu yii', saveGoalBtn: 'Ibi ipamọ', logoutBtn: 'Tii app', quickHelp: 'Béèrè si BankingGo...',
      overspend: 'O ti kọja iṣeto oṣooṣu. Dẹkun inawo ti ko ṣe pataki ki o ṣayẹwo awọn inawo rẹ.', warningText: 'O sunmọ opin iṣeto oṣooṣu. Dín inawo ku.'
    },
    lg: {
      greeting: 'Mwasuze mutya', tagline: 'Tandika akaawunti ennyangu', signupTitle: 'Tandika akaawunti yo BankingGo', signupText: 'Tewali bigambo bya banki ebizibu. Wano waliwo ebikozesebwa ebyangu era ebitegeerekeka.',
      fullNameLabel: 'Erinnya lyonna', phoneLabel: 'Enamba y’essimu', pinLabel: 'Londa PIN ya namba 6', balanceLabel: 'Ebbalansi ey’okutandika', budgetLabel: 'Bajeti ey’omwezi', currencyLabel: 'Ssente', appLanguageLabel: 'Lulimi lwa app', createAccountBtn: 'Tandika akaawunti',
      balanceCard: 'Ssente z’okukozesa', budgetCard: 'Bajeti ey’omwezi', spentCard: 'Ezaakozesebwa', onTrackBadge: 'Kiri bulungi', balanceNote: 'Ssente za demo', budgetNote: 'Ekkomo ly’okukozesa', trackMessage: 'Oli bulungi mu bajeti eno.', trackingTitle: 'Kebeera eby’okukozesa', bankLinked: 'Wallet ya demo',
      categoryLabel: 'Ekika', amountLabel: 'Omuwendo', addExpenseBtn: 'Gatta eby’okukozesa', recentActivity: 'Ebikolebwa ebipya', activityLabel: 'Omwezi guno', saveGoalBtn: 'Tereka ssente', logoutBtn: 'Funga app', quickHelp: 'Buuza BankingGo...',
      overspend: 'Osusse bajeti yo ey’omwezi. Kendeeza eby’okukozesa ebitali byetaagisa era weetegereze ebyakozesebwa.', warningText: 'Oli kumpi n’ekkomo ly’omwezi. Kendeeza eby’okukozesa.'
    }
  };

  const currencyFormatters = Object.fromEntries(Object.entries({
    USD: ['en-US', 'USD'], KES: ['en-KE', 'KES'], JPY: ['ja-JP', 'JPY'], GBP: ['en-GB', 'GBP'], EUR: ['de-DE', 'EUR'],
    NGN: ['en-NG', 'NGN'], INR: ['en-IN', 'INR'], AED: ['en-AE', 'AED'], CAD: ['en-CA', 'CAD'], ZAR: ['en-ZA', 'ZAR']
  }).map(([code, [locale, currency]]) => [code, new Intl.NumberFormat(locale, { style: 'currency', currency, ...(currency === 'JPY' ? { maximumFractionDigits: 0 } : {}) })]));

  const state = { userName: '', phone: '', balance: 0, monthlyLimit: 0, spent: 0, savingsBalance: 0, savingsGoal: 0, currency: 'USD', language: 'en', transactions: [] };
  let storedAccount = loadStoredAccount();

  function formatCurrency(value) {
    return (currencyFormatters[state.currency] || currencyFormatters.USD).format(Number(value) || 0);
  }

  function loadStoredAccount() {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey));
      if (!stored || stored.version !== 1 || !stored.account || !Array.isArray(stored.transactions)) return null;
      return stored;
    } catch {
      return null;
    }
  }

  function persistAccount() {
    if (!storedAccount) return;
    try {
      storedAccount.account = { ...storedAccount.account, userName: state.userName, phone: state.phone, balance: state.balance, monthlyLimit: state.monthlyLimit, spent: state.spent, savingsBalance: state.savingsBalance, savingsGoal: state.savingsGoal, currency: state.currency, language: state.language };
      storedAccount.transactions = state.transactions;
      localStorage.setItem(storageKey, JSON.stringify(storedAccount));
    } catch {
      setStatus(elements.transferStatus, 'Could not save this demo data in browser storage.', true);
    }
  }

  function setStatus(element, text, isError = false) {
    element.textContent = text;
    element.classList.toggle('error', isError);
  }

  function setAuthMode(mode) {
    const login = mode === 'login';
    elements.signupForm.classList.toggle('hidden', login);
    elements.loginForm.classList.toggle('hidden', !login);
    document.getElementById('create-mode').classList.toggle('active', !login);
    document.getElementById('login-mode').classList.toggle('active', login);
    document.getElementById('create-mode').setAttribute('aria-selected', String(!login));
    document.getElementById('login-mode').setAttribute('aria-selected', String(login));
    elements.loginStatus.textContent = '';
  }

  function toHex(buffer) {
    return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  async function hashPin(pin, saltHex) {
    if (!window.crypto?.subtle) throw new Error('Secure browser cryptography is unavailable. Open this prototype through HTTPS or localhost.');
    const salt = saltHex ? Uint8Array.from(saltHex.match(/.{1,2}/g), (byte) => parseInt(byte, 16)) : window.crypto.getRandomValues(new Uint8Array(16));
    const key = await window.crypto.subtle.importKey('raw', new TextEncoder().encode(pin), 'PBKDF2', false, ['deriveBits']);
    const bits = await window.crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 310000, hash: 'SHA-256' }, key, 256);
    return { salt: toHex(salt), hash: toHex(bits) };
  }

  function renderTransactions() {
    elements.transactions.replaceChildren();
    state.transactions.slice(0, 8).forEach((transaction) => {
      const item = document.createElement('li');
      item.className = 'transaction-item';
      const meta = document.createElement('div');
      meta.className = 'transaction-meta';
      const icon = document.createElement('span');
      icon.className = `transaction-icon ${transaction.type === 'income' ? 'income' : 'expense'}`;
      icon.textContent = transaction.type === 'income' ? '+' : '-';
      const details = document.createElement('div');
      const name = document.createElement('strong');
      name.textContent = String(transaction.name || 'Activity');
      const date = document.createElement('small');
      date.textContent = String(transaction.date || 'Today');
      details.append(name, date);
      meta.append(icon, details);
      const amount = document.createElement('span');
      amount.className = `transaction-amount ${transaction.type === 'income' ? 'income' : 'expense'}`;
      amount.textContent = `${transaction.type === 'income' ? '+' : '-'}${formatCurrency(transaction.amount)}`;
      item.append(meta, amount);
      elements.transactions.append(item);
    });
  }

  function renderChart() {
    const totals = new Map();
    state.transactions.filter((transaction) => transaction.type === 'expense').forEach((transaction) => {
      const category = String(transaction.category || 'Other');
      totals.set(category, (totals.get(category) || 0) + Number(transaction.amount || 0));
    });
    elements.chart.replaceChildren();
    if (!totals.size) {
      const empty = document.createElement('p');
      empty.className = 'muted';
      empty.textContent = 'Your spending categories will appear here after you add expenses.';
      elements.chart.append(empty);
      return;
    }
    const max = Math.max(...totals.values(), 1);
    totals.forEach((amount, category) => {
      const row = document.createElement('div');
      row.className = 'chart-row';
      const label = document.createElement('span');
      label.className = 'chart-label';
      label.textContent = category;
      const track = document.createElement('div');
      track.className = 'chart-track';
      const bar = document.createElement('div');
      const widthBucket = Math.min(100, Math.max(10, Math.ceil((amount / max) * 10) * 10));
      bar.className = `chart-bar width-${widthBucket}`;
      bar.setAttribute('aria-hidden', 'true');
      track.append(bar);
      const value = document.createElement('span');
      value.className = 'chart-value';
      value.textContent = formatCurrency(amount);
      row.append(label, track, value);
      elements.chart.append(row);
    });
  }

  function updateDashboard() {
    elements.userName.textContent = state.userName;
    elements.balance.textContent = formatCurrency(state.balance);
    elements.monthlyBudget.textContent = formatCurrency(state.monthlyLimit);
    elements.spentTotal.textContent = formatCurrency(state.spent);
    elements.currencyBadge.textContent = state.currency;
    elements.savingsBalance.textContent = formatCurrency(state.savingsBalance);
    const progress = state.savingsGoal > 0 ? Math.min(100, (state.savingsBalance / state.savingsGoal) * 100) : 0;
    elements.savingsProgress.value = progress;
    elements.savingsSummary.textContent = state.savingsGoal > 0 ? `${Math.round(progress)}% of ${formatCurrency(state.savingsGoal)} saved.` : 'Set a goal to start tracking your progress.';
    const remaining = state.monthlyLimit - state.spent;
    const dictionary = translations[state.language] || translations.en;

    if (state.spent > state.monthlyLimit) {
      elements.budgetWarning.classList.remove('hidden');
      elements.budgetWarning.textContent = dictionary.overspend;
      elements.budgetState.textContent = 'Over budget';
      elements.budgetState.className = 'chip warning';
      elements.budgetMessage.textContent = `${formatCurrency(Math.max(0, state.balance))} remains available to spend.`;
    } else if (state.spent >= state.monthlyLimit * 0.8) {
      elements.budgetWarning.classList.remove('hidden');
      elements.budgetWarning.textContent = dictionary.warningText;
      elements.budgetState.textContent = 'Nearly there';
      elements.budgetState.className = 'chip warning';
      elements.budgetMessage.textContent = `${formatCurrency(remaining)} left in your monthly budget.`;
    } else {
      elements.budgetWarning.classList.add('hidden');
      elements.budgetState.textContent = dictionary.onTrackBadge;
      elements.budgetState.className = 'chip neutral';
      elements.budgetMessage.textContent = `${formatCurrency(remaining)} left in your monthly budget.`;
    }
    renderTransactions();
    renderChart();
  }

  function applyLanguage(language) {
    state.language = translations[language] ? language : 'en';
    const dictionary = translations[state.language];
    document.documentElement.lang = state.language;
    document.querySelectorAll('[data-key]').forEach((node) => {
      if (dictionary[node.dataset.key]) node.textContent = dictionary[node.dataset.key];
    });
    elements.languageSelect.value = state.language;
    elements.languageOnboard.value = state.language;
    elements.aiInput.placeholder = dictionary.quickHelp;
    if (state.userName) updateDashboard();
  }

  function unlockDashboard() {
    elements.authScreen.classList.remove('active');
    elements.dashboardScreen.classList.add('active');
    applyLanguage(state.language);
    updateDashboard();
  }

  function addChatMessage(text, sender) {
    const message = document.createElement('div');
    message.className = `message ${sender}`;
    message.textContent = text;
    elements.aiChat.append(message);
    elements.aiChat.scrollTop = elements.aiChat.scrollHeight;
  }

  function respondToHelp(prompt) {
    const question = prompt.toLowerCase();
    if (question.includes('save') || question.includes('goal')) {
      return `You have ${formatCurrency(state.savingsBalance)} saved. Your goal is ${formatCurrency(state.savingsGoal)}. Move only money you can afford into savings.`;
    }
    if (question.includes('budget') || question.includes('spend') || question.includes('over')) {
      const remaining = Math.max(0, state.monthlyLimit - state.spent);
      return `You have used ${formatCurrency(state.spent)} of your ${formatCurrency(state.monthlyLimit)} monthly budget. ${remaining ? `${formatCurrency(remaining)} remains in your budget.` : 'Your budget is exceeded; pause optional spending.'}`;
    }
    return 'I can explain your balance, spending, budget, and savings goal. This demo assistant cannot access a bank or move real money.';
  }

  function sendAiMessage(text) {
    const message = text.trim();
    if (!message) return;
    addChatMessage(message, 'user');
    addChatMessage(respondToHelp(message), 'bot');
    elements.aiInput.value = '';
  }

  document.getElementById('create-mode').addEventListener('click', () => setAuthMode('create'));
  document.getElementById('login-mode').addEventListener('click', () => setAuthMode('login'));
  elements.languageSelect.addEventListener('change', (event) => applyLanguage(event.target.value));
  elements.languageOnboard.addEventListener('change', (event) => applyLanguage(event.target.value));
  document.getElementById('help-btn').addEventListener('click', () => {
    if (elements.dashboardScreen.classList.contains('active')) elements.aiInput.focus();
    else setAuthMode(storedAccount ? 'login' : 'create');
  });

  elements.readScreen.addEventListener('click', () => {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      elements.speechStatus.textContent = 'This browser does not support read-aloud. Use your device screen reader instead.';
      return;
    }
    const languageTags = { en: 'en', sw: 'sw', yo: 'yo', lg: 'lg' };
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((item) => item.lang.toLowerCase().startsWith(languageTags[state.language]));
    if (!voice) {
      elements.speechStatus.textContent = `No installed speech voice was found for ${state.language}. Use a device screen reader or install a matching voice.`;
      return;
    }
    const activeScreen = document.querySelector('.screen.active');
    const text = activeScreen?.innerText.trim().slice(0, 5000);
    if (!text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.lang = voice.lang;
    utterance.onend = () => {
      elements.stopReading.disabled = true;
      elements.speechStatus.textContent = 'Finished reading.';
    };
    utterance.onerror = () => {
      elements.stopReading.disabled = true;
      elements.speechStatus.textContent = 'Read-aloud could not start. Try your device screen reader.';
    };
    window.speechSynthesis.speak(utterance);
    elements.stopReading.disabled = false;
    elements.speechStatus.textContent = `Reading in ${voice.lang}.`;
  });
  elements.stopReading.addEventListener('click', () => {
    window.speechSynthesis?.cancel();
    elements.stopReading.disabled = true;
    elements.speechStatus.textContent = 'Reading stopped.';
  });
  document.getElementById('ai-send').addEventListener('click', () => sendAiMessage(elements.aiInput.value));
  elements.aiInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') sendAiMessage(elements.aiInput.value);
  });
  document.querySelectorAll('.suggestion-btn').forEach((button) => button.addEventListener('click', () => sendAiMessage(button.textContent)));

  elements.signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = elements.fullName.value.trim();
    const phone = elements.phone.value.trim();
    const pin = elements.pin.value;
    const balance = Number(elements.balanceInput.value);
    const monthlyLimit = Number(elements.budgetInput.value);
    if (!name || !phone || !/^\d{6}$/.test(pin) || !Number.isFinite(balance) || balance < 0 || !Number.isFinite(monthlyLimit) || monthlyLimit <= 0) {
      alert('Enter a name, phone number, six-digit PIN, starting balance, and positive monthly budget.');
      return;
    }
    try {
      const credentials = await hashPin(pin);
      state.userName = name;
      state.phone = phone;
      state.balance = balance;
      state.monthlyLimit = monthlyLimit;
      state.spent = 0;
      state.savingsBalance = 0;
      state.savingsGoal = 0;
      state.currency = elements.currency.value;
      state.transactions = [];
      storedAccount = { version: 1, account: { phone, pinSalt: credentials.salt, pinHash: credentials.hash }, transactions: [] };
      persistAccount();
      elements.pin.value = '';
      unlockDashboard();
    } catch (error) {
      alert(error.message || 'Could not create the local demo account.');
    }
  });

  elements.loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!storedAccount) return setStatus(elements.loginStatus, 'No saved demo account exists in this browser.', true);
    const phone = elements.loginPhone.value.trim();
    const pin = elements.loginPin.value;
    if (phone !== storedAccount.account.phone || !/^\d{6}$/.test(pin)) return setStatus(elements.loginStatus, 'Phone number or PIN is incorrect.', true);
    try {
      const credentials = await hashPin(pin, storedAccount.account.pinSalt);
      if (credentials.hash !== storedAccount.account.pinHash) return setStatus(elements.loginStatus, 'Phone number or PIN is incorrect.', true);
      Object.assign(state, storedAccount.account);
      state.transactions = storedAccount.transactions;
      elements.loginPin.value = '';
      setStatus(elements.loginStatus, 'Signed in to this browser demo.');
      unlockDashboard();
    } catch (error) {
      setStatus(elements.loginStatus, error.message, true);
    }
  });

  elements.budgetForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const amount = Number(elements.expenseAmount.value);
    if (!Number.isFinite(amount) || amount <= 0) return alert('Enter a valid expense amount.');
    if (amount > state.balance) return alert('This is more than the available demo wallet balance.');
    const category = elements.category.value;
    state.balance -= amount;
    state.spent += amount;
    state.transactions.unshift({ name: `${category} expense`, category, amount, type: 'expense', date: 'Today' });
    elements.budgetForm.reset();
    persistAccount();
    updateDashboard();
  });

  document.querySelectorAll('.pick-btn').forEach((button) => button.addEventListener('click', () => { elements.expenseAmount.value = button.dataset.value; }));

  elements.goalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const goal = Number(elements.goalAmount.value);
    if (!Number.isFinite(goal) || goal <= 0) return;
    state.savingsGoal = goal;
    elements.goalForm.reset();
    persistAccount();
    updateDashboard();
  });

  elements.transferForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const amount = Number(elements.transferAmount.value);
    if (!Number.isFinite(amount) || amount <= 0) return setStatus(elements.transferStatus, 'Enter an amount greater than zero.', true);
    if (amount > state.balance) return setStatus(elements.transferStatus, 'Not enough available demo wallet funds for that transfer.', true);
    state.balance -= amount;
    state.savingsBalance += amount;
    state.transactions.unshift({ name: 'Moved to savings', category: 'Savings', amount, type: 'transfer', date: 'Today' });
    elements.transferForm.reset();
    setStatus(elements.transferStatus, `${formatCurrency(amount)} moved to demo savings.`);
    persistAccount();
    updateDashboard();
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    elements.dashboardScreen.classList.remove('active');
    elements.authScreen.classList.add('active');
    elements.loginPhone.value = state.phone;
    elements.loginPin.value = '';
    setAuthMode('login');
    elements.loginPin.focus();
  });
  document.getElementById('save-goal-btn').addEventListener('click', () => elements.goalAmount.focus());

  if (storedAccount) {
    elements.loginPhone.value = storedAccount.account.phone || '';
    setAuthMode('login');
  } else {
    setAuthMode('create');
  }
  applyLanguage('en');
  updateDashboard();
});