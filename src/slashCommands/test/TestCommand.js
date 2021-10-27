const { Client, CommandInteraction, MessageActionRow, MessageButton } = require('discord.js');
const SlashCommand = require('../../utils/structures/SlashCommand');

module.exports = class TestCommand extends SlashCommand {
    constructor() {
        super({ name: 'test', description: 'Test a new slash commands' });
    }

    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    async run(client, interaction, args) {

        interaction.deferReply({}).catch({});

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('primary')
                    .setLabel('Click me!')
                    .setStyle('PRIMARY')
            )

        interaction.followUp(({ content: 'Pong!', components: [row] }))

        const filter = (i) => i.customId === 'primary' && i.user.id === interaction.user.id;

        const wait = require('util').promisify(setTimeout);

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 })

        collector.on('collect', async i => {
            if (i.customId === 'primary') {
                await i.deferUpdate();
                await wait(4000);
                await i.editReply({ content: 'A button was clicked!', components: [] });
            }
        })

        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    }
}