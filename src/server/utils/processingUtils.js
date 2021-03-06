const sentiment = require('sentiment');

const processTweetSentiment = tweet => {
    const sent = sentiment(tweet.text);
    return {
        clean: sent.score > -1,
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