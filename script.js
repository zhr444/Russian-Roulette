/**
 * Русская Рулетка — Классический 6-зарядный револьвер
 * Чистый ES6+ JavaScript с поддержкой i18n, тем, Web Audio API и localStorage
 */

const STORAGE_KEYS = {
  THEME: 'rr_theme_v1',
  LANG: 'rr_lang_v1',
  SOUND: 'rr_sound_v1',
  STATS: 'rr_stats_v1'
};

// Словарь локализации (RU, EN, KK, ES, DE)
const I18N = {
  ru: {
    locale: 'ru-RU',
    appTitle: 'Русская Рулетка',
    appSubtitle: 'Классический 6-зарядный револьвер',
    soundOn: 'Звук: Вкл',
    soundOff: 'Звук: Выкл',
    themeDark: 'Тёмная',
    themeLight: 'Светлая',
    langLabel: 'Язык',
    settingsTitle: 'Параметры игры',
    gameModeLabel: 'Режим игры',
    modeSolo: 'Одиночный (На выживание)',
    modeBot: 'Против Дилера (ИИ)',
    modePvp: '2 Игрока (На одном экране)',
    bulletsCountLabel: 'Боевых патронов в барабане',
    riskLabel: 'Риск выстрела сейчас',
    chambersLeft: (n) => `Непроверенных камор: ${n} из 6`,
    statsTitle: 'Статистика',
    resetStats: 'Сбросить',
    statSurvived: 'Успешных ходов',
    statLosses: 'Поражений',
    statStreak: 'Текущая серия',
    statBest: 'Рекорд серии',
    firingPin: 'БОЁК',
    turnSolo: 'Ваш ход',
    turnPlayer: 'Ход Игрока',
    turnBot: 'Ход Дилера (ИИ)...',
    turnP1: 'Ход Игрока 1',
    turnP2: 'Ход Игрока 2',
    statusReadyTitle: 'Барабан заряжен и прокручен',
    statusReadyDesc: 'Крутите барабан снова или спускайте курок.',
    statusSpinTitle: 'Барабан прокручен!',
    statusSpinDesc: 'Позиция камор случайна. Решайтесь на выстрел.',
    statusClickTitle: 'Щелчок! Камора пуста',
    statusClickDesc: (slot) => `Камора №${slot} оказалась холостой. Вы выжили!`,
    statusBoomTitle: 'ВЫСТРЕЛ! Боевой патрон',
    statusBoomDesc: (slot, who) => `В каморе №${slot} был боевой патрон. ${who} проиграл раунд!`,
    statusClearTitle: 'Все холостые каморы пройдены!',
    statusClearDesc: 'Вы обошли все боевые патроны! Нажмите «Новая партия».',
    btnSpin: 'Крутить барабан',
    btnTrigger: 'Спустить курок',
    btnReload: 'Новая партия',
    logTitle: 'Журнал событий',
    clearLog: 'Очистить',
    legendUnknown: 'Неизвестно',
    legendEmpty: 'Холостой (Щелчок)',
    legendLive: 'Боевой патрон',
    actorYou: 'Вы',
    actorBot: 'Дилер (ИИ)',
    actorP1: 'Игрок 1',
    actorP2: 'Игрок 2',
    logNewGame: (b) => `Новая партия начата. Боевых патронов: ${b}/6.`,
    logSpin: (who) => `${who}: барабан прокручен.`,
    logSafe: (who, slot) => `${who}: камора №${slot} — холостой щелчок.`,
    logBoom: (who, slot) => `${who}: камора №${slot} — ВЫСТРЕЛ!`
  },
  en: {
    locale: 'en-US',
    appTitle: 'Russian Roulette',
    appSubtitle: 'Classic 6-Chamber Revolver',
    soundOn: 'Sound: On',
    soundOff: 'Sound: Off',
    themeDark: 'Dark',
    themeLight: 'Light',
    langLabel: 'Language',
    settingsTitle: 'Game Settings',
    gameModeLabel: 'Game Mode',
    modeSolo: 'Solo (Survival Streak)',
    modeBot: 'vs Dealer (AI Bot)',
    modePvp: '2 Players (Pass & Play)',
    bulletsCountLabel: 'Live Bullets in Cylinder',
    riskLabel: 'Current Shot Risk',
    chambersLeft: (n) => `Unchecked chambers: ${n} of 6`,
    statsTitle: 'Statistics',
    resetStats: 'Reset',
    statSurvived: 'Safe Pulls',
    statLosses: 'Losses',
    statStreak: 'Current Streak',
    statBest: 'Best Streak',
    firingPin: 'FIRING PIN',
    turnSolo: 'Your Turn',
    turnPlayer: 'Your Turn',
    turnBot: 'Dealer (AI) is thinking...',
    turnP1: 'Player 1 Turn',
    turnP2: 'Player 2 Turn',
    statusReadyTitle: 'Cylinder Loaded & Spun',
    statusReadyDesc: 'Spin the cylinder again or pull the trigger.',
    statusSpinTitle: 'Cylinder Spun!',
    statusSpinDesc: 'Chamber position randomized. Take your shot.',
    statusClickTitle: 'Click! Empty Chamber',
    statusClickDesc: (slot) => `Chamber #${slot} was empty. You survived!`,
    statusBoomTitle: 'BANG! Live Round Fired',
    statusBoomDesc: (slot, who) => `Chamber #${slot} had a live bullet. ${who} lost the round!`,
    statusClearTitle: 'All Safe Chambers Cleared!',
    statusClearDesc: 'You dodged every live bullet! Click "New Round".',
    btnSpin: 'Spin Cylinder',
    btnTrigger: 'Pull Trigger',
    btnReload: 'New Round',
    logTitle: 'Action Log',
    clearLog: 'Clear',
    legendUnknown: 'Unknown',
    legendEmpty: 'Empty (Click)',
    legendLive: 'Live Bullet',
    actorYou: 'You',
    actorBot: 'Dealer (AI)',
    actorP1: 'Player 1',
    actorP2: 'Player 2',
    logNewGame: (b) => `New round started. Live bullets: ${b}/6.`,
    logSpin: (who) => `${who} spun the cylinder.`,
    logSafe: (who, slot) => `${who}: chamber #${slot} — dry click (safe).`,
    logBoom: (who, slot) => `${who}: chamber #${slot} — BANG!`
  },
  kk: {
    locale: 'kk-KZ',
    appTitle: 'Орыс Рулеткасы',
    appSubtitle: 'Классикалық 6 оқтық револьвер',
    soundOn: 'Дыбыс: Қосулы',
    soundOff: 'Дыбыс: Өшірулі',
    themeDark: 'Қараңғы',
    themeLight: 'Жарық',
    langLabel: 'Тіл',
    settingsTitle: 'Ойын баптаулары',
    gameModeLabel: 'Ойын режимі',
    modeSolo: 'Жеке (Тірі қалу сериясы)',
    modeBot: 'Дилерге қарсы (ЖИ)',
    modePvp: '2 Ойыншы (Бір экранда)',
    bulletsCountLabel: 'Барабандағы оқ саны',
    riskLabel: 'Атылу қаупі',
    chambersLeft: (n) => `Тексерілмеген ұяшық: 6-дан ${n}`,
    statsTitle: 'Статистика',
    resetStats: 'Тазалау',
    statSurvived: 'Сәтті жүріс',
    statLosses: 'Жеңіліс',
    statStreak: 'Ағымдағы серия',
    statBest: 'Үздік рекорд',
    firingPin: 'СОҚҚЫШ',
    turnSolo: 'Сіздің кезегіңіз',
    turnPlayer: 'Сіздің кезегіңіз',
    turnBot: 'Дилердің (ЖИ) кезегі...',
    turnP1: '1-ойыншының кезегі',
    turnP2: '2-ойыншының кезегі',
    statusReadyTitle: 'Барабан оқталды',
    statusReadyDesc: 'Барабанды айналдырыңыз немесе шүріппені басыңыз.',
    statusSpinTitle: 'Барабан айналдырылды!',
    statusSpinDesc: 'Ұяшық орны кездейсоқ таңдалды.',
    statusClickTitle: 'Сырт! Ұяшық бос',
    statusClickDesc: (slot) => `№${slot} ұяшық бос шықты. Сіз аман қалдыңыз!`,
    statusBoomTitle: 'АТЫС! Нағыз оқ',
    statusBoomDesc: (slot, who) => `№${slot} ұяшықта оқ болды. ${who} ұтылды!`,
    statusClearTitle: 'Барлық бос ұяшықтар ашылды!',
    statusClearDesc: 'Сіз барлық оқтан аман өттіңіз! «Жаңа партия» басыңыз.',
    btnSpin: 'Барабанды айналдыру',
    btnTrigger: 'Шүріппені басу',
    btnReload: 'Жаңа партия',
    logTitle: 'Оқиғалар журналы',
    clearLog: 'Тазалау',
    legendUnknown: 'Белгісіз',
    legendEmpty: 'Бос (Сырт)',
    legendLive: 'Оқ бар',
    actorYou: 'Сіз',
    actorBot: 'Дилер (ЖИ)',
    actorP1: '1-ойыншы',
    actorP2: '2-ойыншы',
    logNewGame: (b) => `Жаңа ойын басталды. Оқ саны: ${b}/6.`,
    logSpin: (who) => `${who} барабанды айналдырды.`,
    logSafe: (who, slot) => `${who}: №${slot} ұяшық — бос сырт етті.`,
    logBoom: (who, slot) => `${who}: №${slot} ұяшық — АТЫС!`
  },
  es: {
    locale: 'es-ES',
    appTitle: 'Ruleta Rusa',
    appSubtitle: 'Revólver clásico de 6 recámaras',
    soundOn: 'Sonido: Sí',
    soundOff: 'Sonido: No',
    themeDark: 'Oscuro',
    themeLight: 'Claro',
    langLabel: 'Idioma',
    settingsTitle: 'Ajustes del Juego',
    gameModeLabel: 'Modo de juego',
    modeSolo: 'Solitario (Supervivencia)',
    modeBot: 'Contra el Crupier (IA)',
    modePvp: '2 Jugadores (Mismo dispositivo)',
    bulletsCountLabel: 'Balas reales en el tambor',
    riskLabel: 'Riesgo de disparo actual',
    chambersLeft: (n) => `Recámaras restantes: ${n} de 6`,
    statsTitle: 'Estadísticas',
    resetStats: 'Reiniciar',
    statSurvived: 'Turnos a salvo',
    statLosses: 'Derrotas',
    statStreak: 'Racha actual',
    statBest: 'Mejor racha',
    firingPin: 'PERCUTOR',
    turnSolo: 'Tu turno',
    turnPlayer: 'Tu turno',
    turnBot: 'Turno del Crupier (IA)...',
    turnP1: 'Turno del Jugador 1',
    turnP2: 'Turno del Jugador 2',
    statusReadyTitle: 'Tambor cargado y girado',
    statusReadyDesc: 'Gira el tambor de nuevo o aprieta el gatillo.',
    statusSpinTitle: '¡Tambor girado!',
    statusSpinDesc: 'Posición aleatoria. Toma tu decisión.',
    statusClickTitle: '¡Clic! Recámara vacía',
    statusClickDesc: (slot) => `La recámara #${slot} estaba vacía. ¡Sobreviviste!`,
    statusBoomTitle: '¡BANG! Bala real disparada',
    statusBoomDesc: (slot, who) => `La recámara #${slot} tenía una bala. ¡${who} perdió la ronda!`,
    statusClearTitle: '¡Todas las recámaras vacías superadas!',
    statusClearDesc: '¡Esquivaste todas las balas! Pulsa «Nueva ronda».',
    btnSpin: 'Girar tambor',
    btnTrigger: 'Apretar gatillo',
    btnReload: 'Nueva ronda',
    logTitle: 'Registro de eventos',
    clearLog: 'Limpiar',
    legendUnknown: 'Desconocido',
    legendEmpty: 'Vacía (Clic)',
    legendLive: 'Bala real',
    actorYou: 'Tú',
    actorBot: 'Crupier (IA)',
    actorP1: 'Jugador 1',
    actorP2: 'Jugador 2',
    logNewGame: (b) => `Nueva ronda iniciada. Balas: ${b}/6.`,
    logSpin: (who) => `${who} giró el tambor.`,
    logSafe: (who, slot) => `${who}: recámara #${slot} — clic sin disparo.`,
    logBoom: (who, slot) => `${who}: recámara #${slot} — ¡DISPARO!`
  },
  de: {
    locale: 'de-DE',
    appTitle: 'Russisches Roulette',
    appSubtitle: 'Klassischer 6-Kammer-Revolver',
    soundOn: 'Ton: Ein',
    soundOff: 'Ton: Aus',
    themeDark: 'Dunkel',
    themeLight: 'Hell',
    langLabel: 'Sprache',
    settingsTitle: 'Spieleinstellungen',
    gameModeLabel: 'Spielmodus',
    modeSolo: 'Solo (Überlebensserie)',
    modeBot: 'Gegen den Dealer (KI)',
    modePvp: '2 Spieler (Ein Bildschirm)',
    bulletsCountLabel: 'Scharfe Patronen in der Trommel',
    riskLabel: 'Aktuelles Schussrisiko',
    chambersLeft: (n) => `Ungeprüfte Kammern: ${n} von 6`,
    statsTitle: 'Statistiken',
    resetStats: 'Zurücksetzen',
    statSurvived: 'Überlebt',
    statLosses: 'Niederlagen',
    statStreak: 'Aktuelle Serie',
    statBest: 'Beste Serie',
    firingPin: 'SCHLAGBOLZEN',
    turnSolo: 'Du bist dran',
    turnPlayer: 'Du bist dran',
    turnBot: 'Dealer (KI) ist am Zug...',
    turnP1: 'Spieler 1 ist dran',
    turnP2: 'Spieler 2 ist dran',
    statusReadyTitle: 'Trommel geladen & gedreht',
    statusReadyDesc: 'Drehe die Trommel erneut oder drücke ab.',
    statusSpinTitle: 'Trommel gedreht!',
    statusSpinDesc: 'Kammerposition zufällig gewählt.',
    statusClickTitle: 'Klick! Leere Kammer',
    statusClickDesc: (slot) => `Kammer #${slot} war leer. Du hast überlebt!`,
    statusBoomTitle: 'PENG! Scharfe Patrone',
    statusBoomDesc: (slot, who) => `Kammer #${slot} war geladen. ${who} hat verloren!`,
    statusClearTitle: 'Alle leeren Kammern überstanden!',
    statusClearDesc: 'Du hast jede Kugel überlebt! Klicke auf „Neue Runde“.',
    btnSpin: 'Trommel drehen',
    btnTrigger: 'Abdrücken',
    btnReload: 'Neue Runde',
    logTitle: 'Ereignisprotokoll',
    clearLog: 'Leeren',
    legendUnknown: 'Unbekannt',
    legendEmpty: 'Leer (Klick)',
    legendLive: 'Scharfe Patrone',
    actorYou: 'Du',
    actorBot: 'Dealer (KI)',
    actorP1: 'Spieler 1',
    actorP2: 'Spieler 2',
    logNewGame: (b) => `Neue Runde gestartet. Patronen: ${b}/6.`,
    logSpin: (who) => `${who} hat die Trommel gedreht.`,
    logSafe: (who, slot) => `${who}: Kammer #${slot} — leeres Klicken.`,
    logBoom: (who, slot) => `${who}: Kammer #${slot} — PENG!`
  }
};

/* ==========================================================================
   Синтезатор звуковых эффектов на базе Web Audio API (без внешних файлов)
   ========================================================================== */
class SoundEngine {
  constructor(enabled = true) {
    this.enabled = enabled;
    this.ctx = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Щелчок при вращении барабана (серия металлических кликов)
  playSpin() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const clicks = 8;
    for (let i = 0; i < clicks; i++) {
      const delay = i * 0.055 + i * i * 0.003;
      this.triggerMetallicClick(delay, 900 - i * 40, 0.035);
    }
  }

  // Холостой щелчок бойка
  playEmptyClick() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    this.triggerMetallicClick(0, 1350, 0.06);
    this.triggerMetallicClick(0.03, 620, 0.05);
  }

  // Вспомогательный металлический импульс
  triggerMetallicClick(offsetSec, freq, duration) {
    const now = this.ctx.currentTime + offsetSec;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + duration);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  // Выстрел (взрывной белый шум + низкочастотный удар)
  playGunshot() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const duration = 0.55;

    // 1. Шумовой импульс
    const bufferSize = this.ctx.sampleRate * duration;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.12));
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, now);
    filter.frequency.exponentialRampToValueAtTime(180, now + duration);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.9, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    whiteNoise.start(now);

    // 2. Низкочастотный удар
    const punchOsc = this.ctx.createOscillator();
    const punchGain = this.ctx.createGain();
    punchOsc.type = 'sine';
    punchOsc.frequency.setValueAtTime(160, now);
    punchOsc.frequency.exponentialRampToValueAtTime(28, now + 0.35);

    punchGain.gain.setValueAtTime(0.85, now);
    punchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    punchOsc.connect(punchGain);
    punchGain.connect(this.ctx.destination);
    punchOsc.start(now);
    punchOsc.stop(now + 0.35);
  }
}

/* ==========================================================================
   Состояние приложения и инициализация
   ========================================================================== */
const state = {
  lang: localStorage.getItem(STORAGE_KEYS.LANG) || 'ru',
  theme: localStorage.getItem(STORAGE_KEYS.THEME) || 'dark',
  soundOn: localStorage.getItem(STORAGE_KEYS.SOUND) !== 'false',
  mode: 'solo', // 'solo' | 'bot' | 'pvp'
  bulletCount: 1,
  chambers: [false, false, false, false, false, false], // true = боевой патрон
  checkedChambers: [false, false, false, false, false, false],
  currentIndex: 0, // Камора под бойком (0..5)
  visualAngle: 0, // Накопленный угол вращения колеса в градусах
  isGameOver: false,
  isBusy: false,
  currentTurn: 'player1', // 'player1' | 'player2' | 'bot'
  stats: loadStats()
};

function loadStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        survived: Number(parsed.survived) || 0,
        deaths: Number(parsed.deaths) || 0,
        streak: Number(parsed.streak) || 0,
        best: Number(parsed.best) || 0
      };
    }
  } catch (e) {
    console.warn('localStorage stats error:', e);
  }
  return { survived: 0, deaths: 0, streak: 0, best: 0 };
}

function saveStats() {
  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(state.stats));
  renderStats();
}

const sound = new SoundEngine(state.soundOn);

// Ссылки на DOM-элементы
const els = {
  clockTime: document.getElementById('clockTime'),
  clockDate: document.getElementById('clockDate'),
  soundToggleBtn: document.getElementById('soundToggleBtn'),
  soundIcon: document.getElementById('soundIcon'),
  soundLabel: document.getElementById('soundLabel'),
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  themeIcon: document.getElementById('themeIcon'),
  themeLabel: document.getElementById('themeLabel'),
  langSelect: document.getElementById('langSelect'),
  modeSelect: document.getElementById('modeSelect'),
  bulletSelector: document.getElementById('bulletSelector'),
  bulletCountValue: document.getElementById('bulletCountValue'),
  riskPercent: document.getElementById('riskPercent'),
  riskBarFill: document.getElementById('riskBarFill'),
  chambersRemainingText: document.getElementById('chambersRemainingText'),
  statSurvived: document.getElementById('statSurvived'),
  statDeaths: document.getElementById('statDeaths'),
  statStreak: document.getElementById('statStreak'),
  statBest: document.getElementById('statBest'),
  resetStatsBtn: document.getElementById('resetStatsBtn'),
  stagePanel: document.getElementById('stagePanel'),
  turnText: document.getElementById('turnText'),
  cylinderWheel: document.getElementById('cylinderWheel'),
  chambers: Array.from(document.querySelectorAll('.chamber')),
  statusBox: document.getElementById('statusBox'),
  statusTitle: document.getElementById('statusTitle'),
  statusDesc: document.getElementById('statusDesc'),
  spinBtn: document.getElementById('spinBtn'),
  triggerBtn: document.getElementById('triggerBtn'),
  reloadBtn: document.getElementById('reloadBtn'),
  logList: document.getElementById('logList'),
  clearLogBtn: document.getElementById('clearLogBtn'),
  flashOverlay: document.getElementById('flashOverlay')
};

/* ==========================================================================
   Виджет реального времени и даты (адаптируется под язык интерфейса)
   ========================================================================== */
function updateClock() {
  const dict = I18N[state.lang] || I18N.ru;
  const now = new Date();

  const timeFormatter = new Intl.DateTimeFormat(dict.locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const dateFormatter = new Intl.DateTimeFormat(dict.locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  els.clockTime.textContent = timeFormatter.format(now);
  els.clockDate.textContent = dateFormatter.format(now);
}

/* ==========================================================================
   Тема и Локализация
   ========================================================================== */
function applyTheme(theme) {
  state.theme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  localStorage.setItem(STORAGE_KEYS.THEME, state.theme);
  updateHeaderControlsText();
}

function applySound(enabled) {
  state.soundOn = Boolean(enabled);
  sound.enabled = state.soundOn;
  localStorage.setItem(STORAGE_KEYS.SOUND, String(state.soundOn));
  updateHeaderControlsText();
}

function applyLanguage(lang) {
  if (!I18N[lang]) lang = 'ru';
  state.lang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem(STORAGE_KEYS.LANG, lang);
  els.langSelect.value = lang;

  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    if (dict[key] && typeof dict[key] === 'string') {
      node.textContent = dict[key];
    }
  });

  updateHeaderControlsText();
  updateClock();
  updateRiskMeter();
  updateTurnBanner();
}

function updateHeaderControlsText() {
  const dict = I18N[state.lang] || I18N.ru;
  els.soundIcon.textContent = state.soundOn ? '🔊' : '🔇';
  els.soundLabel.textContent = state.soundOn ? dict.soundOn : dict.soundOff;

  const isDark = state.theme === 'dark';
  els.themeIcon.textContent = isDark ? '🌙' : '☀️';
  els.themeLabel.textContent = isDark ? dict.themeDark : dict.themeLight;
}

/* ==========================================================================
   Игровая логика 6-зарядного револьвера
   ========================================================================== */
function initNewRound() {
  state.isGameOver = false;
  state.isBusy = false;
  state.currentTurn = 'player1';

  // Заполняем 6 камор боевыми патронами в случайных позициях
  const slots = [false, false, false, false, false, false];
  let placed = 0;
  while (placed < state.bulletCount) {
    const idx = Math.floor(Math.random() * 6);
    if (!slots[idx]) {
      slots[idx] = true;
      placed++;
    }
  }
  state.chambers = slots;
  state.checkedChambers = [false, false, false, false, false, false];

  // Выбираем случайную стартовую камору и вращаем барабан
  const randomSlot = Math.floor(Math.random() * 6);
  spinToChamber(randomSlot, 2);

  // Сбрасываем визуальные классы камор
  els.chambers.forEach((ch) => {
    ch.classList.remove('checked-empty', 'revealed-live', 'fired-boom');
  });

  const dict = I18N[state.lang];
  setStatus('neutral', dict.statusReadyTitle, dict.statusReadyDesc);
  updateButtonsState();
  updateRiskMeter();
  updateTurnBanner();
  addLogEntry('info', dict.logNewGame(state.bulletCount));
}

// Плавное вращение барабана так, чтобы камора targetIndex оказалась наверху (под бойком)
function spinToChamber(targetIndex, extraSpins = 2) {
  state.currentIndex = ((targetIndex % 6) + 6) % 6;
  const targetMod = (360 - state.currentIndex * 60) % 360;
  const currentMod = ((state.visualAngle % 360) + 360) % 360;
  let delta = targetMod - currentMod;
  if (delta <= 0) delta += 360;

  state.visualAngle += extraSpins * 360 + delta;
  els.cylinderWheel.style.transform = `rotate(${state.visualAngle}deg)`;
}

// Пошаговый поворот барабана на 1 камору (60 градусов)
function stepNextChamber() {
  state.currentIndex = (state.currentIndex + 1) % 6;
  state.visualAngle -= 60;
  els.cylinderWheel.style.transform = `rotate(${state.visualAngle}deg)`;
}

function getCurrentActorLabel() {
  const dict = I18N[state.lang];
  if (state.mode === 'solo') return dict.actorYou;
  if (state.mode === 'bot') {
    return state.currentTurn === 'bot' ? dict.actorBot : dict.actorYou;
  }
  return state.currentTurn === 'player1' ? dict.actorP1 : dict.actorP2;
}

// Действие: Прокрутить барабан
function handleSpinAction() {
  if (state.isGameOver || state.isBusy) return;
  state.isBusy = true;
  updateButtonsState();

  sound.playSpin();

  // При прокрутке сбрасываем отметки проверенных камор, так как позиция снова случайна
  state.checkedChambers = [false, false, false, false, false, false];
  els.chambers.forEach((ch) => ch.classList.remove('checked-empty'));

  const newSlot = Math.floor(Math.random() * 6);
  spinToChamber(newSlot, 3);

  const dict = I18N[state.lang];
  const actor = getCurrentActorLabel();

  setTimeout(() => {
    setStatus('neutral', dict.statusSpinTitle, dict.statusSpinDesc);
    addLogEntry('info', dict.logSpin(actor));
    updateRiskMeter();
    state.isBusy = false;
    updateButtonsState();
  }, 650);
}

// Действие: Спустить курок
function handleTriggerAction() {
  if (state.isGameOver || state.isBusy) return;
  state.isBusy = true;
  updateButtonsState();

  const firedSlotIndex = state.currentIndex;
  const firedSlotNumber = firedSlotIndex + 1;
  const isLive = state.chambers[firedSlotIndex];
  const dict = I18N[state.lang];
  const actor = getCurrentActorLabel();

  if (isLive) {
    // Выстрел боевым патроном!
    sound.playGunshot();
    triggerShotVisuals(firedSlotIndex);

    state.isGameOver = true;
    state.isBusy = false;

    if (state.currentTurn !== 'bot') {
      state.stats.deaths += 1;
      state.stats.streak = 0;
    } else {
      state.stats.survived += 1;
      state.stats.streak += 1;
      if (state.stats.streak > state.stats.best) {
        state.stats.best = state.stats.streak;
      }
    }
    saveStats();

    setStatus('boom', dict.statusBoomTitle, dict.statusBoomDesc(firedSlotNumber, actor));
    addLogEntry('boom', dict.logBoom(actor, firedSlotNumber));
    updateButtonsState();
  } else {
    // Холостой щелчок!
    sound.playEmptyClick();
    state.checkedChambers[firedSlotIndex] = true;
    els.chambers[firedSlotIndex].classList.add('checked-empty');

    if (state.currentTurn !== 'bot') {
      state.stats.survived += 1;
      state.stats.streak += 1;
      if (state.stats.streak > state.stats.best) {
        state.stats.best = state.stats.streak;
      }
      saveStats();
    }

    setStatus('safe', dict.statusClickTitle, dict.statusClickDesc(firedSlotNumber));
    addLogEntry('safe', dict.logSafe(actor, firedSlotNumber));

    // Проверяем, остались ли ещё холостые каморы
    const uncheckedEmptyLeft = state.chambers.some(
      (hasBullet, idx) => !hasBullet && !state.checkedChambers[idx]
    );

    if (!uncheckedEmptyLeft) {
      revealAllLiveChambers();
      state.isGameOver = true;
      state.isBusy = false;
      setStatus('safe', dict.statusClearTitle, dict.statusClearDesc);
      updateRiskMeter();
      updateButtonsState();
      return;
    }

    // Поворачиваем барабан к следующей каморе
    setTimeout(() => {
      stepNextChamber();
      updateRiskMeter();
      advanceTurn();
    }, 420);
  }
}

function advanceTurn() {
  if (state.mode === 'solo') {
    state.isBusy = false;
    updateTurnBanner();
    updateButtonsState();
    return;
  }

  if (state.mode === 'pvp') {
    state.currentTurn = state.currentTurn === 'player1' ? 'player2' : 'player1';
    state.isBusy = false;
    updateTurnBanner();
    updateButtonsState();
    return;
  }

  if (state.mode === 'bot') {
    if (state.currentTurn === 'player1') {
      state.currentTurn = 'bot';
      updateTurnBanner();
      updateButtonsState();

      // ИИ делает ход через небольшую паузу
      setTimeout(() => {
        if (state.isGameOver) return;
        const currentRisk = calculateCurrentRisk();
        if (currentRisk > 45 && Math.random() < 0.5) {
          sound.playSpin();
          state.checkedChambers = [false, false, false, false, false, false];
          els.chambers.forEach((ch) => ch.classList.remove('checked-empty'));
          spinToChamber(Math.floor(Math.random() * 6), 2);
          addLogEntry('info', I18N[state.lang].logSpin(getCurrentActorLabel()));
          updateRiskMeter();
          setTimeout(() => {
            state.isBusy = false;
            handleTriggerAction();
          }, 700);
        } else {
          state.isBusy = false;
          handleTriggerAction();
        }
      }, 950);
    } else {
      state.currentTurn = 'player1';
      state.isBusy = false;
      updateTurnBanner();
      updateButtonsState();
    }
  }
}

function triggerShotVisuals(firedIndex) {
  els.chambers[firedIndex].classList.add('fired-boom');
  revealAllLiveChambers(firedIndex);

  els.flashOverlay.classList.add('active');
  els.stagePanel.classList.remove('shake');
  void els.stagePanel.offsetWidth;
  els.stagePanel.classList.add('shake');

  setTimeout(() => {
    els.flashOverlay.classList.remove('active');
  }, 240);
}

function revealAllLiveChambers(excludeIndex = -1) {
  state.chambers.forEach((isLive, idx) => {
    if (isLive && idx !== excludeIndex) {
      els.chambers[idx].classList.add('revealed-live');
    }
  });
}

/* ==========================================================================
   Обновление интерфейса (Риск, Статистика, Статус, Лог)
   ========================================================================== */
function calculateCurrentRisk() {
  const uncheckedCount = state.checkedChambers.filter((c) => !c).length;
  if (uncheckedCount === 0) return 0;
  return (state.bulletCount / uncheckedCount) * 100;
}

function updateRiskMeter() {
  const dict = I18N[state.lang] || I18N.ru;
  const uncheckedCount = state.checkedChambers.filter((c) => !c).length;
  const risk = state.isGameOver ? 0 : calculateCurrentRisk();

  els.bulletCountValue.textContent = `${state.bulletCount} / 6`;
  els.riskPercent.textContent = `${risk.toFixed(1)}%`;
  els.riskBarFill.style.width = `${Math.min(100, risk)}%`;
  els.chambersRemainingText.textContent = dict.chambersLeft(uncheckedCount);
}

function updateTurnBanner() {
  const dict = I18N[state.lang] || I18N.ru;
  if (state.mode === 'solo') {
    els.turnText.textContent = dict.turnSolo;
  } else if (state.mode === 'bot') {
    els.turnText.textContent = state.currentTurn === 'bot' ? dict.turnBot : dict.turnPlayer;
  } else {
    els.turnText.textContent = state.currentTurn === 'player1' ? dict.turnP1 : dict.turnP2;
  }
}

function updateButtonsState() {
  const disableActions = state.isGameOver || state.isBusy || state.currentTurn === 'bot';
  els.spinBtn.disabled = disableActions;
  els.triggerBtn.disabled = disableActions;
}

function setStatus(type, title, desc) {
  els.statusBox.classList.remove('safe', 'boom');
  if (type === 'safe') els.statusBox.classList.add('safe');
  if (type === 'boom') els.statusBox.classList.add('boom');

  els.statusTitle.textContent = title;
  els.statusDesc.textContent = desc;
}

function renderStats() {
  els.statSurvived.textContent = state.stats.survived;
  els.statDeaths.textContent = state.stats.deaths;
  els.statStreak.textContent = state.stats.streak;
  els.statBest.textContent = state.stats.best;
}

function addLogEntry(type, message) {
  const dict = I18N[state.lang] || I18N.ru;
  const nowStr = new Intl.DateTimeFormat(dict.locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date());

  const li = document.createElement('li');
  li.className = `log-item ${type}`;

  const timeSpan = document.createElement('span');
  timeSpan.className = 'log-time';
  timeSpan.textContent = nowStr;

  const textSpan = document.createElement('span');
  textSpan.textContent = message;

  li.appendChild(timeSpan);
  li.appendChild(textSpan);
  els.logList.prepend(li);
}

/* ==========================================================================
   Обработчики событий
   ========================================================================== */
function bindEvents() {
  els.themeToggleBtn.addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  });

  els.soundToggleBtn.addEventListener('click', () => {
    applySound(!state.soundOn);
  });

  els.langSelect.addEventListener('change', (e) => {
    applyLanguage(e.target.value);
  });

  els.modeSelect.addEventListener('change', (e) => {
    state.mode = e.target.value;
    initNewRound();
  });

  els.bulletSelector.addEventListener('click', (e) => {
    const btn = e.target.closest('.bullet-opt');
    if (!btn) return;
    const count = Number(btn.getAttribute('data-bullets'));
    if (count >= 1 && count <= 5) {
      state.bulletCount = count;
      document.querySelectorAll('.bullet-opt').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      initNewRound();
    }
  });

  els.spinBtn.addEventListener('click', handleSpinAction);
  els.triggerBtn.addEventListener('click', handleTriggerAction);
  els.reloadBtn.addEventListener('click', initNewRound);

  els.resetStatsBtn.addEventListener('click', () => {
    state.stats = { survived: 0, deaths: 0, streak: 0, best: 0 };
    saveStats();
  });

  els.clearLogBtn.addEventListener('click', () => {
    els.logList.innerHTML = '';
  });
}

// Запуск приложения
function bootstrap() {
  applyTheme(state.theme);
  applySound(state.soundOn);
  applyLanguage(state.lang);
  renderStats();
  bindEvents();
  initNewRound();

  updateClock();
  setInterval(updateClock, 1000);
}

document.addEventListener('DOMContentLoaded', bootstrap);