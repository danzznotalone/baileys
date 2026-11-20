const chalk = require('chalk');

let isBannerRendered = false;

function renderAzazelBanner() {
    if (isBannerRendered) return;
    isBannerRendered = true;

    const redMask = chalk.bold.hex('#FF1E1E');
    const darkRed = chalk.hex('#8B0000');
    const yellowBlock = chalk.bold.hex('#FFD700');
    const blueSub = chalk.bold.hex('#00BFFF');
    const linkColor = chalk.cyan.underline;

    const maskArt = `
${darkRed('               .      .               ')}
${redMask('             .::.    .::.             ')}
${redMask('            .::::.  .::::.            ')}
${redMask('           .::::::..::::::.           ')}
${redMask('          .::::::::::::::::.          ')}
${redMask('         .:::  ')}${yellowBlock('▄▀')}${redMask('    ')}${yellowBlock('▀▄')}${redMask('  :::.         ')}
${redMask('         ::::  ')}${yellowBlock('▀▀')}${redMask('    ')}${yellowBlock('▀▀')}${redMask('  ::::         ')}
${redMask('         :::::.  .::.  .:::::         ')}
${redMask('          ::::::. :: .::::::          ')}
${darkRed('           \':::::....:::::\'           ')}
${darkRed('             \'::::::::::\'             ')}
${darkRed('                \'::::\'                ')}
`;

    const titleArt = `
${yellowBlock('  █████╗ ███████╗ █████╗ ███████╗███████╗██╗     ')}
${yellowBlock(' ██╔══██╗╚══███╔╝██╔══██╗╚══███╔╝██╔════╝██║     ')}
${yellowBlock(' ███████║  ███╔╝ ███████║  ███╔╝ █████╗  ██║     ')}
${yellowBlock(' ██╔══██║ ███╔╝  ██╔══██║ ███╔╝  ██╔══╝  ██║     ')}
${yellowBlock(' ██║  ██║███████╗██║  ██║███████╗███████╗███████╗')}
${yellowBlock(' ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝')}
${blueSub('                 [ B A I L E Y S ]                 ')}
`;

    process.stdout.write('\x1Bc'); // Clear terminal sekali saat start
    console.log(maskArt);
    console.log(titleArt);
    console.log(`   ${chalk.white('Channel Official :')} ${linkColor('https://t.me')}`);
    console.log(`   ${chalk.white('Update Baileys   :')} ${linkColor('https://t.me')}\n`);
}

module.exports = { renderAzazelBanner };
