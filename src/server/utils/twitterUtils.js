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
    getRequestToken,
    getTimeLineTweets
};