const { Client } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super({ name: 'ready' });
  }

  /**
   * 
   * @param {Client} client 
   */
  async run(client) {

    const guild = client.guilds.cache.get('put your own guild id here');
    try {
      // Register for a single guild
      await this.client.guilds.cache.get("put your own guild id here")?.commands.set(arrayOfSlashCommands);
      console.log('Successfully reloaded application (/) commands.');
      // Register for all the guilds the bot is in
      // await client.application.commands.set(arrayOfSlashCommands);
    } catch (err) {
      return console.log('Unsuccessfully reloaded application (/) commands.');
    }

    client.users.fetch('217655947194007552').then((channel) => {
      channel.send(`Bot is starting on ${guild.name}`).then(message => {
        setTimeout(() => message.delete(), 10000)
      });
    });


    console.log('Guild Count :', client.guilds.cache.size);
  }
}