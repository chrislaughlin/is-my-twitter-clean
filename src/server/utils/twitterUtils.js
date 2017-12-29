const { error, info } = require('./loggingUtils');

const getRequestToken = twitterInstance => {
    return new Promise((resolve, reject) => {
        twitterInstance.getRequestToken(function(err, requestToken, requestTokenSecret, results){
            if (err) {
                console.error(error("Error getting OAuth request token : " + err));
                reject(err);
            } else {
                console.json({requestToken, requestTokenSecret, results});
                console.log(info(`https://twitter.com/oauth/authenticate?oauth_token=${requestToken}`));
                resolve({requestToken, requestTokenSecret, results});
            }
        });
    });
};

module.exports = {
    getRequestToken
};