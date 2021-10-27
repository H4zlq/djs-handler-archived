const { Client, Message } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class TestCommand extends BaseCommand {
    constructor() {
        super({ name: 'test', description: 'testing', category: [], aliases: [], permissions: [] })
    }

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async run(client, message, args) {
        message.channel.send('Test command works');
    }
}