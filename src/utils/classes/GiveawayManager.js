const { GiveawaysManager } = require('discord-giveaways');

class GiveawayManager extends GiveawaysManager {
    constructor({ client }) {
        super(client, {
            storage: './giveaways.json',
            updateCountdownEvery: 10000,
            hasGuildMembersIntent: false,
            default: {
                botsCanWin: false,
                exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
                embedColor: '#FF0000',
                embedColorEnd: '#000000',
                reaction: '🎉'
            }
        })
    }
}

module.exports = GiveawayManager;