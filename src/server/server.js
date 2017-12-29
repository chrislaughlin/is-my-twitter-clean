require('console-json');
//System imports
const fs = require('fs');
const path = require('path');
//Express Imports
const express = require('express');
const bodyParser = require('body-parser');
//Twitter Imports
const twitterConfig = require('./twitterConfig');
const twitterAPI = require('node-twitter-api');
const twitter = new twitterAPI({
    consumerKey: twitterConfig.consumerKey,
    consumerSecret: twitterConfig.consumerSecret,
    callback: twitterConfig.callBackUrl
});
//Internal Imports
const { buildTwitterRoutes } = require('./routes/twitterRoutes');
const { error, info } = require('./utils/loggingUtils');

const app = express();

app.set('port', (process.env.PORT || 3000));

try {
    fs.statSync('dist');
    info('Serving static build from dist/');
    info('Run `npm run clean` to return to development mode');
    app.use('/', express.static(path.join(__dirname, 'dist')));
}
catch (e) {
    info('Serving development build with nwb middleware');
    info('Run `npm run build` to create a production build');
    app.use(require('nwb/express')(express))
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Cache-Control', 'no-cache');
    next()
});

buildTwitterRoutes(app, twitter);

app.listen(app.get('port'), function() {
    info(`Server started: http://localhost:${app.get('port')}/`)
});