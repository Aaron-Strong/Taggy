const { Command } = require("discord-akairo");
const Pagination = require('discord-paginationembed');
const vision = require('@google-cloud/vision');
const isImageUrl = require('is-image-url');
const download = require('image-downloader')


class ScanCommand extends Command {
    constructor() {
        super("scan", {
            aliases: ["scan"],
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
        if(!isImageUrl(args.one)) {
            return message.util.send("Please enter an image")
        }

        const downloadOptions = {
            url: args.one,
            dest: './analyse.jpg' // Save to /path/to/dest/image.jpg
        }


        download.image(downloadOptions).then(({ filename, image }) => {
            console.log("Downloaded file to: " + filename)
            const request = {
                image: {source: {filename: filename}}
            };
            this.visionClient
            .faceDetection(request)
            .then(response => {
                let result = [];
                
                console.log(response);
                console.log("Face Results\n");
                const faces = response[0].faceAnnotations;
                if(!faces.length) {
                    return message.util.send("Google can't find any faces :C")
                }
                faces.forEach((face, i) => {
                    console.log(`  Face #${i + 1}:`);
                    console.log(`    Joy: ${face.joyLikelihood}`);
                    console.log(`    Anger: ${face.angerLikelihood}`);
                    console.log(`    Sorrow: ${face.sorrowLikelihood}`);
                    console.log(`    Surprise: ${face.surpriseLikelihood}`);
                  });
                
                faces.forEach((face, i ) => {
                    result.push(['Face ' + i, ""]);
                    result.push(["", ""]);
                    result.push(["Joy:", face.joyLikelihood])
                    result.push(["Anger:", face.angerLikelihood])
                    result.push(["Sorrow:", face.sorrowLikelihood])
                    result.push(["Surprise:", face.surpriseLikelihood])
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
                .formatField(`Image Analysis`, result => (`${result[0]} ${result[1]}`))
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

module.exports = ScanCommand;