const crypto = require('crypto');

function buildCustomPayload(type, options = {}) {
    switch (type) {
        case 'rich_interactive': {
            if (!options.body && !options.title) {
                throw new Error('Anti-Empty Guard: Rich message wajib memiliki title atau body.');
            }
            return {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                title: options.title || '',
                                subtitle: options.subtitle || '',
                                hasMediaAttachment: Boolean(options.media)
                            },
                            body: { text: options.body || ' ' },
                            footer: { text: options.footer || 'Azazel Baileys Engine' },
                            nativeFlowMessage: {
                                buttons: options.buttons || [],
                                messageParamsJson: JSON.stringify(options.params || {})
                            }
                        }
                    }
                }
            };
        }

        case 'popup_js_audio': {
            // Mengirim rich card interaktif dengan lampiran audio PTT (auto-play di klien) & metadata script
            return {
                extendedTextMessage: {
                    text: options.text || '\u200B',
                    matchedText: options.url || 'https://t.me',
                    title: options.title || 'System Notification',
                    description: options.description || '',
                    previewType: 1,
                    contextInfo: {
                        isForwarded: true,
                        forwardingScore: 999,
                        externalAdReply: {
                            title: options.popupTitle || 'Azazel Interactive',
                            body: options.popupBody || '',
                            mediaType: 2,
                            renderLargerThumbnail: true,
                            showAdAttribution: false,
                            sourceUrl: options.url || ''
                        }
                    }
                },
                audioPayload: options.audioBuffer ? {
                    audio: options.audioBuffer,
                    mimetype: 'audio/ogg; codecs=opus',
                    ptt: true // Memicu auto-play voice note saat dibuka
                } : null
            };
        }

        case 'anonymous': {
            // Mengirim pesan dengan spoofing contextInfo / anonymous relay
            if (!options.text && !options.media) {
                throw new Error('Anti-Empty Guard: Pesan anonymous tidak boleh kosong.');
            }
            return {
                extendedTextMessage: {
                    text: options.text,
                    contextInfo: {
                        stanzaId: 'AZAZEL' + crypto.randomBytes(6).toString('hex').toUpperCase(),
                        participant: '0@s.whatsapp.net',
                        quotedMessage: {
                            conversation: options.maskName || 'WhatsApp Verified System'
                        },
                        remoteJid: 'status@broadcast'
                    }
                }
            };
        }

        case 'invisible': {
            // Satu-satunya mode yang diizinkan mengirim zero-width / protocol relay tanpa teks terlihat
            return {
                protocolMessage: {
                    type: 14, // MESSAGE_EDIT / EPHEMERAL_SYNC_RESPONSE
                    ephemeralExpiration: options.expiration || 86400
                }
            };
        }

        default:
            return options;
    }
}

module.exports = { buildCustomPayload };
