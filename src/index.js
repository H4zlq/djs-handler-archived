const { Client, Collection } = require('discord.js');
const { registerCommands, registerSlashCommands, registerEvents, registerContextMenus } = require('./utils/registry');
const { token, prefix, useDatabase } = require('../config.json');

class MyClient extends Client {
    constructor({ token }) {
        super({ intents: 32767 });

        // Collection
        this.commands = new Collection();
        this.slashCommands = new Collection();
        this.contextMenus = new Collection();
        this.events = new Collection();
        this.token = token;
        this.prefix = prefix;

        // Register handler
        this.registerHandlers();

        /**
         * Connect to Mongo Database
         * if you dont want to use database
         * please set `useDatabase` to false
         * on config.
         */
        if (useDatabase) require('./database/mongo/connection'); 
    }

    async registerHandlers() {
        await registerCommands(this, '../commands');
        await registerSlashCommands(this, '../slashCommands');
        await registerContextMenus(this, '../contextMenus');
        await registerEvents(this, '../events');
    }

    register() {
        return super.login(this.token);
    }
}

const client = new MyClient({ token });

(async () => {
    // Connect to Discord API
    await client.register();
})();

