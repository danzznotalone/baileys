const ANSI = {
    RESET: '\x1b[0m',
    RED: '\x1b[1;31m',
    DARK_RED: '\x1b[38;5;160m',
    YELLOW: '\x1b[1;33m',
    BLUE: '\x1b[1;34m',
    CYAN: '\x1b[1;36m',
    WHITE: '\x1b[1;37m'
};

let isBannerDisplayed = false;

function showAzazelBanner(lockConsole = false) {
    if (isBannerDisplayed) return;
    isBannerDisplayed = true;

    console.clear();

    const maskArt = `${ANSI.RED}
                 .      .
               .:;:.  .:;:.
             .:;;;;;::;;;;;:.
           .:;;;;;;;;;;;;;;;;:.
          :;;;;;;;;;;;;;;;;;;;;:
         :;;;;;  ${ANSI.WHITE}(o)${ANSI.RED}    ${ANSI.WHITE}(o)${ANSI.RED}  ;;;;;:
         :;;;;;;    /\\    ;;;;;;:
          :;;;;;   /__\\   ;;;;;:
           ':;;;;  ${ANSI.DARK_RED}\\__/${ANSI.RED}  ;;;;:'
             ':;;;;:..:;;;;:'
               ':;;;;;;;;:'
                 ':;;;;:'
                   '::'
${ANSI.RESET}`;

    const azazelBlock = `${ANSI.YELLOW}
  █████╗ ███████╗ █████╗ ███████╗███████╗██╗     
 ██╔══██╗╚══███╔╝██╔══██╗╚══███╔╝██╔════╝██║     
 ███████║  ███╔╝ ███████║  ███╔╝ █████╗  ██║     
 ██╔══██║ ███╔╝  ██╔══██║ ███╔╝  ██╔══╝  ██║     
 ██║  ██║███████╗██║  ██║███████╗███████╗███████╗
 ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝${ANSI.RESET}`;

    const baileysBlock = `${ANSI.BLUE}
       █▄▄ ▄▀█ █ █   █▀▀ █▄█ █▀
       █▄█ █▀█ █ █▄▄ ██▄  █  ▄█${ANSI.RESET}`;

    const links = `
${ANSI.WHITE}  ──────────────────────────────────────────────
  ${ANSI.CYAN}Telegram Owner :${ANSI.WHITE} https://t.me/DanzzNotAlone
  ${ANSI.CYAN}Update Baileys   :${ANSI.WHITE} https://t.me/azazelnewera
  ${ANSI.WHITE}──────────────────────────────────────────────${ANSI.RESET}
`;

    process.stdout.write(maskArt + azazelBlock + baileysBlock + links + '\n');

    // Membungkam console.log bawaan Baileys agar tetap stuck bersih di banner
    if (lockConsole) {
        const noop = () => {};
        console.log = noop;
        console.info = noop;
        console.debug = noop;
        console.warn = noop;
    }
}

if (require.main === module) {
    showAzazelBanner(false);
}

module.exports = { showAzazelBanner };
