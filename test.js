const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

const request = {
  image: {source: {imageUri: 'https://i.imgur.com/PQOWSsr.jpg'}},
  features: [
    {type: 'SAFE_SEARCH_DETECTION'},
    {type: 'LABEL_DETECTION'}
  ]
};
client
  .annotateImage(request)
  .then(response => {
    console.log("SafeSearch Results\n")
    const safesearch = response[0].safeSearchAnnotation;
    console.log("Adult Content? ", safesearch.adult);
    console.log("Drugs? ", safesearch.medical);
    console.log("Violence? ", safesearch.violence);

    console.log("\n\n")

    console.log("Label Results\n")
    const labels = response[0].labelAnnotations;
    labels.forEach(label => console.log(label.description + ": " + label.score.toFixed(2)) );
    
    // console.log(response[0])
  })
  .catch(err => {
    console.error(err);
  });