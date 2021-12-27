const { Client, Interaction } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class InteractionEvent extends BaseEvent {
    constructor() {
        super({ name: 'interactionCreate' });
    }

    /**
     * @param {Client} client 
     * @param {Interaction} interaction 
     * @returns 
     */
    async run(client, interaction) {
        // Slash Command Handling
        if (interaction.isCommand()) {

            const command = client.slashCommands.get(interaction.commandName);

            if (!command)
                return interaction.followUp({ content: "An error has occured " });

            const args = [];

            for (let option of interaction.options.data) {
                if (option.type === "SUB_COMMAND") {
                    if (option.name) args.push(option.name);
                    option.options?.forEach((x) => {
                        if (x.value) args.push(x.value);
                    });
                } else if (option.value) args.push(option.value);
            }

            command.run(client, interaction);
        }

        // Context Menu Handling
        if (interaction.isContextMenu()) {
            const command = client.contextMenus.get(interaction.commandName);
            if (command) command.run(client, interaction);
        }
    }
}