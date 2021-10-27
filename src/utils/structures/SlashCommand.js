module.exports = class SlashCommand {
    constructor({ name, description, options }) {
        this.name = name;
        this.description = description;
        this.options = options;
    }
}