const {
    default: makeWASocket,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    Browsers
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const NodeCache = require('node-cache');
const { showAzazelBanner } = require('./banner');

const silentLogger = pino({ level: 'silent' });
const msgRetryCounterCache = new NodeCache();

async function createAzazelSocket(config = {}) {
    showAzazelBanner();

    const { state, saveCreds, phoneNumber, customPairingCode, usePairingCode = true, onConnectionUpdate } = config;
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: silentLogger,
        printQRInTerminal: !usePairingCode,
        browser: Browsers.ubuntu('Chrome'),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, silentLogger)
        },
        msgRetryCounterCache,
        generateHighQualityLinkPreview: true,
        syncFullHistory: false,
        markOnlineOnConnect: true,
        keepAliveIntervalMs: 30000,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 60000
    });

    // Request Pairing Code berdasarkan input dari script bot (tanpa default)
    if (usePairingCode && !sock.authState.creds.registered) {
        if (!phoneNumber) {
            throw new Error('Parameter phoneNumber wajib diisi dari script bot saat menggunakan pairing code.');
        }
        setTimeout(async () => {
            try {
                const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
                // Mendukung custom pairing code 8 karakter jika disediakan
                const code = customPairingCode
                    ? await sock.requestPairingCode(cleanNumber, customPairingCode)
                    : await sock.requestPairingCode(cleanNumber);
                
                process.stdout.write(`\r[PAIRING CODE] : ${code}\n`);
            } catch (err) {
                // Silent error handling agar console tidak kotor
            }
        }, 3000);
    }

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

            if (shouldReconnect) {
                // Auto-reconnect stabil tanpa menghapus sesi
                createAzazelSocket(config);
            }
        }

        if (typeof onConnectionUpdate === 'function') {
            onConnectionUpdate(update, sock);
        }
    });

    return sock;
}

module.exports = { createAzazelSocket };
