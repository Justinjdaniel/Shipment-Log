const Reset = '\x1b[0m';
const Bright = '\x1b[1m';
const Dim = '\x1b[2m';
const Underscore = '\x1b[4m';
const Blink = '\x1b[5m';
const Reverse = '\x1b[7m';
const Hidden = '\x1b[8m';

const FgBlack = '\x1b[30m';
const FgRed = '\x1b[31m';
const FgGreen = '\x1b[32m';
const FgYellow = '\x1b[33m';
const FgBlue = '\x1b[34m';
const FgMagenta = '\x1b[35m';
const FgCyan = '\x1b[36m';
const FgWhite = '\x1b[37m';

const BgBlack = '\x1b[40m';
const BgRed = '\x1b[41m';
const BgGreen = '\x1b[42m';
const BgYellow = '\x1b[43m';
const BgBlue = '\x1b[44m';
const BgMagenta = '\x1b[45m';
const BgCyan = '\x1b[46m';
const BgWhite = '\x1b[47m';

module.exports.log = function (obj, level) {
  switch (level) {
    case 'error':
      console.log(
        `${BgRed} Error ${Reset}${Dim} :${Reset} ${FgRed}${obj}${Reset}`
      );
      break;
    case 'warn':
      console.log(
        `${BgYellow}${FgBlack}  Warn ${Reset}${Dim} :${Reset} ${FgYellow}${obj}${Reset}`
      );
      break;
    case 'info':
      console.log(
        `${BgBlue} Info ${Reset}${Dim} :${Reset} ${FgBlue}${obj}${Reset}`
      );
      break;
    case 'success':
      console.log(
        `${BgGreen}${FgBlack} Success ${Reset}${Dim} :${Reset} ${FgGreen}${obj}${Reset}`
      );
      break;
    case 'dark':
      console.log(
        `${Reverse}${BgBlack} Oh! dark ${Reset}${Dim} :${Reset} ${FgBlack}${obj}${Reset}`
      );
      break;
    default:
      console.log(obj);
      break;
  }
};
