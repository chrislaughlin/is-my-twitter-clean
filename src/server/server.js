const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const twitterConfig = require('./twitterConfig');
const Twitter = require('twitter-node-client').Twitter;

const twitter = new Twitter(twitterConfig);

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
    twitter
        .getUserTimeline({screen_name: 'chrislaughlin'},
                error => console.error(error),
                data => res.send(data)
        );
});

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/')
});