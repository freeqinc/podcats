var PORT = 3000;
var express = require('express');
var logger = require('morgan'); // Updated express.logger to Express 4 middleware
var compression = require('compression'); // Updated express.compress to Express 4 middleware
var path = require('path');
var hbs = require('hbs');

var index = require('./routes/index');
var home = require('./routes/home');
var lectures = require('./routes/class');
var podcatsit = require('./routes/podcatsit');
var professor = require('./routes/professor');
var help = require('./routes/help');
var settings = require('./routes/settings');

// Create the server instance
var app = express();

// view engine setup
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

// Print logs to the console and compress pages we send
app.use(logger('dev'));
app.use(compression());

// Return all pages in the /static directory
// whenever they are requested at '/'
// e.g., http://localhost:3000/index.html
// maps to /static/index.html on this machine
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/public'));

// Start the server
var port = process.env.PORT || PORT; // 80 for web, 3000 for development
app.listen(port, function() {
	console.log("Node.js server running on port %s", port);
});

// routes
app.get('/', index.login)
app.get('/classes', home.classList);
app.get('/archive', lectures.archivedLectures);
app.get('/podcatsit', podcatsit.liveLecture);
app.get('/professor', professor.liveLecture)
app.get('/help', help.helpPage);
app.get('/settings', settings.settingsPage);

app.get("/timer", podcatsit.timer);
app.post("/add_mark", podcatsit.addMark);
app.post("/del_mark", podcatsit.delMark);
app.post("/validate", index.validate);

app.get("/checkLive", professor.checkLive);
app.post("/record", professor.record);