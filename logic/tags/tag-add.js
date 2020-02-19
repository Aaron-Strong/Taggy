function add_tag(message, args, Tags) {
    let name = args.two;
    let content = args.three;
    if(content === "") {
        return message.util.send("Retard, add some content to that tag!")
    }
    // Check if tag exists
    Tags.findAll({
        where: {
            name: name
        }
    })
    .then(tags => {
        // If tag exists
        if(tags.length != 0) {return message.util.send("Tag '" + name + "' already exists :C")};
        // Else
        Tags.create({ name, content, user: message.author.id  }).then(tag => {
            return message.util.send("Added tag '" + name + "' successfully");
        }).catch((e) => {
            console.log("Error Adding a tag", e);
            return message.util.send("Error Adding Tag");
        })
    });
}

module.exports = add_tag;