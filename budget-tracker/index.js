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
    readScreen: document.getElementById('read-screen-btn'), stopReading: document.getElementById('stop-reading-btn'), speechStatus: document.getElementById('speech-status'),
    navStatus: document.getElementById('nav-status'), languageReviewNote: document.getElementById('language-review-note'),
    voiceInput: document.getElementById('voice-input-btn'), speakReplies: document.getElementById('speak-replies')
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

  Object.assign(translations, {
    'zh-CN': {
      greeting: '早上好', tagline: '开设简单账户', signupTitle: '创建 BankingGo 账户', signupText: '不使用复杂的银行术语，轻松管理日常资金。',
      fullNameLabel: '姓名', phoneLabel: '电话号码', pinLabel: '设置 6 位 PIN', balanceLabel: '初始余额', budgetLabel: '月度预算', currencyLabel: '货币', appLanguageLabel: '应用语言', createAccountBtn: '创建账户',
      balanceCard: '可用余额', budgetCard: '月度预算', spentCard: '已支出', onTrackBadge: '正常', balanceNote: '演示钱包余额', budgetNote: '计划支出上限', trackMessage: '本月预算正常。', trackingTitle: '记录支出', bankLinked: '演示钱包',
      categoryLabel: '类别', amountLabel: '金额', addExpenseBtn: '添加支出', recentActivity: '最近活动', activityLabel: '本月', saveGoalBtn: '储蓄目标', logoutBtn: '锁定应用', quickHelp: '询问 BankingGo...'
    },
    'fr-FR': {
      greeting: 'Bonjour', tagline: 'Ouvrez un compte simple', signupTitle: 'Créez votre compte BankingGo', signupText: 'Des outils clairs pour gérer votre argent au quotidien, sans termes bancaires compliqués.',
      fullNameLabel: 'Nom complet', phoneLabel: 'Numéro de téléphone', pinLabel: 'Choisissez un code PIN à 6 chiffres', balanceLabel: 'Solde de départ', budgetLabel: 'Budget mensuel', currencyLabel: 'Devise', appLanguageLabel: 'Langue de l’application', createAccountBtn: 'Créer un compte',
      balanceCard: 'Disponible', budgetCard: 'Budget mensuel', spentCard: 'Dépensé', onTrackBadge: 'Dans le budget', balanceNote: 'Solde du portefeuille démo', budgetNote: 'Limite de dépenses prévue', trackMessage: 'Vous respectez votre budget ce mois-ci.', trackingTitle: 'Suivre les dépenses', bankLinked: 'Portefeuille démo',
      categoryLabel: 'Catégorie', amountLabel: 'Montant', addExpenseBtn: 'Ajouter une dépense', recentActivity: 'Activité récente', activityLabel: 'Ce mois-ci', saveGoalBtn: 'Objectif d’épargne', logoutBtn: 'Verrouiller', quickHelp: 'Demandez à BankingGo...'
    },
    'luo-KE': {
      greeting: 'Oyawore', tagline: 'Yaw akaunti manyien', signupTitle: 'Yaw akaunti mar BankingGo', fullNameLabel: 'Nying mari', phoneLabel: 'Namba mar simu', balanceLabel: 'Pesa ma nitie', budgetLabel: 'Budget mar dwe', currencyLabel: 'Tipo mar pesa', appLanguageLabel: 'Dhok mar app', createAccountBtn: 'Yaw akaunti',
      balanceCard: 'Pesa ma nitie', budgetCard: 'Budget mar dwe', spentCard: 'Pesa mosetiyogi', trackingTitle: 'Rit tiyo gi pesa', categoryLabel: 'Kinde', amountLabel: 'Namba', addExpenseBtn: 'Med tiyo', recentActivity: 'Tich manyien', saveGoalBtn: 'Dwok pesa', logoutBtn: 'Lor app'
    },
    'ki-KE': {
      greeting: 'Wĩmwega', tagline: 'Ambũra akaũnti njega', signupTitle: 'Ambũra akaũnti ya BankingGo', fullNameLabel: 'Rĩtwa rĩothe', phoneLabel: 'Namba ya thimũ', balanceLabel: 'Pesa cia kwambĩrĩria', budgetLabel: 'Bajeti ya mweri', currencyLabel: 'Mũceera wa pesa', appLanguageLabel: 'Rũthiomi rwa app', createAccountBtn: 'Ambũra akaũnti',
      balanceCard: 'Pesa iria ũrĩ nacio', budgetCard: 'Bajeti ya mweri', spentCard: 'Pesa iria watumia', trackingTitle: 'Rora matumĩri ma pesa', categoryLabel: 'Kĩrĩa', amountLabel: 'Wĩga', addExpenseBtn: 'Thomera matumĩri', recentActivity: 'Mĩtugo mĩhũthĩ', saveGoalBtn: 'Gĩtĩo gĩa kũiga', logoutBtn: 'Garia app'
    },
    'kam-KE': {
      greeting: 'Ũvoo wĩ mũseo', tagline: 'Ũngĩa akaunti nzeo', signupTitle: 'Ũngĩa akaunti ya BankingGo', fullNameLabel: 'Ĩtwa yonthe', phoneLabel: 'Namba ya simu', balanceLabel: 'Mbesa sya kwambĩĩa', budgetLabel: 'Bajeti ya mwai', currencyLabel: 'Mbesa', appLanguageLabel: 'Ũndũ wa lugha ya app', createAccountBtn: 'Ũngĩa akaunti',
      balanceCard: 'Mbesa ila syĩvo', budgetCard: 'Bajeti ya mwai', spentCard: 'Mbesa ila watumie', trackingTitle: 'Rora utumĩ wa mbesa', categoryLabel: 'Kĩndũ', amountLabel: 'Mbesa', addExpenseBtn: 'Thomera utumĩ', recentActivity: 'Mĩtugo ya tene', saveGoalBtn: 'Kĩthĩo kya mbesa', logoutBtn: 'Kinga app'
    },
    'guz-KE': {
      greeting: 'Bwakire', tagline: 'Togera akaunti enyangu', signupTitle: 'Togera akaunti ya BankingGo', fullNameLabel: 'Eriina ria geto', phoneLabel: 'Enamba ya esimu', balanceLabel: 'Chintere chia kwamboka', budgetLabel: 'Bajeti ya omotieno', currencyLabel: 'Chintere', appLanguageLabel: 'Endimi ya app', createAccountBtn: 'Togera akaunti',
      balanceCard: 'Chintere chiago', budgetCard: 'Bajeti ya omotieno', spentCard: 'Chintere chiasirwe', trackingTitle: 'Rora okobandisa chintere', categoryLabel: 'Ekinto', amountLabel: 'Obwoki', addExpenseBtn: 'Gata obobandisa', recentActivity: 'Amatuko aya', saveGoalBtn: 'Omogano gwa okobeka', logoutBtn: 'Gara app'
    }
  });

  const languageSupport = {
    en: {
      label: 'English', speechLocale: 'en-KE', review: false,
      labels: { assistantTitle: 'BankingGo help', assistantKind: 'Guided demo assistant', assistantIntro: 'Hello! Ask me about your balance, budget, or savings.', suggestSave: 'How do I save?', suggestBudget: 'Am I overspending?', suggestHelp: 'Help me budget', speakReplies: 'Read replies aloud', voiceButton: 'Speak', stopVoiceButton: 'Stop listening', sendButton: 'Send' },
      keywords: { save: ['save', 'saving', 'savings', 'goal'], budget: ['budget', 'spend', 'spent', 'overspend'], balance: ['balance', 'money'], help: ['help'] },
      replies: {
        intro: 'Hello! Ask me about your balance, budget, or savings.',
        save: 'You have {saved} in savings. Your goal is {goal}. Move only money you can afford to set aside.',
        budget: 'You have spent {spent} of your {limit} budget. {remaining} remains in your budget.',
        balance: 'Your demo wallet has {balance} available. This is not a real bank balance.',
        help: 'I can explain your balance, spending, budget, and savings goal. I cannot access a bank or move real money.'
      }
    },
    sw: {
      label: 'Kiswahili', speechLocale: 'sw-KE', review: false,
      labels: { assistantTitle: 'Msaada wa BankingGo', assistantKind: 'Msaidizi wa majaribio', assistantIntro: 'Karibu! Uliza kuhusu salio, bajeti au akiba yako.', suggestSave: 'Ninawezaje kuweka akiba?', suggestBudget: 'Je, nimetumia kupita kiasi?', suggestHelp: 'Nisaidie kupanga bajeti', speakReplies: 'Soma majibu kwa sauti', voiceButton: 'Ongea', stopVoiceButton: 'Acha kusikiliza', sendButton: 'Tuma' },
      keywords: { save: ['akiba', 'weka akiba', 'kuweka'], budget: ['bajeti', 'matumizi', 'tumia'], balance: ['salio', 'pesa'], help: ['msaada', 'saidia'] },
      replies: { intro: 'Karibu! Uliza kuhusu salio, bajeti au akiba yako.', save: 'Una {saved} kwenye akiba. Lengo lako ni {goal}. Weka tu pesa unazoweza kuweka kando.', budget: 'Umetumia {spent} kati ya bajeti ya {limit}. Umebakiza {remaining}.', balance: 'Pochi yako ya majaribio ina {balance}. Hii si salio halisi la benki.', help: 'Naweza kueleza salio, matumizi, bajeti na akiba. Siwezi kufikia benki au kutuma pesa halisi.' }
    },
    yo: {
      label: 'Yoruba', speechLocale: 'yo-NG', review: true,
      labels: { assistantTitle: 'Iranlọwọ BankingGo', assistantKind: 'Oluranlọwọ idanwo', assistantIntro: 'Kaabo! Beere nipa owo rẹ, isuna, tabi ifipamọ.', suggestSave: 'Bawo ni mo ṣe le fipamọ?', suggestBudget: 'Ṣe mo n na ju?', suggestHelp: 'Ran mi lọwọ pẹlu isuna', speakReplies: 'Ka awọn idahun soke', voiceButton: 'Sọ̀rọ̀', stopVoiceButton: 'Dá gbigbọ duro', sendButton: 'Fi ranṣẹ' },
      keywords: { save: ['fipamọ', 'ifipamọ', 'ibi ipamọ'], budget: ['isuna', 'inawo', 'na ju'], balance: ['owó', 'iwọn'], help: ['iranlọwọ', 'ran mi'] },
      replies: { intro: 'Kaabo! Beere nipa owo rẹ, isuna, tabi ifipamọ.', save: 'O ni {saved} ninu ifipamọ. Ibi-afẹde rẹ jẹ {goal}. Fi owo ti o le pamọ nikan si ibi-afẹde.', budget: 'O ti lo {spent} ninu isuna {limit}. O ku {remaining}.', balance: 'Apamọwọ idanwo rẹ ni {balance}. Eyi kii ṣe owo banki gidi.', help: 'Mo le ṣalaye owo ti o ni, inawo, isuna ati ifipamọ. Emi ko le wọ banki rẹ tabi gbe owo gidi.' }
    },
    lg: {
      label: 'Luganda', speechLocale: 'lg-UG', review: true,
      labels: { assistantTitle: 'Obuyambi bwa BankingGo', assistantKind: 'Omuyambi wa demo', assistantIntro: 'Oli otya! Buuza ku bbalaansi, bajeti oba ssente zo ezitereddwa.', suggestSave: 'Ntereka ntya ssente?', suggestBudget: 'Nkozesa ssente nyingi?', suggestHelp: 'Nyamba ku bajeti', speakReplies: 'Soma eby’okuddamu mu ddoboozi', voiceButton: 'Yogera', stopVoiceButton: 'Komya okuwuliriza', sendButton: 'Weereza' },
      keywords: { save: ['tereka', 'ssente', 'okutereka'], budget: ['bajeti', 'kozesa', 'okukozesa'], balance: ['bbalaansi', 'ssente'], help: ['obuyambi', 'nyamba'] },
      replies: { intro: 'Oli otya! Buuza ku bbalaansi, bajeti oba ssente zo ezitereddwa.', save: 'Olina {saved} mu ssente z’otereka. Ekigendererwa kyo kiri {goal}. Tereka ssente z’osobola zokka.', budget: 'Okozesezza {spent} ku bajeti ya {limit}. Osigazza {remaining}.', balance: 'Wallet yo eya demo erina {balance}. Eno si bbalaansi ya banki entuufu.', help: 'Nsobola okunnyonnyola bbalaansi, bajeti n’okutereka. Sisobola kuyingira mu banki oba kutambuza ssente za ddala.' }
    },
    'zh-CN': {
      label: 'Mandarin Chinese', speechLocale: 'zh-CN', review: false,
      labels: { assistantTitle: 'BankingGo 帮助', assistantKind: '演示助手', assistantIntro: '你好！可以问我余额、预算或储蓄。', suggestSave: '怎样储蓄？', suggestBudget: '我是否超支？', suggestHelp: '帮我制定预算', speakReplies: '朗读 BankingGo 的回复', voiceButton: '语音提问', stopVoiceButton: '停止聆听', sendButton: '发送' },
      keywords: { save: ['储蓄', '存钱', '存款', '目标'], budget: ['预算', '支出', '超支', '花钱'], balance: ['余额', '钱'], help: ['帮助', '帮我'] },
      replies: { intro: '你好！可以问我余额、预算或储蓄。', save: '你已储蓄 {saved}，目标是 {goal}。只存下你目前能够存下的钱。', budget: '你已支出 {spent}，月度预算为 {limit}，还剩 {remaining}。', balance: '你的演示钱包可用余额为 {balance}。这不是真实银行余额。', help: '我可以解释余额、支出、预算和储蓄目标。我不能访问银行或转移真实资金。' }
    },
    'fr-FR': {
      label: 'French', speechLocale: 'fr-FR', review: false,
      labels: { assistantTitle: 'Aide BankingGo', assistantKind: 'Assistant de démonstration', assistantIntro: 'Bonjour ! Posez une question sur votre solde, votre budget ou votre épargne.', suggestSave: 'Comment épargner ?', suggestBudget: 'Est-ce que je dépasse mon budget ?', suggestHelp: 'Aidez-moi à faire un budget', speakReplies: 'Lire les réponses à voix haute', voiceButton: 'Parler', stopVoiceButton: 'Arrêter l’écoute', sendButton: 'Envoyer' },
      keywords: { save: ['épargne', 'épargner', 'économiser', 'objectif'], budget: ['budget', 'dépense', 'dépenser', 'dépasse'], balance: ['solde', 'argent'], help: ['aide', 'aidez'] },
      replies: { intro: 'Bonjour ! Posez une question sur votre solde, votre budget ou votre épargne.', save: 'Vous avez {saved} en épargne. Votre objectif est de {goal}. Ne mettez de côté que ce que vous pouvez vous permettre.', budget: 'Vous avez dépensé {spent} sur votre budget de {limit}. Il vous reste {remaining}.', balance: 'Votre portefeuille de démonstration contient {balance}. Ce n’est pas un vrai solde bancaire.', help: 'Je peux expliquer votre solde, vos dépenses, votre budget et votre objectif d’épargne. Je ne peux pas accéder à une banque ni transférer de vrai argent.' }
    },
    'luo-KE': {
      label: 'Dholuo', speechLocale: 'luo-KE', review: true,
      labels: { assistantTitle: 'Kony mar BankingGo', assistantKind: 'Japuonj mar tem', assistantIntro: 'Ber! Penj ku pesa ma in-go, budget kata pesa ma ikano.', suggestSave: 'Ere kaka anakane pesa?', suggestBudget: 'Asetiyo gi pesa mang’eny?', suggestHelp: 'Kony na gi budget', speakReplies: 'Wachuru dwoko gi duol', voiceButton: 'Wach', stopVoiceButton: 'Ne mondo', sendButton: 'Or' },
      keywords: { save: ['kano', 'pesa', 'kano pesa'], budget: ['budget', 'tiyo', 'tiyo gi pesa'], balance: ['pesa', 'chung'], help: ['kony', 'kony na'] },
      replies: { intro: 'Ber! Penj ku pesa ma in-go, budget kata pesa ma ikano.', save: 'Isekan {saved}. Gik ma idwaro kano en {goal}. Kano pesa kende ma inyalo.', budget: 'Isetiyo gi {spent} ku budget mar {limit}. Pesa ma osigaki en {remaining}.', balance: 'Pochi mar tem ni nigi {balance}. Ma ok en balance mar bank matin.', help: 'Anayal tiyo ni mondo anyis ni budget, tiyo gi pesa, kod kano pesa. Ok anyal donjo e bank kata oro pesa matin.' }
    },
    'ki-KE': {
      label: 'Kikuyu (Gikuyu)', speechLocale: 'ki-KE', review: true,
      labels: { assistantTitle: 'Ũteithio wa BankingGo', assistantKind: 'Mũteithia wa majaribio', assistantIntro: 'Nĩ wega! Ũria ũhoro wa mbeca ciaku, bajeti kana iria ũigĩte.', suggestSave: 'Nĩndĩigĩra atĩa?', suggestBudget: 'Nĩndĩrĩa mbeca nyingĩ?', suggestHelp: 'Ndeithia na bajeti', speakReplies: 'Thoma macookio na mũgambo', voiceButton: 'uga', stopVoiceButton: 'Rekeria gũthikĩrĩria', sendButton: 'Tũma' },
      keywords: { save: ['iga', 'igĩte', 'mbeca'], budget: ['bajeti', 'matumĩri', 'rĩa'], balance: ['mbeca'], help: ['ũteithio', 'ndeithia'] },
      replies: { intro: 'Nĩ wega! Ũria ũhoro wa mbeca ciaku, bajeti kana iria ũigĩte.', save: 'Wĩ na {saved} iria ũigĩte. Gĩtĩo gĩaku nĩ {goal}. Iga mbeca iria ũrĩ na hinya wa kũiga.', budget: 'Nĩwatumia {spent} kuuma bajeti ya {limit}. Wĩ na {remaining} itigĩte.', balance: 'Pochi ya majaribio ĩrĩ na {balance}. Gũtiĩ salio rĩa banki ya maithe.', help: 'Nĩngũcookeria ũhoro wa salio, matumĩri, bajeti na gĩtĩo gĩa kũiga. Ndĩtingĩhota gũtoonya banki kana gũtũma mbeca cia ma.' }
    },
    'kam-KE': {
      label: 'Kikamba (Kamba)', speechLocale: 'kam-KE', review: true,
      labels: { assistantTitle: 'Ũteithio wa BankingGo', assistantKind: 'Mũteithia wa majaribio', assistantIntro: 'Ũvoo wĩ mũseo! Ũria ũhoro wa mbesa, bajeti kana mbesa sya kũthooa.', suggestSave: 'Nĩngĩthooa atĩa?', suggestBudget: 'Nĩndĩtumie mbesa mbingi?', suggestHelp: 'Ũteithio na bajeti', speakReplies: 'Soma macookio na ndeto', voiceButton: 'Ũa', stopVoiceButton: 'Reka kwĩthĩkĩĩa', sendButton: 'Tũma' },
      keywords: { save: ['thooa', 'mbesa', 'kĩthĩo'], budget: ['bajeti', 'utumĩ', 'tumie'], balance: ['mbesa'], help: ['ũteithio'] },
      replies: { intro: 'Ũvoo wĩ mũseo! Ũria ũhoro wa mbesa, bajeti kana mbesa sya kũthooa.', save: 'Wĩ na {saved} sya kũthooa. Kĩthĩo kyaku nĩ {goal}. Thooa mbesa ila wĩ na hinya wa kũthooa.', budget: 'Watumie {spent} ya bajeti ya {limit}. Wĩ na {remaining} itigĩte.', balance: 'Wallet ya majaribio yaku yĩ na {balance}. Ĩno ti mbesa sya banki ya ma.', help: 'Nĩngũkũelezea mbesa, utumĩ, bajeti na kĩthĩo kya kũthooa. Ndĩtingĩingĩa banki kana kutuma mbesa sya ma.' }
    },
    'guz-KE': {
      label: 'Ekegusii (Kisii)', speechLocale: 'guz-KE', review: true,
      labels: { assistantTitle: 'Obotari bwa BankingGo', assistantKind: 'Omotari owa demo', assistantIntro: 'Bwakire! Buya amaswali ase chintere chiago, bajeti, nabo obobeka.', suggestSave: 'Ninabeka nte?', suggestBudget: 'Nintumia chintere mingi?', suggestHelp: 'Ndeitwe na bajeti', speakReplies: 'Soma amayorego na ririmi', voiceButton: 'Rogera', stopVoiceButton: 'Kora okorora', sendButton: 'Tuma' },
      keywords: { save: ['beka', 'chintere', 'omogano'], budget: ['bajeti', 'bandisa', 'obobandisa'], balance: ['chintere'], help: ['obotari', 'ndeitwe'] },
      replies: { intro: 'Bwakire! Buya amaswali ase chintere chiago, bajeti, nabo obobeka.', save: 'Oine {saved} chiasigete. Omogano gwao nigo {goal}. Beka chintere chia obwoki bwao bwango.', budget: 'Obandisite {spent} ase bajeti ya {limit}. Otigete na {remaining}.', balance: 'Wallet yago ya demo eine {balance}. Eki tari balance ya banki yama.', help: 'Ningokorocheeria ebiro ase balance, obobandisa, bajeti na omogano gwa obobeka. Tinginaigo kunyora banki nabo kochera chintere chia ma.' }
    }
  };

  const accessibilityLabels = {
    en: { readScreen: 'Read screen', stopReading: 'Stop reading', globalHelp: 'BankingGo help', voicePrivacy: 'Speech recognition may be processed by your browser provider. Do not speak PINs, passwords, or account numbers.' },
    sw: { readScreen: 'Soma skrini', stopReading: 'Simamisha kusoma', globalHelp: 'Msaada wa BankingGo', voicePrivacy: 'Sauti inaweza kuchakatwa na huduma ya kivinjari. Usitamke PIN, nenosiri au namba ya akaunti.' },
    yo: { readScreen: 'Ka oju-iwe soke', stopReading: 'Dá kika duro', globalHelp: 'Iranlọwọ BankingGo', voicePrivacy: 'Iṣẹ aṣawakiri le gba ohun rẹ. Ma sọ PIN, ọrọ aṣiri, tabi nọmba akọọlẹ rẹ.' },
    lg: { readScreen: 'Soma olupapula', stopReading: 'Komya okusoma', globalHelp: 'Obuyambi bwa BankingGo', voicePrivacy: 'Eddoboozi liyinza okukozesebwa browser. Toyogera PIN, password oba namba ya akaawunti.' },
    'zh-CN': { readScreen: '朗读页面', stopReading: '停止朗读', globalHelp: 'BankingGo 帮助', voicePrivacy: '语音识别可能由浏览器服务处理。请勿说出 PIN、密码或账号。' },
    'fr-FR': { readScreen: 'Lire l’écran', stopReading: 'Arrêter la lecture', globalHelp: 'Aide BankingGo', voicePrivacy: 'La reconnaissance vocale peut être traitée par votre navigateur. Ne dites pas votre code PIN, mot de passe ou numéro de compte.' },
    'luo-KE': { readScreen: 'Som skrin', stopReading: 'Ne somo', globalHelp: 'Kony mar BankingGo', voicePrivacy: 'Browser nyalo tiyo gi duolni. Kik iwach PIN, password kata namba mar account.' },
    'ki-KE': { readScreen: 'Thoma ukurasa', stopReading: 'Rekeria gũthoma', globalHelp: 'Ũteithio wa BankingGo', voicePrivacy: 'Browser no ngĩhota gũtumia mũgambo waku. Ndũgĩaria PIN, password kana namba ya akaũnti.' },
    'kam-KE': { readScreen: 'Soma ukurasa', stopReading: 'Reka kusoma', globalHelp: 'Ũteithio wa BankingGo', voicePrivacy: 'Browser ĩngĩtumia ndeto syaku. Ndũgĩaria PIN, password kana namba ya akaunti.' },
    'guz-KE': { readScreen: 'Soma olupapula', stopReading: 'Kora okusoma', globalHelp: 'Obotari bwa BankingGo', voicePrivacy: 'Browser nyare korega ririmi riago. Tiga kwogera PIN, password nabo namba ya akaunti.' }
  };
  Object.entries(accessibilityLabels).forEach(([language, labels]) => Object.assign(languageSupport[language].labels, labels));

  const currencyFormatters = Object.fromEntries(Object.entries({
    USD: ['en-US', 'USD'], KES: ['en-KE', 'KES'], JPY: ['ja-JP', 'JPY'], GBP: ['en-GB', 'GBP'], EUR: ['de-DE', 'EUR'],
    NGN: ['en-NG', 'NGN'], INR: ['en-IN', 'INR'], AED: ['en-AE', 'AED'], CAD: ['en-CA', 'CAD'], ZAR: ['en-ZA', 'ZAR']
  }).map(([code, [locale, currency]]) => [code, new Intl.NumberFormat(locale, { style: 'currency', currency, ...(currency === 'JPY' ? { maximumFractionDigits: 0 } : {}) })]));

  const state = { userName: '', phone: '', balance: 0, monthlyLimit: 0, spent: 0, savingsBalance: 0, savingsGoal: 0, currency: 'USD', language: 'en', transactions: [] };
  let storedAccount = loadStoredAccount();
  let activeRecognition = null;

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
    const dictionary = { ...translations.en, ...(translations[state.language] || {}) };

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
    state.language = languageSupport[language] ? language : 'en';
    const pack = languageSupport[state.language];
    const dictionary = { ...translations.en, ...(translations[state.language] || {}), ...pack.labels };
    document.documentElement.lang = state.language.split('-')[0];
    document.querySelectorAll('[data-key]').forEach((node) => {
      if (dictionary[node.dataset.key]) node.textContent = dictionary[node.dataset.key];
    });
    elements.languageSelect.value = state.language;
    elements.languageOnboard.value = state.language;
    elements.aiInput.placeholder = dictionary.quickHelp;
    elements.languageReviewNote.classList.toggle('hidden', !pack.review);
    elements.languageReviewNote.textContent = pack.review
      ? `${pack.label} is a draft translation. Please have fluent community speakers review it before using it for financial decisions.`
      : '';
    if (state.userName) {
      persistAccount();
      updateDashboard();
    }
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

  function detectHelpIntent(prompt) {
    const question = prompt.toLocaleLowerCase();
    const terms = languageSupport[state.language].keywords;
    return Object.entries(terms).find(([, phrases]) => phrases.some((phrase) => question.includes(phrase)))?.[0] || 'help';
  }

  function respondToHelp(prompt, selectedIntent) {
    const pack = languageSupport[state.language];
    const intent = selectedIntent || detectHelpIntent(prompt);
    const template = pack.replies[intent] || pack.replies.help;
    const values = {
      saved: formatCurrency(state.savingsBalance),
      goal: formatCurrency(state.savingsGoal),
      spent: formatCurrency(state.spent),
      limit: formatCurrency(state.monthlyLimit),
      remaining: formatCurrency(Math.max(0, state.monthlyLimit - state.spent)),
      balance: formatCurrency(state.balance)
    };
    return template.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
  }

  function speakText(text) {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      elements.speechStatus.textContent = 'This browser does not support spoken audio. Use your device screen reader.';
      return;
    }
    const { speechLocale, label } = languageSupport[state.language];
    const voice = window.speechSynthesis.getVoices().find((candidate) => candidate.lang.toLowerCase().startsWith(speechLocale.toLowerCase()));
    if (!voice) {
      elements.speechStatus.textContent = `No installed voice for ${label}. Install a device voice or use its screen reader.`;
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voice.lang;
    utterance.voice = voice;
    utterance.onend = () => { elements.stopReading.disabled = true; };
    utterance.onerror = () => {
      elements.stopReading.disabled = true;
      elements.speechStatus.textContent = 'Audio could not play. Try your device screen reader.';
    };
    window.speechSynthesis.speak(utterance);
    elements.stopReading.disabled = false;
    elements.speechStatus.textContent = `Reading in ${label}.`;
  }

  function sendAiMessage(text, selectedIntent) {
    const message = text.trim();
    if (!message) return;
    addChatMessage(message, 'user');
    const reply = respondToHelp(message, selectedIntent);
    addChatMessage(reply, 'bot');
    elements.aiInput.value = '';
    if (elements.speakReplies.checked) speakText(reply);
  }

  document.getElementById('create-mode').addEventListener('click', () => setAuthMode('create'));
  document.getElementById('login-mode').addEventListener('click', () => setAuthMode('login'));
  elements.languageSelect.addEventListener('change', (event) => applyLanguage(event.target.value));
  elements.languageOnboard.addEventListener('change', (event) => applyLanguage(event.target.value));
  document.querySelectorAll('.nav-item[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (!elements.dashboardScreen.classList.contains('active')) {
        event.preventDefault();
        elements.navStatus.textContent = storedAccount
          ? 'Sign in to open your wallet, savings, budget, and help.'
          : 'Create an account first to open your wallet, savings, budget, and help.';
        setAuthMode(storedAccount ? 'login' : 'create');
        elements.authScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      document.querySelectorAll('.nav-item').forEach((item) => {
        const isCurrent = item === link;
        item.classList.toggle('active', isCurrent);
        if (isCurrent) item.setAttribute('aria-current', 'page');
        else item.removeAttribute('aria-current');
      });
      elements.navStatus.textContent = '';
    });
  });
  document.getElementById('help-btn').addEventListener('click', () => {
    if (elements.dashboardScreen.classList.contains('active')) elements.aiInput.focus();
    else setAuthMode(storedAccount ? 'login' : 'create');
  });

  function startVoiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      elements.speechStatus.textContent = 'Voice input is not supported in this browser. Type your question instead.';
      elements.aiInput.focus();
      return;
    }
    if (activeRecognition) {
      activeRecognition.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = languageSupport[state.language].speechLocale;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => {
      elements.voiceInput.classList.add('listening');
      elements.voiceInput.setAttribute('aria-pressed', 'true');
      elements.voiceInput.textContent = languageSupport[state.language].labels.stopVoiceButton;
      elements.speechStatus.textContent = `Listening in ${languageSupport[state.language].label}. Tap again to stop.`;
    };
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim();
      if (transcript) {
        elements.aiInput.value = transcript;
        sendAiMessage(transcript);
      } else {
        elements.speechStatus.textContent = 'I did not catch that. Try again or type your question.';
      }
    };
    recognition.onerror = (event) => {
      const message = event.error === 'not-allowed'
        ? 'Microphone permission was denied. You can still type your question.'
        : event.error === 'no-speech'
          ? 'No speech was detected. Try again or type your question.'
          : 'Voice input is unavailable right now. Type your question instead.';
      elements.speechStatus.textContent = message;
    };
    recognition.onend = () => {
      activeRecognition = null;
      elements.voiceInput.classList.remove('listening');
      elements.voiceInput.setAttribute('aria-pressed', 'false');
      elements.voiceInput.textContent = languageSupport[state.language].labels.voiceButton;
    };
    activeRecognition = recognition;
    elements.voiceInput.classList.add('listening');
    elements.voiceInput.setAttribute('aria-pressed', 'true');
    elements.voiceInput.textContent = languageSupport[state.language].labels.stopVoiceButton;
    elements.speechStatus.textContent = `Requesting microphone in ${languageSupport[state.language].label}.`;
    try {
      recognition.start();
    } catch {
      activeRecognition = null;
      elements.voiceInput.classList.remove('listening');
      elements.voiceInput.setAttribute('aria-pressed', 'false');
      elements.voiceInput.textContent = languageSupport[state.language].labels.voiceButton;
      elements.speechStatus.textContent = 'Could not start voice input. Type your question instead.';
    }
  }

  elements.readScreen.addEventListener('click', () => {
    const activeScreen = document.querySelector('.screen.active');
    const text = activeScreen?.innerText.trim().slice(0, 5000);
    if (!text) return;
    speakText(text);
  });
  elements.stopReading.addEventListener('click', () => {
    window.speechSynthesis?.cancel();
    elements.stopReading.disabled = true;
    elements.speechStatus.textContent = 'Reading stopped.';
  });
  elements.voiceInput.addEventListener('click', startVoiceInput);
  document.getElementById('ai-send').addEventListener('click', () => sendAiMessage(elements.aiInput.value));
  elements.aiInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') sendAiMessage(elements.aiInput.value);
  });
  document.querySelectorAll('.suggestion-btn').forEach((button) => button.addEventListener('click', () => sendAiMessage(button.textContent, button.dataset.intent)));

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