const baileys = require('@whiskeysockets/baileys');
const { createAzazelSocket } = require('./lib/connection');
const { AzazelMessageHelper } = require('./lib/messageHelper');
const { showAzazelBanner } = require('./lib/banner');

module.exports = {
    ...baileys,
    default: createAzazelSocket,
    createAzazelSocket,
    AzazelMessageHelper,
    showAzazelBanner
};
