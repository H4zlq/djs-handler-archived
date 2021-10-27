const { Message, Client } = require("discord.js");
const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class PingCommand extends BaseCommand {
    constructor() {
        super({ name: 'ping', description: 'testing', category: [], aliases: [], permissions: [] })
    }

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async run(client, message, args) {
        message.channel.send(`Ping command works`);
    }
}