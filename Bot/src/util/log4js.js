const log4js = require('log4js')

module.exports = async () => {

    log4js.configure( {
        appenders: {
            errlog: {
                type: `file`,
                filename: `./src/logs/errors.log`
            },
            infolog: {
                type: `file`,
                filename: `./src/logs/info.log`
            },
            wlog: {
                type: `file`,
                filename: `./src/logs/warnings.log`
            },
            console: {
                type: `console`,
                layout: {
                    type: `pattern`,
                    pattern: `%[[%d] - %f{1} - [%p] %] LN:%l   %m`
                }
            },
            errconsole: {
                type: `console`,
                layout: {
                    type: `pattern`,
                    pattern: `%[[%d] - %f{1} - [%p] %]LN:%l   %m`
                }
            }
        },

        categories: {
            default: {
                enableCallStack: true,
                appenders: [ `errlog`, `errconsole` ],
                level: `error`,
            },
            info: {
                enableCallStack: true,
                appenders: [ `infolog`, `console` ],
                level: `info`,
            },
            warn: {
                enableCallStack: true,
                appenders: [ `wlog`, `console` ],
                level: `warn`
            }
        }
    } );

    var date = new Date();
    var utcDate = new Date( date.toUTCString() );
    utcDate.setHours( utcDate.getHours() );
    var usDate = new Date( utcDate );

    var elog = log4js.getLogger( `errlog` );
    elog.error( `Bot Startup At ${usDate}` );

    const log = log4js.getLogger( `info` );
    log.info( `Bot Startup At ${usDate}` );

    const wlog = log4js.getLogger( `warn` );
    wlog.warn( `Bot Startup At ${usDate}` );

};