const { Command } = require("discord-akairo");
const { Tags } = require("../logic/database")
const tag_add = require("../logic/tag-add");
const tag_show = require("../logic/tag-show");
const tag_edit = require("../logic/tag-edit");

class TagCommand extends Command {
    constructor() {
        super("tag", {
           aliases: ["t", "tag"],
            args: [
                {
                    id: "one",
                    type: "string",
                    default: ""
                },
                {
                    id: "two",
                    type: "string",
                    default: ""
                },
                {
                    id: "three",
                    type: "string",
                    default: "",
                    match: "rest"
                }
            ]
        });
    }

    exec(message, args) {
        const intent = args.one.toLowerCase();
        if(intent === "") {
            // TODO: Help Docs
            return message.util.send("t [tag_name]\n.t add tag_name tag_description");
        }
        else if (intent === "add") {
            tag_add(message, args, Tags);
        }
        else if (intent === "edit") {
            tag_edit(message, args, Tags);
        }
        else if (intent === "list") {
            // TODO: Add list logic
            return message.util.send("_Tag Command List Placeholder_");
        } 
        else {
            tag_show(message, args, Tags)
        }
    }
}

module.exports = TagCommand;