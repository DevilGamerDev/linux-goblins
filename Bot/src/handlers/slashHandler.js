const fs = require( `fs` );
const config = require( `../config.json` );
const path = require( `path` );
const log4js = require( `log4js` );
const elog = log4js.getLogger( `errlog` );
const wlog = log4js.getLogger( `warn` );
const log = log4js.getLogger( `info` );
const { AsciiTable3, AlignmentEnum } = require( `ascii-table3` );
const Discord = require( `discord.js` );
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Const commandsfolder = require('../commands');

require( `events` ).EventEmitter.defaultMaxListeners = 200;

module.exports = async ( client, cmndsfolderpath ) => {
    const clientId = client.user.id;

    await log.info(
        `\x1b[41mCOMMANDS\x1b[0m\x1b[37m\x1b[34m --> \x1b[31mStarted \x1b[31mSlash Command Handler\x1b[0m`
    );

    // Log.info(await client.commands);
    let pathtocommandsfolder = `${cmndsfolderpath}`;
    let commandsoptions = [];
    let dirsin = []; // Loaded folders in array: [ 'mod', 'tickets' ]
    let allfiles = []; // All files in array regards to folder: [ [ 'ban.js', 'mute.js' ], [ 'close.js', 'new.js' ] ]
    let sortedallfiles = []; // All files in array ['ban.js', 'mute.js', 'close.js', 'new.js']
    let tablecounter = 0; // Dirsin is all the directories inside the ./commands folder
    let prefix = config.info.PREFIX; // Prefix
    let recentlyRan = [];
    let table = new AsciiTable3( `\x1b[34m Loaded Slash Commands: \x1b[36m` );
    let activeModules = []; // Present at the bottom of the commands table (Active Modules: dev, devsim, econmy, fun, info)
    let disabledModules = []; // Present at the bottom of the commands table (Disabled Modules: mod, tickets)
    let allcommands = [];
    let invalidFiles = [];
    let everything = new Map();
    let errors = ``;           // Used in ready.js
    let disabledCommands = ``; // Used in ready.js

    // Const getallinfolder = await fs.promises.readdir(pathtocommandsfolder).then(async (files) => {
    await fs.promises.readdir( pathtocommandsfolder ).then( async ( files ) => {

        // Log.info(files);

        let temp = [];
        // ^ define a temporary array to push all the recognised folders into
        for ( let i = 0; i < files.length; i++ ) {

            let checkisfile = await fs.statSync(
                `${pathtocommandsfolder}/${files[i]}`
            );
            // ^fs function to use for .isFile()

            if ( checkisfile.isFile() == false ) {

                // ^scan for directories, if its a file, then ignore

                temp.push( files[i] );
                // ^loaded folders inside the ${pathtocommandsfolder} folder. THese are the MOD, MUSIC ect folders

                await fs.promises
                    .readdir( `${pathtocommandsfolder}/${files[i]}` )
                    .then( async ( files ) => {

                        // ^ this is the fs function that makes the request to read whatever is inside the MOD Music INFO folders

                        let temparraytopush = [];

                        for ( let ii = 0; ii < files.length; ii++ ) {

                            // ^ read inside the files array and check if the file selected is a .js file

                            if (
                                path.extname(
                                    `${pathtocommandsfolder}/${dirsin[i]}/${files[ii]}`
                                ) == `.js`
                            ) {

                                // ^ check path extention

                                temparraytopush.push( files[ii] );
                                // ^ the temp array is to make the allfiles array that has a [ [ 'ban.js', 'mute.js' ], [ 'close.js', 'new.js' ] ] format.
                                sortedallfiles.push( files[ii] );
                                // ^ add the raw file name into the sortedallfiles array.

                            } else {

                                // Log.info( files[ii], `does not match .js extention` );
                                invalidFiles.push( files[ii] );

                            }

                        }

                        allfiles.push( temparraytopush );

                    } );

            }

        }

        return ( dirsin = temp );

    } );

    // Log.info( `Directories Scanned In ${pathtocommandsfolder}:`, dirsin );

    // \/ this part generates the table bc its prety haha
    const activeModulesKeys = Object.keys( config.activeModules ); // Get the names of the modules that should be alive
    const activeModuleValues = Object.values(config.activeModules); // Get wether the modules should be on or off w/ true/false

    // Log.info(activeModulesKeys, activeModuleValues);

    for ( let i = 0; i < activeModulesKeys.length; i++ ) {



        if ( activeModuleValues[i] == false ) {


            const isSameFilter = ( element ) => element == activeModulesKeys[i]; // Search for the value in the array that matches activeModulesKeys[i] to be removed
            const indexToRemove = dirsin.findIndex( isSameFilter ); // Find the index number of activeModulesKeys[i]

            await dirsin.splice( indexToRemove, 1 );
            await allfiles.splice( indexToRemove, 1 );
            // ^ removes the folder and files from running here

            disabledModules.push( activeModulesKeys[i] );
            // ^ just an astetic part to log to let the user know a module is disabled

        } else if ( activeModuleValues[i] == true ) {

            // Log.info( `${activeModulesKeys[i]} Is Active` );

            activeModules.push( activeModulesKeys[i] );
            // ^ just an astetic part to log to let the user know a module is active

        }

    }
    // ^ this for loop is the active modules part, it controls which modules are on and off, which is why it has its own for loop.

    for ( let i = 0; i < dirsin.length; i++ ) {

        const tempArray = [];

        for ( let ii = 0; ii < ( await allfiles[i].length ); ii++ ) {

            /**
             * This Next Parts Creates an Array Of Objects With The Stuff:
             * @param ['commandname', 'commandalias'],
             * @param 5,
             * @param execute: [AsyncFunction: execute],
             */

            const GetCommandFromFile = require( `../commands/${dirsin[i]}/${allfiles[i][ii]}` );

            const value = GetCommandFromFile;

            if ( value.disabled === true ) {

                // Log.info(value.commands[0], `Is A Disabled Slash Command`);
                disabledCommands = (disabledCommands + `\`${value.commands[0]}\`, `);

            } else if (value.isSlash === true) {

                tempArray.push( value );
                commandsoptions.push(GetCommandFromFile);
                table.addRow(
                    `\x1b[37m ${tablecounter++} \x1b[36m`,
                    `\x1b[32m ${GetCommandFromFile.Data.name} \x1b[36m`,
                    `\x1b[31m ${dirsin[i]} \x1b[36m`,
                    `\x1b[35m ${allfiles[i][ii]} \x1b[36m`
                );

            }

            await everything.set( dirsin[i],  tempArray );

    
        }

    }

    const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

    let commands = [];

    commandsoptions.forEach((element, index, array) => {
        commands.push(element.Data.toJSON());
        
        client.commands.set(element.Data.name, element);
        // ^for the cache

    });

    if (config.info.testing) {

        try {
            await rest.put(
                Routes.applicationGuildCommands(clientId, "1194723885300596808"),
                { body: commands },
            );
        } catch (error) {
            log.error(error);
        }
    } else {
        try {
            await rest.put(
                Routes.applicationCommands(clientId),
                { body: commands },
            );
        } catch (error) {
            log.error(error)
        }
    }

    client.on('interactionCreate', async (interaction) => {

        if (!interaction.isCommand() && !interaction.isContextMenu()) {
            return;
          }
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;
        if(!interaction.guild) return;
        if(!interaction.inCachedGuild()){
            interaction.guild = await client.guilds.fetch(interaction.guildId).catch((err)=>{return});
        }
        if(!interaction.channel){
            interaction.channel = await client.channels.fetch(interaction.channelId);
        }
        
        try {
            await command.execute(interaction, client, Discord);
        } catch (error) {
            console.error(error);
            await interaction.reply({ 
                content: 'There was an error while executing this command!', 
                ephemeral: true 
            }).catch((e)=>{return});
        }
    });



    await table.setHeading( ``, `\x1b[32m Command \x1b[36m`, `\x1b[31m Folder \x1b[36m`, `\x1b[35m Name \x1b[36m` );
    table.setAlignCenter();
    table.setAlign(1, AlignmentEnum.CENTER)
    table.setCellMargin(4)
    table.setStyle(`unicode-round`)


    await log.info(
        `Slash Commands Table:\n\x1b[36m${table.toString()}\x1b[0m`
    );

    await log.info(
        `\x1b[41mCOMMANDS\x1b[0m\x1b[37m\x1b[34m --> \x1b[31mLoaded \x1b[31mSlash Command Handler\x1b[0m`
    );

    invalidFiles.forEach( ( element, index, array ) => {

        errors = (errors + `\`${element}\` Does Not Match The .js Extention \n`);

    } );

    const exports = new Map();
    exports.set( `commandOptions`, commandsoptions );
    exports.set(`allFiles`, allfiles);
    exports.set(`errors`, errors);
    exports.set(`disabledCommands`, disabledCommands);
    exports.set(`activeModules`, activeModules.toString().replace(/,/g, `, `));
    exports.set(`disabledModules`, disabledModules.toString().replace(/,/g, `, `));

    module.exports = { commandsoptions, allfiles, everything, exports };

    return exports;



};
