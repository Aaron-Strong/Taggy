function edit_tag(message, args, Tags) {
    let name = args.two;
    let content = args.three;
    if(name === "") {
        return message.util.send("Retard, pick a tag to edit!")
    }
    if(content === "") {
        return message.util.send("Retard, give the new tag some content!")
    }
    // Check if tag exists
    Tags.findAll({
        where: {
            name: name
        }
    })
    .then(tags => {
        // If tag exists
        if(tags.length == 0) {return message.util.send("Tag '" + name + "' doesn't exist")};
        // Else
        Tags.update({ content }, {
            where: {
              name
            }
          }).then(() => {
            return message.util.send("Edited tag '" + name + "' successfully");
          });
    });
}

module.exports = edit_tag;