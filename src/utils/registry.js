const path = require('path');
const fs = require('fs').promises;
const BaseCommand = require('./structures/BaseCommand');
const SlashCommand = require('./structures/SlashCommand');
const BaseEvent = require('./structures/BaseEvent');
const arrayOfSlashCommands = [];
const arrayOfContextMenus = [];

const registerCommands = async (client, dir = '') => {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerCommands(client, path.join(dir, file));
    if (file.endsWith('.js')) {
      const Command = require(path.join(filePath, file));
      if (Command.prototype instanceof BaseCommand) {
        const cmd = new Command();
        client.commands.set(cmd.name, cmd);
        cmd.aliases.forEach((alias) => {
          client.commands.set(alias, cmd);
        });
      }
    }
  }
}

const registerSlashCommands = async (client, dir = '') => {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerSlashCommands(client, path.join(dir, file));
    if (file.endsWith('.js')) {
      const Command = require(path.join(filePath, file));
      if (Command.prototype instanceof SlashCommand) {
        const cmd = new Command();
        client.slashCommands.set(cmd.name, cmd);
        if (cmd.userPermissions) cmd.defaultPermission = false;
        arrayOfSlashCommands.push(cmd);
      }
    }
  }
}

const registerContextMenus = async (client, dir = '') => {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerContextMenus(client, path.join(dir, file));
    if (file.endsWith('.js')) {
      const Command = require(path.join(filePath, file));
      if (Command.prototype instanceof ContextMenu) {
        const cmd = new Command();
        client.contextMenus.set(cmd.name, cmd);
        arrayOfContextMenus.push(cmd);
      }
    }
  }
}

const registerEvents = async (client, dir = '') => {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerEvents(client, path.join(dir, file));
    if (file.endsWith('.js')) {
      const Event = require(path.join(filePath, file));
      if (Event.prototype instanceof BaseEvent) {
        const event = new Event();
        client.events.set(event.name, event);
        client.on(event.name, event.run.bind(event, client));
      }
    }
  }
}

module.exports = {
  registerCommands,
  registerSlashCommands,
  registerContextMenus,
  registerEvents,
  arrayOfSlashCommands,
  arrayOfContextMenus
};