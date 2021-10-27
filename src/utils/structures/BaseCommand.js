module.exports = class BaseCommand {
  constructor({ name, description, category, aliases, permissions }) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.aliases = aliases;
    this.permissions = permissions;
  }
}