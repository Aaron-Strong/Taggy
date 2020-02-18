const { Inhibitor } = require('discord-akairo');

class BlacklistInhibitor extends Inhibitor {
    constructor() {
        super('blacklist', {
            reason: 'blacklist'
        })
    }

    exec(message) {
        // Blacklist mehdi cuz he's a cunt!
        const blacklist = ['155763335369981953'];
        return blacklist.includes(message.author.id);
    }
}

module.exports = BlacklistInhibitor;