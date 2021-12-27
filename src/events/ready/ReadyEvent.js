const { Client } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');
const { arrayOfSlashCommands, arrayOfContextMenus } = require('../../utils/registry');
const arrayOfInteraction = arrayOfSlashCommands.concat(arrayOfContextMenus);
module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super({ name: 'ready' });
  }

  /**
   * 
   * @param {Client} client 
   */
  async run(client) {
    try {
      // Register for a single guild
      const guild = client.guilds.cache.get('put your own guild id here');
      await guild.commands.set(arrayOfInteraction).then((command) => {
        const getRoles = (commandName) => {
          const permissions = arrayOfSlashCommands.find(x => x.name === commandName)?.userPermissions;

          if (!permissions) return null;
          return guild.roles.cache.filter(x => x.permissions.has(permissions) && !x.managed)
        }

        const fullPermissions = command.reduce((acc, value) => {
          const roles = getRoles(value.name);
          if (!roles) return acc;

          const permissions = roles.reduce((a, v) => {
            return [
              ...a,
              {
                id: v.id,
                type: 'ROLE',
                permission: true
              }
            ];
          }, []);

          return [
            ...acc,
            {
              id: value.id,
              permissions
            }
          ]
        }, []);

        guild.commands.permissions.set({ fullPermissions });
      });
      console.log('Successfully reloaded application (/) commands.');
      // Register for all the guilds the bot is in
      // await client.application.commands.set(arrayOfSlashCommands);
    } catch (err) {
      console.error(err);
      console.log('Unsuccessfully reloaded application (/) commands.');
    }

    console.log('Guild Count :', client.guilds.cache.size);
  }
}