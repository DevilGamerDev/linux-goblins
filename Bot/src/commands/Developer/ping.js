const log4js = require( `log4js` );
const elog = log4js.getLogger( `errlog` );
const log = log4js.getLogger( `info` );
const wlog = log4js.getLogger( `warn` );

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    disabled: false,
    isSlash: true,
    Data: new SlashCommandBuilder()
        .setName(`ping`)
        .setDescription(`Test bots connection`),
    description: ``,
    examples: ``,
    execute: async ( interaction, client, Discord ) => {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true, ephemeral:true  });
        const Uptime = Math.round(interaction.client.uptime / 60000)
        const Websocket = interaction.client.ws.ping
        const Latency = sent.createdTimestamp - interaction.createdTimestamp
        await interaction.editReply(`:ping_pong: Pong!\n:stopwatch: Uptime: ${Uptime} minutes\n:sparkling_heart: Websocket heartbeat: ${Websocket > 0 ? Websocket : 0}ms.\n:round_pushpin: Rountrip Latency: ${Latency > 0 ? Latency : 0}ms`);
    }
};
