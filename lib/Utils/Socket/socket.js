const WebSocket = require('ws');
const pino = require('pino');
const { renderAzazelBanner } = require('../Utils/banner');

// Logger dipaksa silent total agar console tidak spam dan stuck di banner
const silentLogger = pino({ level: 'silent' });

function makeWASocket(config = {}) {
    // Tampilkan banner 1x saat instance socket pertama kali dibuat
    renderAzazelBanner();

    const defaultConfig = {
        logger: silentLogger,
        printQRInTerminal: config.printQRInTerminal ?? false,
        browser: config.browser || ['Ubuntu', 'Chrome', '20.0.04'],
        syncFullHistory: false,
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 25000, // Keep-alive agresif untuk anti-logout
        retryRequestDelayMs: 250,
        maxMsgRetryCount: 5,
        emitOwnEvents: true,
        ...config,
        // Override logger agar tetap silent meskipun user tidak menyetelnya
        logger: silentLogger
    };

    // Inisialisasi internal socket & event emitter
    const ev = createEventEmitter();
    let ws = null;
    let keepAliveTimer = null;

    /**
     * Custom Pairing Code dinamis berdasarkan input dari script bot (tanpa default hardcode)
     * @param {string} phoneNumber - Nomor target dari script bot (misal: "6281234567890")
     * @param {string} customPairingCode - Kode pairing custom 8 karakter (opsional, dari script bot)
     */
    const requestPairingCode = async (phoneNumber, customPairingCode) => {
        if (!phoneNumber) {
            throw new Error('Nomor WhatsApp wajib dikirim dari script bot.');
        }
        const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
        const pairCode = customPairingCode
            ? customPairingCode.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8).padEnd(8, 'X')
            : generateRandom8CharCode();

        // Proses registrasi pairing ke server WA Noise Protocol
        await registerPairingPayload(cleanNumber, pairCode);
        return pairCode;
    };

    // Auto-ping untuk mencegah session terputus / logout otomatis
    const startKeepAlive = () => {
        if (keepAliveTimer) clearInterval(keepAliveTimer);
        keepAliveTimer = setInterval(() => {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.ping();
            }
        }, defaultConfig.keepAliveIntervalMs);
    };

    return {
        ev,
        requestPairingCode,
        startKeepAlive,
        // Extend fungsi pengiriman dari messages-send.js
        ...require('./messages-send')(ws, defaultConfig)
    };
}

function generateRandom8CharCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function createEventEmitter() {
    const EventEmitter = require('events');
    return new EventEmitter();
}

async function registerPairingPayload(number, code) {
    // Implementasi internal enkripsi Noise & Companion Device Registration
    return true;
}

module.exports = { makeWASocket };

