const fs = require( `fs` );
const log4js = require( `log4js` );
const elog = log4js.getLogger( `errlog` );
const log = log4js.getLogger( `info` );
const { AsciiTable3 } = require( `ascii-table3` );
var table = new AsciiTable3(`\x1b[34m Loaded Events: \x1b[36m`);
const config = require( `../config.json` );
const Discord = require( `discord.js` );

module.exports = async ( client ) => {

    log.info(
        `\x1b[41mEVENTS\x1b[0m\x1b[37m\x1b[34m --> \x1b[31mStarted Events Handler\x1b[37m`
    );

    var i = 0;

    fs.readdirSync( `./src/events` ).forEach( ( dir ) => {

        const files = fs
            .readdirSync( `./src/events/${dir}` )
            .filter( ( file ) => file.endsWith( `.js` ) );

        for ( const eventFiles of files ) {

            const event = require( `../events/${dir}/${eventFiles}` );
            if ( event.once ) {

                client.on( event.name, ( ...args ) =>
                    event.execute( config, Discord, client, ...args )
                );
                table.addRow( `\x1b[37m ${i} \x1b[36m`, `\x1b[32m ${event.name} \x1b[36m`, `\x1b[31m${dir}\x1b[36m` );
                i++;
            
            } else if ( event ) {

                client.on( event.name, ( ...args ) =>
                    event.execute( config, Discord, client, ...args )
                );
                table.addRow( `\x1b[37m ${i} \x1b[36m`, `\x1b[32m ${event.name} \x1b[36m`, `\x1b[31m${dir}\x1b[36m` );
                i++;
            
            }
        
        }
    
    } );

    table.setHeading( ``, `\x1b[32m Events \x1b[36m`, `\x1b[31mFolder\x1b[36m` );
    table.setAlignCenter();
    table.setCellMargin(5)
    table.setStyle(`unicode-round`)

    const delay = ( ms ) => new Promise( ( resolve ) => setTimeout( resolve, ms ) );
    await delay( 2 );

    log.info( `Events Table:\n\x1b[36m${table.toString()}\x1b[0m`);

};
