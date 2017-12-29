const { error, info } = require('../utils/loggingUtils');
const { getRequestToken } = require('../utils/twitterUtils');

const getTimeLineTweets = (screenName, accessToken, accessTokenSecret, done, twitter) => {
    let options = {
        screen_name: screenName,
        count: 200
    };

    const fetchTweets = (tweets, sinceLastId) => {
        info(`Fetching tweets:  count ${tweets.length}`);
        if (sinceLastId) {
            options.max_id = sinceLastId
        }
        twitter.getTimeline(
            "user_timeline",
            options,
            accessToken,
            accessTokenSecret,
            function(err, data) {
                if (err) {
                    error(err);
                } else {
                    info(`Fetched ${tweets.length} tweets`);
                    if (data.length !== 0) {
                        info('Fetching more');
                        info(`Last ID ${data[data.length - 1].text}`);
                        return fetchTweets(
                            [].concat(data, tweets),
                            data[data.length - 1].id
                        );
                    } else {
                        info('Resolving all');
                        done([].concat(data, tweets));
                    }
                }
            }
        );
    };
    fetchTweets([]);
};

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
                    info('Returning all tweets');
                    res.send({tweets});
                },
                twitter
            )

        });
    }
}