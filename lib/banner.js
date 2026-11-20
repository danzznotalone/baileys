const chalk = require('chalk');

let isBannerDisplayed = false;

function showAzazelBanner() {
    if (isBannerDisplayed) return;
    isBannerDisplayed = true;

    console.clear();

    const maskArt = chalk.red.bold(`
            .      .
           /|      |\\
          / |      | \\
         /  |      |  \\

        |   \\      /   |
        |  (o)    (o)  |
        |      /\\      |
         \\   '----'   /
          \\  \\====/  /
           '.______.'
    `);

    const titleAzazel = chalk.yellow.bold(`
  █████╗ ███████╗ █████╗ ███████╗███████╗██╗     
 ██╔══██╗╚══███╔╝██╔══██╗╚══███╔╝██╔════╝██║     
 ███████║  ███╔╝ ███████║  ███╔╝ █████╗  ██║     
 ██╔══██║ ███╔╝  ██╔══██║ ███╔╝  ██╔══╝  ██║     
 ██║  ██║███████╗██║  ██║███████╗███████╗███████╗
 ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝`);

    const subtitleBaileys = chalk.blue.bold(`
             █▄▄ ▄▀█ █ █   █▀▀ █▄█ █▀
             █▄█ █▀█ █ █▄▄ ██▄  █  ▄█`);

    const telegramLink = chalk.white.bold('\n     Update Baileys: ') + chalk.cyan.underline('https://t.me\n');

    console.log(maskArt + titleAzazel + subtitleBaileys + telegramLink);
}

module.exports = { showAzazelBanner };
