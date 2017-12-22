const fs = require('fs');
const path = require('path');
require('console-json');

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
    twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
        if (error) {
            console.log("Error getting OAuth request token : " + error);
        } else {
            console.json({requestToken, requestTokenSecret, results});
            console.log(`https://twitter.com/oauth/authenticate?oauth_token=${requestToken}`);
            res.send({requestToken, requestTokenSecret, results});
        }
    });
});

app.get('/access-token', function (reg, res) {
    const requestToken = reg.query.requestToken;
    const requestTokenSecret = reg.query.requestTokenSecret;
    const oauth_verifier = reg.query.oauthVerifier;

    twitter.getAccessToken(requestToken, requestTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
        if (error) {
            console.log(error);
        } else {
            console.json({error, accessToken, accessTokenSecret, results});
            res.send({error, accessToken, accessTokenSecret, results});
        }
    });
});

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/')
});