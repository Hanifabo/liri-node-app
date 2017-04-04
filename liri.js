/**
 * Created by hanifa on 3/29/17.
 */
var Twitter = require('twitter');
var keys = require("./keys.js")
var request = require("request");
//var Spotify = require('spotify-web-api-js');
var fs = require('fs');


var option = process.argv[2];
var searchTerm = process.argv[3];

function movie_this(movieName){

    // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&r=json", function(error, response, body) {

        // returns a status code of 200 if the request is successful)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and print the desired informatin
            console.log("=============================================== ===============================================")
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("imdbRating: " + JSON.parse(body).imdbRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("plot: " + JSON.parse(body).plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Source);
            console.log("=============================================== ===============================================")
           // console.log("The movie's rating is: " + JSON.parse(body));
           // console.log("The movie's rating is: " + JSON.parse(body));

            //console.log("I'M HERE NOW FOR TESTING");
        }
    });

    }

function spotify_this_song(movieName){

    if(searchTerm<0){
        searchTerm = "The%20Sign%20by%20Ace%20of%20Base";
    }
        request("https://api.spotify.com/v1/search?q=Ride%20Twenty%20One%20Pilots&type=track&limit=1", function(error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {

                console.log("=============================================== ===============================================")
                 console.log("Artists: " + JSON.parse(body).tracks.items[0].artists[0].name);
                 console.log("The Song's Name: " + JSON.parse(body).tracks.items[0].name);
                 console.log("preview_url: " + JSON.parse(body).tracks.items[0].preview_url);
                 console.log("Album: " + JSON.parse(body).tracks.items[0].album.name);
                console.log("=============================================== ===============================================")
            }
        });
};

function do_what_i_say(){

    fs.readFile("random.txt",'utf8', function (err, data) {

        if(err) console.log(err);

        var frstOption = data.split(",")[0];
        var scndOption = data.split(",")[1];
        console.log("******"+frstOption)
        console.log("******"+scndOption)
        //console.log(data)

    });

    if(searchTerm<0){
        searchTerm = "The%20Sign%20by%20Ace%20of%20Base";
    }


    request("https://api.spotify.com/v1/search?q=Ride%20Twenty%20One%20Pilots&type=track&limit=1", function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            console.log("=============================================== ===============================================")
            console.log("Artists: " + JSON.parse(body).tracks.items[0].artists[0].name);
            console.log("The Song's Name: " + JSON.parse(body).tracks.items[0].name);
            console.log("preview_url: " + JSON.parse(body).tracks.items[0].preview_url);
            console.log("Album: " + JSON.parse(body).tracks.items[0].album.name);
            console.log("=============================================== ===============================================")
        }
    });
};

function tweetMe() {

    var client = new Twitter ({

        consumer_key: 'igGQ4M0G2GDhjFIPOHGpUo7Dz',
        consumer_secret: 'GQpDKFQsKb0OtkdVcZwXfZ6LAeglbEifozjrvKc8CYgQuWsJGv',
        access_token_key: '2813622571-Jx3BQ1DNthDCJXWOJAGvIZQ4aPBednpZuxZIqcK',
        access_token_secret: 'IBJlBaIU9rYCOkpZYEdx41S7KTitHDv76A6iKcPzNJUh3'

        // consumer_key: keys.twitterKeys.consumer_key,
        // consumer_secret: keys.twitterKeys.consumer_secret,
        // access_token_key: keys.twitterKeys.access_token_key,
        // access_token_secret: keys.twitterKeys.access_token_secret,
    });
    //screen_name: 'ImanBenjamin_'
    var params = {screen_name: 'ImanBenjamin_',count:20,};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        if (!error) {
            console.log('===================================================================================================');
            for (var i =0; i < tweets.length; i++){
                var tweeter = tweets[i];
                console.log(tweeter.text);
            }
            console.log('===================================================================================================');
        }
        else {
            console.log(error);
        }
    });

};

switch (option){
    case "movie-this":{
        movie_this(searchTerm);
        break;
    }
    case "spotify-this-song":{
        spotify_this_song(searchTerm);
        break;
    }
    case "my-tweets":{
        console.log(keys.twitterKeys.consumer_key);
        tweetMe();
        break;
    }
    case "do-what-i-say":{
        do_what_i_say(searchTerm);
        break;
    }

};