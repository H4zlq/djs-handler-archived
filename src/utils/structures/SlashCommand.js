module.exports = class SlashCommand {
    constructor({ name, description, options, userPermissions }) {
        this.name = name;
        this.description = description;
        this.options = options;
        this.userPermissions = userPermissions;
    }
}