function help_tag(message) {
    return message.util.sendCode("bash",
`.t [tag_name] // Prints a tag from the database\n
.t add [tag_name] [tag_description] // Adds a tag to the database\n
.t list // Prints a list of all tags\n
.t list [user] // Prints a list of a user's tags\n
.t edit [tag_name] [new_tag_description] // Edits a tag\n
.t delete [tag_name] //  If you're the owner, deletes a tag\n 
.t owner [tag_name] // Prints a tag's owner`
    );
}

module.exports = help_tag;