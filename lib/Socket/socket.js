const { DEFAULT_CONNECTION_CONFIG } = require('../Defaults');
const { showAzazelBanner } = require('../Utils/banner');
const { attachMessageSenders } = require('./messages-send');
const qrcode = require('qrcode-terminal');

function createAzazelSocket(baseMakeWASocket, userConfig = {}) {
    // Tampilkan banner 1x dan kunci console log agar tidak berantakan
    showAzazelBanner(userConfig.silentConsole !== false);

    const config = {
        ...DEFAULT_CONNECTION_CONFIG,
        ...userConfig
    };

    const sock = baseMakeWASocket(config);
    attachMessageSenders(sock);

    // Custom Pairing Code murni dari request/script bot (tanpa default number)
    sock.requestAzazelPairing = async (phoneNumber, customCode = null) => {
        if (!phoneNumber) {
            throw new Error('Nomor WA wajib diisi dari parameter script bot!');
        }
        const cleanNumber = String(phoneNumber).replace(/[^0-9]/g, '');
        // Jika customCode (8 karakter alfanumerik) diberikan, gunakan sebagai pairing code
        return await sock.requestPairingCode(cleanNumber, customCode || undefined);
    };

    // Handler QR jika mode QR dipilih
    sock.ev.on('connection.update', (update) => {
        const { qr } = update;
        if (qr && config.useQR) {
            qrcode.generate(qr, { small: true });
        }
    });

    return sock;
}

module.exports = { createAzazelSocket };
