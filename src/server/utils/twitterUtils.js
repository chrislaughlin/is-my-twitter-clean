const { error, info } = require('./loggingUtils');

const getRequestToken = twitterInstance => {
    return new Promise((resolve, reject) => {
        twitterInstance.getRequestToken(function(err, requestToken, requestTokenSecret, results){
            if (err) {
                error(`Error getting OAuth request token :  ${err}`);
                reject(err);
            } else {
                console.json({requestToken, requestTokenSecret, results});
                info(`https://twitter.com/oauth/authenticate?oauth_token=${requestToken}`);
                resolve({requestToken, requestTokenSecret, results});
            }
        });
    });
};

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
                    done([]);
                } else {
                    info(`Fetched ${data.length} tweets`);
                    if (data.length > 1 && data.length < 195) {
                        info('Resolved all');
                        done([].concat(data, tweets));
                    } else {
                        info('Fetching more');
                        return fetchTweets(
                            [].concat(data, tweets),
                            data[data.length - 1].id
                        );
                    }
                }
            }
        );
    };
    fetchTweets([]);
};

const deleteTweet = (uuid, accessToken, accessTokenSecret, twitter, done) => {
    info(JSON.stringify({uuid, accessToken, accessTokenSecret, twitter, done}, null, 4));
    twitter.statuses('destroy', {
            id: uuid
        },
        accessToken,
        accessTokenSecret,
        function (err) {
            if (err) {
                error(JSON.stringify(err));
                done();
            } else {
                info(`deleted ${uuid} tweet`);
                done();
            }
        }
    )
};


module.exports = {
    getRequestToken,
    getTimeLineTweets,
    deleteTweet
};