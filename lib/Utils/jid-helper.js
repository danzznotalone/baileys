function formatTargetJID(target) {
    if (!target) throw new Error('Target nomor atau link grup tidak boleh kosong');
    const clean = String(target).trim();

    if (clean.endsWith('@g.us') || clean.endsWith('@s.whatsapp.net') || clean.endsWith('@lid')) {
        return clean;
    }

    // Hapus semua karakter selain angka (mendukung +62, 62, +1, +44, dll)
    const numeric = clean.replace(/[^0-9]/g, '');
    if (numeric.length < 7) {
        throw new Error(`Nomor tujuan tidak valid: ${target}`);
    }

    return `${numeric}@s.whatsapp.net`;
}

function extractGroupInviteCode(link) {
    const match = String(link).match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i);
    return match ? match[1] : null;
}

module.exports = { formatTargetJID, extractGroupInviteCode };
