const { error, info } = require('../utils/loggingUtils');
const { getRequestToken, getTimeLineTweets } = require('../utils/twitterUtils');
const { removeCleanTweets } = require('../utils/processingUtils');

module.exports = {
    buildTwitterRoutes: (app, twitter) => {
        /*
            twitter-test
         */
        app.get('/twitter-test', function (reg, res) {
            getRequestToken(twitter).then(data => {
                res.send(data);
            });
        });

        /*
            access-token
         */
        app.get('/access-token', function (reg, res) {
            const requestToken = reg.query.requestToken;
            const requestTokenSecret = reg.query.requestTokenSecret;
            const oauth_verifier = reg.query.oauthVerifier;

            twitter.getAccessToken(
                requestToken,
                requestTokenSecret,
                oauth_verifier,
                (err, accessToken, accessTokenSecret, results) => {
                    if (err) {
                        error(err);
                    } else {
                        console.json({error, accessToken, accessTokenSecret, results});
                        res.send({error, accessToken, accessTokenSecret, results});
                    }
                });
        });

        /*
            get-statuses
         */
        app.get('/get-statuses', function (reg, res) {
            const accessToken = reg.query.accessToken;
            const accessTokenSecret = reg.query.accessTokenSecret;
            const screenName = reg.query.screenName;

            info(`Fetching all tweets for ${screenName}`);
            getTimeLineTweets(
                screenName,
                accessToken,
                accessTokenSecret,
                tweets => {
                    info(`Fetched all Tweets: ${tweets.length}`);
                    const dirtyTweets = removeCleanTweets(tweets);
                    info(`Removed clean tweets: ${dirtyTweets.length}`);
                    res.send({tweets: dirtyTweets});
                },
                twitter
            )

        });
    }
}