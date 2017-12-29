require('console-json');

const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const red = chalk.red;
const blue = chalk.blue;

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const twitterConfig = require('./twitterConfig');
const twitterAPI = require('node-twitter-api');
const twitter = new twitterAPI({
    consumerKey: twitterConfig.consumerKey,
    consumerSecret: twitterConfig.consumerSecret,
    callback: twitterConfig.callBackUrl
});

const { getRequestToken } = require('./utils/twitterUtils');

app.set('port', (process.env.PORT || 3000));

try {
    fs.statSync('dist');
    console.log('Serving static build from dist/');
    console.log('Run `npm run clean` to return to development mode');
    app.use('/', express.static(path.join(__dirname, 'dist')));
}
catch (e) {
    console.log('Serving development build with nwb middleware');
    console.log('Run `npm run build` to create a production build');
    app.use(require('nwb/express')(express))
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Cache-Control', 'no-cache');
    next()
});

app.get('/twitter-test', function (reg, res) {
    getRequestToken(twitter).then(data => {
        res.send(data);
    });
});

app.get('/access-token', function (reg, res) {
    const requestToken = reg.query.requestToken;
    const requestTokenSecret = reg.query.requestTokenSecret;
    const oauth_verifier = reg.query.oauthVerifier;

    twitter.getAccessToken(
        requestToken,
        requestTokenSecret,
        oauth_verifier,
        (error, accessToken, accessTokenSecret, results) => {
            if (error) {
                console.log(error);
            } else {
                console.json({error, accessToken, accessTokenSecret, results});
                res.send({error, accessToken, accessTokenSecret, results});
            }
    });
});

const getTimeLineTweets = (screenName, accessToken, accessTokenSecret, done) => {
    let options = {
        screen_name: screenName,
        count: 200
    };

    const fetchTweets = (tweets, sinceLastId) => {
        console.log(blue(`Fetching tweets:  count ${tweets.length}`));
        if (sinceLastId) {
            options.max_id = sinceLastId
        }
        twitter.getTimeline(
            "user_timeline",
            options,
            accessToken,
            accessTokenSecret,
            function(error, data) {
                if (error) {
                    console.error(red(error));
                } else {
                    console.log(blue(`Fetched ${tweets.length} tweets`));
                    if (data.length !== 0) {
                        console.log(blue('Fetching more'));
                        console.log(blue(`Last ID ${data[data.length - 1].text}`));
                        return fetchTweets(
                            [].concat(data, tweets),
                            data[data.length - 1].id
                        );
                    } else {
                        console.log(blue('Resolving all'));
                        done([].concat(data, tweets));
                    }
                }
            }
        );
    };
    fetchTweets([]);
};

app.get('/get-statuses', function (reg, res) {
    const accessToken = reg.query.accessToken;
    const accessTokenSecret = reg.query.accessTokenSecret;
    const screenName = reg.query.screenName;

    console.log(blue(`Fetching all tweets for ${screenName}`));
    getTimeLineTweets(
        screenName,
        accessToken,
        accessTokenSecret,
        tweets => {
            console.log(blue('Returning all tweets'));
            res.send({tweets});
        }
    )

});

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/')
});