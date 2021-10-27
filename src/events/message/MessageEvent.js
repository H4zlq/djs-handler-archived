const { Client, Message } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');
const Model = require('../../database/mongo/schemas/blacklist-schema');

const getRegex = (regex) => new RegExp(regex);

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super({ name: 'messageCreate' });
  }

  /**
  * @param {Client} client 
  * @param {Message} message 
  * @returns 
  */
  async run(client, message) {

    const regex = getRegex(`<@!?${client.user.id}>`);

    if (message.author.bot) return;
    if (message.content.match(regex)) message.channel.send({ content: 'Hello, I am a bot tester developed by nхιм.' })
    if (message.content.startsWith(client.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(client.prefix.length)
        .trim()
        .split(/\s+/);

      const aliases = client.commands.find(c => c.aliases?.includes(cmdName));
      const command = client.commands.get(cmdName || aliases);

      if (!message.member.permissions?.has(command.permissions)) return message.channel.send('You dont have a permissions to execute this command!');

      if (command) command.run(client, message, cmdArgs);
    }
  }
}