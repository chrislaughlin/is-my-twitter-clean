const sentiment = require('sentiment');
const { info } = require('./loggingUtils');

const processTweetSentiment = tweet => {
    const sent = sentiment(tweet.text);
    // info(`Score: ${sent.score} | Text: ${tweet.text}`);
    return {
        clean: sent.score > -10,
        sent,
        tweet
    }
};

const removeCleanTweets = tweets => {
    return tweets.reduce((prev, curr) => {
        const processedTweet = processTweetSentiment(curr);
        if (!processedTweet.clean) {
            return [...prev, processedTweet];
        }
        return prev;
    }, []);
};

module.exports = {
    removeCleanTweets
};