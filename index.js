'use strict';

require("date-utils");
const DashButton = require("dash-button");
const Twitter = require("twitter");
const config  = require("./config.json");

// twitter client
var client = new Twitter({
    consumer_key: config.twitter_credentials.consumer_key,
    consumer_secret: config.twitter_credentials.consumer_secret,
    access_token_key: config.twitter_credentials.access_token_key,
    access_token_secret: config.twitter_credentials.access_token_secret
});

// button constructor
let button = new DashButton(config.mac_address);


console.log("Stand by...");

// button push listener
button.addListener(() => {
    var dt = new Date();
    var outputDate = dt.toFormat("YYYY/MM/DD HH24:MI:SS");
    var tweet = "うんこなう。\n" + "[" + outputDate + "にうんこをしました。" + "]";
    client.post('statuses/update', {status:tweet}, function(error, tweet, response) {
        if(!error) {
            console.log(tweet.text);
        } else {
            console.log(error);
        }
    });
});
