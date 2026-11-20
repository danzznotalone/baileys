const { createAzazelSocket } = require('./lib/Socket/socket');
const { showAzazelBanner } = require('./lib/Utils/banner');
const { formatTargetJID, extractGroupInviteCode } = require('./lib/Utils/jid-helper');
const { buildCustomPayload } = require('./lib/Utils/payload-builder');

// Inisialisasi langsung saat di-require agar banner langsung muncul 1x
showAzazelBanner(true);

function makeWASocket(config) {
    // Integrasi dengan core WebSocket Baileys
    const coreBaileys = require('@whiskeysockets/baileys');
    const baseSocket = coreBaileys.default || coreBaileys.makeWASocket;
    return createAzazelSocket(baseSocket, config);
}

module.exports = {
    __esModule: true,
    default: makeWASocket,
    makeWASocket,
    showAzazelBanner,
    formatTargetJID,
    extractGroupInviteCode,
    buildCustomPayload
};
