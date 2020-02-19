function show_tag(message, args, Tags) {
    let name = args.one;
    console.log("Searching for tag '" + name + "'");
    Tags.findAll({
        where: {
            name: name
        }
    })
    .then(tags => {
        // If tag doesn't exist
        if(tags.length == 0) {
            return message.util.send("Tag '" + name + "' doesn't exist")}
        // Else
        console.log("Found tag '" +tags[0].name + "' with content '" + tags[0].content + "'");
        return message.util.send(tags[0].content);
    })
}

module.exports = show_tag;