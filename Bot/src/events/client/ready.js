// Import Packages
const log4js = require( `log4js` );
const elog = log4js.getLogger( `errlog` );
const log = log4js.getLogger( `info` );
const wlog = log4js.getLogger( `warn` );

// Import files
const config = require(`../../config.json`);
const runSlashHandler = require(`../../handlers/slashHandler`)

async function waterMark() {

    log.info( `\x1b[0m` );
    log.info( `\x1b[42mINFO\x1b[0m \x1b[30m\x1b[32mStarting...\x1b[40m` );
    log.info( `\x1b[37m` );
    log.info( `\x1b[42mINFO\x1b[40m \x1b[37m----------------------------------\x1b[37m` );
    log.info( `\x1b[42mINFO\x1b[40m \x1b[36m          ${config.info.BOTNAME} | Nodejs ${process.version}\x1b[37m` );
    log.info( `\x1b[42mINFO\x1b[40m \x1b[34m         Developed by \x1b[31mTannor, Dylan, Alex, Kadeem\x1b[37m` );
    log.info( `\x1b[42mINFO\x1b[40m \x1b[37m----------------------------------\x1b[37m` );
    log.info( `\x1b[0m` );

}

module.exports = {
    name: `ready`,
    once: true,
    async execute( config, Discord, client ) {

        await runSlashHandler(client, `./src/commands`);

        waterMark();

        await log.info( `Ready as \x1b[1;31m${client.user.tag}\x1b[0m to serve in \x1b[4m${client.channels.cache.size}\x1b[0m channels on \x1b[1;4;41m${client.guilds.cache.size} servers\x1b[0m, for a total of \x1b[4m${client.users.cache.size}\x1b[0m users.` ); 
    },
};
