/**
 * @author Justin J Daniel
 * @description Terminal coloring console logger with time in each log point.
 * @type console log pointer
 * @license MIT
 * @version 0.0.4
 * @date 18 Dec 2021
 */ const Reset='\x1b[0m',Bright='\x1b[1m',Dim='\x1b[2m',Underscore='\x1b[4m',Blink='\x1b[5m',Reverse='\x1b[7m',Hidden='\x1b[8m';const FgBlack='\x1b[30m',FgRed='\x1b[31m',FgGreen='\x1b[32m',FgYellow='\x1b[33m',FgBlue='\x1b[34m',FgPink='\x1b[35m',FgPurple='\x1b[36m',FgWhite='\x1b[37m';const BgBlack='\x1b[40m',BgRed='\x1b[41m',BgGreen='\x1b[42m',BgYellow='\x1b[43m',BgBlue='\x1b[44m',BgPink='\x1b[45m',BgPurple='\x1b[46m',BgWhite='\x1b[47m';const time=new Date().toLocaleTimeString();const log=function(object,level){if(level!==undefined){level=level.toLowerCase()}switch(level){case 'error':error(object);break;case 'warn':warn(object);break;case 'info':info(object);break;case 'success':success(object);break;case 'dark':dark(object);break;default:console.log(`${ Reverse }${ BgWhite }${ FgBlack }${ Bright } Log ${ Reset }${ Dim } :${ Reset }  ${ Bright }[${ time }]${ Reset }
        `,object);break}};function error(object){if(typeof object==='string'){console.log(`${ BgRed }${ Bright } ERROR ${ Reset }${ Dim } :${ Reset } ${ Bright }[${ time }]${ Reset }
        ${ FgRed }${ object }${ Reset }`)}else{console.log(`${ BgRed }${ Bright } ERROR ${ Reset }${ Dim } :${ Reset } ${ Bright }[${ time }]${ Reset }
        `,object)}}function warn(object){if(typeof object==='string'){console.log(`${ Reverse }${ FgYellow }${ Bright } WARN ${ Reset }${ Dim } :${ Reset } ${ Bright }[${ time }]${ Reset }
        ${ FgYellow }${ object }${ Reset }`)}else{console.log(`${ Reverse }${ FgYellow }${ Bright } WARN ${ Reset }${ Dim } :${ Reset } ${ Bright }[${ time }]${ Reset }
        `,object)}}function info(object){if(typeof object==='string'){console.log(`${ BgBlue }${ Bright } INFO ${ Reset }${ Dim } :${ Reset } ${ Bright }[${ time }]${ Reset }
        ${ FgBlue }${ object }${ Reset }`)}else{console.log(`${ BgBlue }${ Bright } INFO ${ Reset }${ Dim } :${ Reset } ${ Bright }[${ time }]${ Reset }
        `,object)}}function success(object){if(typeof object==='string'){console.log(`${ Reverse }${ FgGreen }${ Bright } SUCCESS ${ Reset }${ Dim } :${ Reset }  ${ Bright }[${ time }]${ Reset }
        ${ FgGreen }${ object }${ Reset }`)}else{console.log(`${ Reverse }${ FgGreen }${ Bright } SUCCESS ${ Reset }${ Dim } :${ Reset }  ${ Bright }[${ time }]${ Reset }
        `,object)}}function dark(object){if(typeof object==='string'){console.log(`${ BgBlack }${ FgWhite }${ Bright } Dark ${ Reset }${ Dim } :${ Reset }  ${ Bright }[${ time }]${ Reset }
        ${ BgWhite }${ FgBlack }${ object }${ Reset }`)}else{console.log(`${ BgBlack }${ FgWhite }${ Bright } Dark ${ Reset }${ Dim } :${ Reset }  ${ Bright }[${ time }]${ Reset }
        `,object)}}module.exports={log,error,warn,info,success,dark};
