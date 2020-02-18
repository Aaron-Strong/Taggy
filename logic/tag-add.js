function add_tag(message, args, Tags) {
    let name = args.two;
    let content = args.three;
    if(args.two === "") {
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
        Tags.create({ name, content }).then(tag => {
            console.log("Created tag with id: ", tag.id);
        });
        return message.util.send("Added tag '" + name + "' successfully");
    });
    return;
}

module.exports = add_tag;