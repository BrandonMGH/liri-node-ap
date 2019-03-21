require("dotenv").config();
var fs = require("fs");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var inquirer = require("inquirer");
var moment = require('moment');
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});


function MovieOptions () {
  inquirer.prompt([
    {
      type: "input",
      name: "movie",
      message: "movie-this"
    }
  ]).then(function (inquirerResponse) {
    if (inquirerResponse.movie.length === 0) {
      inquirerResponse.movie = 'Mr. Nobody';
  }
    axios
      .get("http://www.omdbapi.com/?t=" + inquirerResponse.movie + "&y=&plot=short&apikey=trilogy")
      .then(function (response) {
        console.log('================ Movie Info ================')
        console.log("Title: " + response.data.Title )
        console.log("Release Year: " + response.data.Released)
        console.log("IMDB Movie Rating: " + response.data.Ratings[1].Value)
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[2].Value)
        console.log("Country: " + response.data.Country)
        console.log("Language: " + response.data.Language)
        console.log("Plot: " + response.data.Plot)
        console.log("Actors: " + response.data.Actors)
        console.log('============================================')
      })
  })
}

function ConcertOptions () {
  inquirer.prompt([
    {
      type: "input",
      name: "artist",
      message: "concert-this"
    }
  ]).then(function (inquirerResponse) {
    axios
      .get("https://rest.bandsintown.com/artists/" + inquirerResponse.artist + "/events?app_id=codingbootcamp")
      .then(function (response) {
        let venueTime = response.data[0].datetime
        let convertedDate = moment(venueTime).format("MM/DD/YY"); 

        console.log('================ Concert Info =================');
        console.log("Venue Name: " + response.data[0].venue.name);
        console.log("Venue City: " + response.data[0].venue.city);
        console.log("Venue Country: " + response.data[0].venue.country);
        console.log("Venue Time: " + convertedDate); 
        console.log('===============================================');
      }
      )
  })
}

function SpotifyOptions () {
  inquirer.prompt([
    {
      type: "input",
      name: "spotify",
      message: "spotify-this-song"
    }
  ]).then(function (inquirerResponse) {
     if (inquirerResponse.spotify.length === 0) {
      inquirerResponse.spotify = "The Sign Ace";
    }
    spotify.search({ type: 'track', query: inquirerResponse.spotify }, function (err, data) {
      if (err) {
        console.log('Error occurred: ' + err);
        return;
      }
      console.log('================ Song Info ================')
      console.log('  Artist: ' + data.tracks.items[0].artists[0].name);
      console.log('  Track Name: ' + data.tracks.items[0].name);
      console.log('  Song preview: ' + data.tracks.items[0].preview_url);
      console.log('  Album: ' + data.tracks.items[0].album.name);
      console.log('===========================================')

    });
  })
}

function doWhatItSaysResponse (intake) {
  spotify.search({ type: 'track', query: intake }, function (err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
        return;
    
    }
    console.log('================ Song Info ================')
    console.log('  Artist: ' + data.tracks.items[0].artists[0].name);
    console.log('  Track Name: ' + data.tracks.items[0].name);
    console.log('  Song preview: ' + data.tracks.items[0].preview_url);
    console.log('  Album: ' + data.tracks.items[0].album.name);
    console.log('===========================================')
});
}

 function doWhatItSays() {
  fs.readFile('random.text', 'utf8', function (err, data) {
      if (err) {
          return console.log(err);
      }
      data = data.split(',');
      songEntry = data[1]
     doWhatItSaysResponse(songEntry)
  });
};

inquirer.prompt([
  {
    type: "list",
    name: "selector",
    choices: ["MovieInfo", "ConcertInfo", "SpotifyInfo", "AutomateResponse"],
    message: "Hello. What would you like to look up today?",
  },
]).then(function (inquirerResponse) {
  console.log(inquirerResponse);
  if (inquirerResponse.selector === "MovieInfo") {
     MovieOptions(); 
   } else if (inquirerResponse.selector === "ConcertInfo") {
    ConcertOptions(); 
  } else if (inquirerResponse.selector === "SpotifyInfo") {
    SpotifyOptions();
  } else if (inquirerResponse.selector === "AutomateResponse") {
    doWhatItSays(); 
  }
});






// console.log(JSON.stringify(response.data, null, 2));


// console.log(JSON.stringify(response.data, null, 2));


