const { Client, Interaction, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
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

            const cmd = client.slashCommands.get(interaction.commandName);

            if (!cmd)
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

            cmd.run(client, interaction, args);
        }
    }
}