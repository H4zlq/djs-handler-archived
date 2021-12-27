const { Client, ContextMenuInteraction } = require('discord.js');
const ContextMenu = require('../../utils/structures/ContextMenu');

module.exports = class extends ContextMenu {
    constructor() {
        super({ name: 'Test Context Menu', type: 'MESSAGE' });
    }

    /**
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     */
    async run(client, interaction) {
        interaction.followUp({ content: 'Test context menu' });
    }
}