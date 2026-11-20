const pino = require('pino');

const DEFAULT_CONNECTION_CONFIG = {
    version: [2, 3000, 1029485712], // WA Web Protocol Nov 2026
    browser: ['Azazel Engine', 'Chrome', '131.0.6778.86'],
    printQRInTerminal: false,
    logger: pino({ level: 'silent' }),
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 0,
    keepAliveIntervalMs: 25000, // Heartbeat stabil anti-disconnect
    emitOwnEvents: true,
    fireInitQueries: true,
    generateHighQualityLinkPreview: true,
    syncFullHistory: false,
    markOnlineOnConnect: false, // Mencegah deteksi spam/bot oleh server WA
    retryRequestDelayMs: 250,
    maxMsgRetryCount: 5,
    enableAutoSessionRecreation: true,
    enableRecentMessageCache: true
};

module.exports = { DEFAULT_CONNECTION_CONFIG };
