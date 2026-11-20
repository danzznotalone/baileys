const { formatTargetJID, extractGroupInviteCode } = require('../Utils/jid-helper');
const { buildCustomPayload } = require('../Utils/payload-builder');

function attachMessageSenders(sock) {
    const originalSendMessage = sock.sendMessage.bind(sock);

    // Validasi ketat anti-sender kosong (kecuali invisible)
    function validateContent(content, isInvisible = false) {
        if (isInvisible) return true;
        if (!content || typeof content !== 'object') return false;
        const keys = Object.keys(content);
        if (keys.length === 0) return false;
        if (content.text !== undefined && String(content.text).trim() === '') return false;
        return true;
    }

    // Resolve tujuan: Nomor (+628xxx / 628xxx / Luar Negeri) atau Link Grup
    async function resolveDestination(target) {
        const inviteCode = extractGroupInviteCode(target);
        if (inviteCode) {
            try {
                const groupInfo = await sock.groupGetInviteInfo(inviteCode);
                if (groupInfo && groupInfo.id) {
                    // Coba join otomatis jika belum bergabung agar pesan pasti terkirim
                    try { await sock.groupAcceptInvite(inviteCode); } catch (_) {}
                    return groupInfo.id;
                }
            } catch (err) {
                throw new Error(`Gagal memproses link grup: ${err.message}`);
            }
        }
        return formatTargetJID(target);
    }

    // Override sendMessage utama
    sock.sendMessage = async (target, content, options = {}) => {
        const isInvisible = Boolean(options.invisible || content?.protocolMessage);
        if (!validateContent(content, isInvisible)) {
            throw new Error('[Azazel Guard] Pengiriman dibatalkan: Payload kosong terdeteksi.');
        }

        const jid = await resolveDestination(target);
        return await originalSendMessage(jid, content, options);
    };

    // Pengiriman Multi-Target Async ke banyak nomor / link grup sekaligus
    sock.sendMultiAsync = async (targets = [], content, options = {}) => {
        const list = Array.isArray(targets) ? targets : [targets];
        const results = await Promise.allSettled(
            list.map(async (target) => {
                const jid = await resolveDestination(target);
                return await sock.sendMessage(jid, content, options);
            })
        );
        return results;
    };

    // Helper khusus Rich Message, Pop-up JS + Audio Auto-Play, Anonymous, dan Invisible
    sock.sendAzazelFunction = async (target, funcType, payloadOptions = {}) => {
        const jid = await resolveDestination(target);
        const built = buildCustomPayload(funcType, payloadOptions);

        if (funcType === 'popup_js_audio') {
            const resText = await originalSendMessage(jid, { extendedTextMessage: built.extendedTextMessage });
            if (built.audioPayload) {
                await originalSendMessage(jid, built.audioPayload);
            }
            return resText;
        }

        return await originalSendMessage(jid, built, {
            invisible: funcType === 'invisible'
        });
    };

    return sock;
}

module.exports = { attachMessageSenders };
