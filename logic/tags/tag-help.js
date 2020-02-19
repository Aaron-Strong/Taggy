function help_tag(message) {
    return message.util.sendCode("bash",
`.t [tag_name] // Shows a tag\n
.t add [tag_name] [tag_description] // Adds a tag\n
.t list displays a list of all tags\n
.t edit [tag_name] [new_tag_description] // Edits a tag`
    );
}

module.exports = help_tag;