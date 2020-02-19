const { Command } = require("discord-akairo");
const { Tags } = require("../logic/database");
const tag_help = require("../logic/tags/tag-help");
const tag_add = require("../logic/tags/tag-add");
const tag_edit = require("../logic/tags/tag-edit");
const tag_list_all = require("../logic/tags/tag-list-all");
const tag_list = require("../logic/tags/tag-list");
const tag_show = require("../logic/tags/tag-show");
const tag_delete = require("../logic/tags/tag-delete");

class TagCommand extends Command {
    constructor() {
        super("tag", {
            aliases: ["t", "tag"],
            typing: true,
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
        if(intent === "" || intent === "help" || intent === "h") {
            tag_help(message);
        }
        else if (intent === "add") {
            tag_add(message, args, Tags);
        }
        else if (intent === "edit") {
            tag_edit(message, args, Tags);
        }
        else if (intent === "delete") {
            tag_delete(message, args, Tags)
        }
        else if (intent === "list") {
            if(args.two.toLowerCase() === "all" || args.two === ""){
                 tag_list_all(message, Tags);
            }
            else { tag_list(message, args, Tags, this.client.util); }
        } 
        else {
            tag_show(message, args, Tags)
        }
    }
}

module.exports = TagCommand;