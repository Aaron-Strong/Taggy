const { Inhibitor } = require('discord-akairo');
const { blacklist } = require('../env.js')

class BlacklistInhibitor extends Inhibitor {
    constructor() {
        super('blacklist', {
            reason: 'blacklist'
        })
    }

    exec(message) {
        if(!blacklist) {
            blacklist = [""];
        }
        return blacklist.includes(message.author.id);
    }
}

module.exports = BlacklistInhibitor;