const { error, info } = require('../utils/loggingUtils');
const { getRequestToken, getTimeLineTweets, deleteTweet } = require('../utils/twitterUtils');
const { removeCleanTweets } = require('../utils/processingUtils');

module.exports = {
    buildTwitterRoutes: (app, twitter) => {
        /*
            request-token
         */
        app.get('/request-token', function (reg, res) {
            info('Requesting request token');
            getRequestToken(twitter).then(data => {
                info(`- Request token accessed -`);
                info(`requestToken: ${data.requestToken}`);
                info(`requestTokenSecret: ${data.requestTokenSecret}`);
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
            info('Getting Access Token with the following props:');
            info(`requestToken: ${requestToken}`);
            info(`requestTokenSecret: ${requestTokenSecret}`);
            info(`oauth_verifier: ${oauth_verifier}`);
            twitter.getAccessToken(
                requestToken,
                requestTokenSecret,
                oauth_verifier,
                (err, accessToken, accessTokenSecret, results) => {
                    if (err) {
                        error(JSON.stringify(err));
                        res.send({error});
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

        /*
            delete tweet
         */
        app.post('/delete-tweet', function (reg, res) {
            const uuid = reg.body.uuid;
            const accessToken = reg.body.accessToken;
            const accessTokenSecret = reg.body.accessTokenSecret;

            info(`deleting tweet UUID: ${uuid}`);
            deleteTweet(
                uuid,
                accessToken,
                accessTokenSecret,
                twitter,
                () => res.send({})
            )

        });
    }
}