const { Command } = require("discord-akairo");
const Pagination = require('discord-paginationembed');
const vision = require('@google-cloud/vision');
const isImageUrl = require('is-image-url');
const download = require('image-downloader')


class AnalyseCommand extends Command {
    constructor() {
        super("analyse", {
            aliases: ["analyze", "analyse"],
            args: [
                {
                    id: "one",
                    type: "string"
                }
            ]
        });

        this.visionClient = new vision.ImageAnnotatorClient();
    }

    exec(message, args) {
        if(!args.one) {
            return message.util.send('Please enter an image');
        }
        let member;
        let url;
        try {
            member = this.client.util.resolveMember(args.one, message.guild.members);
        } catch (error) { }
        

        if(isImageUrl(args.one)) {
            message.util.send({code: true, content: `Analysing ${args.one}`});
            url = args.one;
            console.log(args.one);
        }
        else if(member != null) {
            message.util.send({code: true, content: `Analysing ${member.user.displayAvatarURL})`});
            url = member.user.displayAvatarURL;
            console.log(member.user);

        }
        else {
            return message.util.send("No image found");
        }
        console.log(url);

        const downloadOptions = {
            url: url,
            dest: './analyse.jpg' // Save to /path/to/dest/image.jpg
        }


        download.image(downloadOptions).then(({ filename, image }) => {
            console.log("Downloaded file to: " + filename)
            const request = {
                image: {source: {filename: filename}},
                features: [
                {type: 'SAFE_SEARCH_DETECTION'},
                {type: 'LABEL_DETECTION'}
                ]
            };
            this.visionClient
            .annotateImage(request)
            .then(response => {
                let result = [];
                
                console.log("SafeSearch Results\n")
                const safesearch = response[0].safeSearchAnnotation;
                if(safesearch.adult) {
                    console.log("Adult Content", safesearch.adult);
                    result.push(["Adult Content", safesearch.adult]);
                }
                if(safesearch.medical) {
                    console.log("Drugs", safesearch.medical);
                    result.push(["Drugs", safesearch.medical]);
                }
                if(safesearch.violence) {
                    console.log("Violence", safesearch.violence);
                    result.push(["Violence", safesearch.violence]);
                }
                console.log("\n\n");

                console.log("Label Results\n");
                const labels = response[0].labelAnnotations;
                labels.forEach(label => console.log(label.description + ": " + label.score.toFixed(2).substring(2)) );
                labels.forEach(label => {
                    let description = label.description;
                    let score = (label.score.toFixed(2).substring(2)) + "%";
                    result.push([description, score]);
                })
                
                const FieldsEmbed = new Pagination.FieldsEmbed()
                // A must: an array to paginate, can be an array of any type
                .setArray(result)
                // Set users who can only interact with the instance, set as `[]` if everyone can interact.
                .setAuthorizedUsers([message.author.id])
                // A must: sets the channel where to send the embed
                .setChannel(message.channel)
                // Elements to show per page. Default: 10 elements per page
                .setElementsPerPage(20)
                // Have a page indicator (shown on message content)
                .setPageIndicator(false)
                // Disable the default emojis
                .setDisabledNavigationEmojis(['DELETE'])
                // Format based on the array, in this case we're formatting the page based on each object's `word` property
                .formatField(`Image Analysis`, result => (`${result[0]}: ${result[1]}`))
                .setDeleteOnTimeout(false);
                // Customise embed
                FieldsEmbed.embed
                .setColor(0x00FFFF)
                .setTitle('ANALYSE')
            
                // Deploy embed
                return FieldsEmbed.build();
                })
            .catch(err => {
                console.error(err);
                return message.util.send("Something fucked up with vision...");
            });
        }).catch( err => {
            console.error(err);
            return message.util.send("Something fucked up with img-download...")
        })
    }
}

module.exports = AnalyseCommand;
