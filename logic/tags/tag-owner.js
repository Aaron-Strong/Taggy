function owner_tag(message, args, Tags, util) {
    let name = args.two;
    
    
    Tags.findAll({
        where: {
            name: args.two
        }
    }).then((tags) => {
        // If tag doesn't exist, exit
        if(tags.length == 0) { return message.util.send("Tag '" + name + "' doesn't exist") };
        let member;
        // If we can't find that member, exit function nicely;
        try {
            member = util.resolveMember(tags[0].user, message.guild.members);
        } catch (error) { }
        console.log("member!" + member)
        if(member == null) {
            return message.util.send(`User isn't in the server anymore :C ID: ${tags[0].user}`);
        }
        return message.util.send(`Tag ${name} owned by ${member.displayName}`)
    })
}



module.exports = owner_tag;