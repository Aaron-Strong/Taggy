function delete_tag(message, args, Tags) {
    let name = args.two;
    if(name === "") {
        return message.util.send("Retard, pick a tag to edit!")
    }
    // Check if tag exists
    Tags.findAll({
        where: {
            name: name
        }
    })
    .then(tags => {
        // If tag doesn't exist, exit
        if(tags.length == 0) { return message.util.send("Tag '" + name + "' doesn't exist") };
        // If user doesn't own tag, exit
        if(tags[0].user != message.author.id) { return message.util.send("You can't delete a tag you don't own buddy") }; 
        // Else, edit the tag
        Tags.destroy({
            where: {
              name
            }
          }).then(() => {
            return message.util.send("Deleted tag '" + name + "' successfully");
          });
    });
}

module.exports = delete_tag;