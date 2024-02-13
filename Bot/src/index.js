// Required Config
require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds] })

// Retriving files
const log4jsRun = require(`./util/log4js`)
const eventHandler = require(`./handlers/eventHandler`)

// Create Caches
client.commands = new Discord.Collection();

// Initalizing bot
log4jsRun();
eventHandler(client)

client.login(process.env.DISCORD_TOKEN)
