const Pagination = require('discord-paginationembed');

function list_tag(message, Tags) {
    // Check if tag exists
    Tags.findAll().then(tags => {
        // Make tags self aware of their current index
        tags.forEach(function(tag, index) {
            tag.index = index;
        });

        // Create pagination
        const FieldsEmbed = new Pagination.FieldsEmbed()
        // A must: an array to paginate, can be an array of any type
        .setArray(tags)
        // Set users who can only interact with the instance, set as `[]` if everyone can interact.
        .setAuthorizedUsers([message.author.id])
        // A must: sets the channel where to send the embed
        .setChannel(message.channel)
        // Elements to show per page. Default: 10 elements per page
        .setElementsPerPage(10)
        // Have a page indicator (shown on message content)
        .setPageIndicator(true)
        // Disable the default emojis
        .setDisabledNavigationEmojis(['DELETE'])
        // Format based on the array, in this case we're formatting the page based on each object's `word` property
        .formatField('All the tags! (' + tags.length + ")", tag => ((tag.index + 1) + ". " + tag.name))
        .setDeleteOnTimeout(true);
        // Customise embed
        FieldsEmbed.embed
        .setColor(0x00FFFF)
        .setTitle('TAGS!')
        
        // Deploy embed
        FieldsEmbed.build();
        return;
    });
}



module.exports = list_tag;