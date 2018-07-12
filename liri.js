// REQUIRE NPM MODULES
require("dotenv").config();

// changed var keys = require("./assets/keys"); to 
var keys = require("./keys");
// inorder to simplify file structure removed assets folder
// the reference to the ./keys.js file/module allows you to access its contents with keys. notation --> keys.twitter lets you access the exported twitter object and keys.spotify lets you access the exported spotify object 

var request = require('request');

// including the below code means you must install the twitter node package by following the directions at https://www.npmjs.com/package/twitter
// if a node package is required it must be available in the node_modules folder
// to make it available you must install it
// to install the twitter node package run:
// npm install twitter 
// at the root of you project
var Twitter = require('twitter');

// including the below code means you must install the spotify node package by following the directions at https://www.npmjs.com/package/node-spotify-api
// to install the spotify node package run:
// npm install --save node-spotify-api 
// at the root of you project
var Spotify = require('node-spotify-api');

// GLOBAL VARIABLES
var userInput = process.argv[2];
var movieChoice = process.argv[3];
var screenName = process.argv[3];
var songRequest = process.argv[3];

// FUNCTIONS
function getTweetsFromAnyValidScreenName (screenName) {
    // where to figure all of this out is at https://www.npmjs.com/package/twitter  

    // create new instance of Twitter keys object so you can access API
    var twitterClient = new Twitter(keys.twitter);
    
    // create collection of params to pass to get request
    var params = {
        screen_name: screenName
    };    

    // get request according to the spec at https://www.npmjs.com/package/twitter
    var twitterClient = new Twitter(keys.twitter);
    twitterClient.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (!error) {
          for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].created_at);
            console.log("");
            console.log(tweets[i].text);
          }
        }
    });
}

function getSongFromSpotify (songRequest) {
    // where to figure all of this out is at https://www.npmjs.com/package/node-spotify-api 

    // create new instance of Spotify keys object so you can access API
    var spotify = new Spotify(keys.spotify);

    // what to do if no song is requested
    if (!songRequest) {
       songRequest = "futureworld"; 
    }

    // create collection of params to pass to get request    
    var params = {
        type: 'track',
        query: songRequest,
        limit: 5
    }
    
    // get request according to the spec at https://www.npmjs.com/package/node-spotify-api
    spotify.search(params, function(err, data) {
        
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        
        // simplify returned data object reference 
        var items = data.tracks.items;
        
        // iterate over returned data array to produce horribly formatted display of data
        for (var i = 0; i < items.length; i++) {
            console.log("-----------------------");
            console.log(`Artist Name: ${items[i].artists[0].name}`);
            console.log(`Album Name: ${items[i].album.name}`);
            console.log(`Track Name: ${items[i].name}`);
            console.log("-----------------------");
        }
    });
}

// OMDB using Request npm module
function getMovie() {
    var myKey = "17b63155";

    var movieUrl = "https://www.omdbapi.com/?t=" + movieChoice + "&y=&plot=short&apikey=" + myKey; 

   request(movieUrl, function(error, response, body){
       
       console.log('BODY: ', JSON.parse(body));
   })
   
}

//LOGIC  CASE SWITCH STATEMENT
switch (userInput){
    case 'my-tweets':
    getTweetsFromAnyValidScreenName(screenName);
    break;

    case 'spotify-this-song':
    getSongFromSpotify(songRequest);
    break;

    case 'movie-this':
    getMovie();
    break;
}







