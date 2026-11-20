const { generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

class AzazelMessageHelper {
    constructor(sock) {
        this.sock = sock;
    }

    /**
     * Mengirim pesan interaktif (Rich Message / Native Flow)
     */
    async sendInteractiveMessage(jid, content, options = {}) {
        const msg = generateWAMessageFromContent(
            jid,
            {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: proto.Message.InteractiveMessage.create({
                            body: proto.Message.InteractiveMessage.Body.create({
                                text: content.body || ''
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({
                                text: content.footer || ''
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                title: content.title || '',
                                subtitle: content.subtitle || '',
                                hasMediaAttachment: Boolean(content.media),
                                ...(content.media || {})
                            }),
                            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                buttons: content.buttons || []
                            }),
                            contextInfo: content.contextInfo || {}
                        })
                    }
                }
            },
            { userJid: this.sock.user.id, ...options }
        );

        await this.sock.relayMessage(jid, msg.message, {
            messageId: msg.key.id,
            additionalAttributes: options.additionalAttributes || {}
        });

        return msg;
    }

    /**
     * Mengirim raw relay payload (mendukung semua struktur proto WhatsApp)
     */
    async sendRawRelay(jid, messageProto, additionalAttributes = {}) {
        const msg = generateWAMessageFromContent(jid, messageProto, {
            userJid: this.sock.user.id
        });

        await this.sock.relayMessage(jid, msg.message, {
            messageId: msg.key.id,
            additionalAttributes
        });

        return msg;
    }

    /**
     * Pengiriman multi-target (Nomor Pribadi & Grup) secara paralel / berurutan
     */
    async sendMultiTarget(targets = [], sendFunction, delayMs = 500) {
        const results = [];
        for (const jid of targets) {
            const res = await sendFunction(this.sock, jid);
            results.push({ jid, status: 'sent', res });
            if (delayMs > 0) {
                await new Promise((resolve) => setTimeout(resolve, delayMs));
            }
        }
        return results;
    }
}

module.exports = { AzazelMessageHelper };
