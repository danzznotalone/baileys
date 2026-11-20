# AZAZEL BAILEYS

Custom WhatsApp Web Multi-Device API Library by **Danzz** (`danzznotalone`).

- **Telegram Channel**: [t.me/azazelnewera](https://t.me)
- **GitHub Repository**: [://github.com](https://://github.com)

## Fitur Utama
- **Custom Pairing Code & QR Support**: Mendukung kode pairing kustom 8 digit maupun pemindaian QR standar berdasarkan konfigurasi skrip bot.
- **Anti-Logout & Auto-Reconnect**: Manajemen sesi dan *keep-alive* stabil untuk mencegah pemutusan sesi mendadak.
- **Clean Console Banner**: Menampilkan banner ASCII Azazel 1x saat inisialisasi server tanpa gangguan *log* internal.
- **Full Rich Message & Relay Support**: Mendukung pengiriman `interactiveMessage`, `nativeFlowMessage`, dan seluruh struktur protokol WhatsApp terbaru.
- **Multi-Target Async Helper**: Mendukung pengiriman asinkron ke banyak nomor tujuan maupun grup WhatsApp.

## Cara Pemasangan pada `package.json` Bot

Tambahkan repositori GitHub ini ke dalam bagian `dependencies` pada file `package.json` proyek bot Anda:

```json
{
  "dependencies": {
    "@whiskeysockets/baileys": "github:danzznotalone/baileys"
  }
}
```

Atau pasang langsung melalui terminal:

```bash
npm install github:danzznotalone/baileys
```
