var object = {
    key: "Hi",
    Orange: 2,
    array: ["No", 8, true]
}

console.log(object.array[0])

require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });
  

// inquirer.prompt([
//     {
//       type: "input",
//       name: "artist",
//       message: "What artist would you like to know more about?"
//     }
//   ]).then(function (inquirerResponse) {
//     axios
//     .get("https://rest.bandsintown.com/artists/" + inquirerResponse.artist + "/events?app_id=codingbootcamp")
//       .then(function (response) {
//         console.log(response.data)
//       }
//       )
//   })

// inquirer.prompt([
//     {
//         type: "input",
//         name: "spotify",
//         message: "What Song would you like more info about? "
//     }
// ]).then(function (inquirerResponse) {
    spotify.search({ type: 'track', query: "Love Rollercoaster"  }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log('  Artist: ' + data.tracks.items[0].artists[0].name);
        console.log('  Track Name: ' + data.tracks.items[0].name);
        console.log('  Song preview: ' + data.tracks.items[0].preview_url);
        console.log('  Album: ' + data.tracks.items[0].album.name);
    });
// // })

// inquirerResponse.spotify.selector.tracks

var doWhatItSays = function () {
    fs.readFile('random.text', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.split(',');
        data = {
            command: data[0],
            query: data[1]
        };
        console.log(data)
    });
};

doWhatItSays (); 


var randomDate = "02/23/1999";
    var randomFormat = "MM/DD/YYYY";
    var convertedDate = moment(randomDate, randomFormat);

    // Using scripts from moment.js write code below to complete each of the following.
    // Console.log to confirm the code changes you made worked.

    // 1 ...to convert the randomDate into three other date formats
    console.log(convertedDate.format("MM/DD/YY"));