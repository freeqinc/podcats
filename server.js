var PORT = 3001;
var express = require('express');
var logger = require('morgan'); // Updated express.logger to Express 4 middleware
var compression = require('compression'); // Updated express.compress to Express 4 middleware
var path = require('path');
var hbs = require('hbs');
var mongoose = require('mongoose');
hbs.registerPartial('partial_name', 'partial value');
hbs.registerPartials(__dirname + '/views/partials');
//var handlebars = require('express-handlebars');

var index = require('./routes/index');
var home = require('./routes/home');
var lectures = require('./routes/class');
var podcatsit = require('./routes/podcatsit');
var podcatsit2 = require('./routes/podcatsit2');
var professor = require('./routes/professor');
var help = require('./routes/help');
var settings = require('./routes/settings');
var watch = require('./routes/watch');

var local_database_name = 'podcats';
var local_database_uri = 'mongodb://127.0.0.1/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("DB Connected");
});

// Create the server instance
var app = express();

// view engine setup
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

//app.set('view engine', 'handlebars');
//app.engine('handlebars', handlebars());

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
app.get('/podcatsit2', podcatsit2.liveLecture);
app.get('/professor', professor.liveLecture)
app.get('/help', help.helpPage);
app.get('/settings', settings.settingsPage);
app.get('/watch', watch.watchPage);
app.get("/timer", podcatsit.timer);
app.get("/checkLive", professor.checkLive);

app.post("/register", index.signup);
app.post("/add_mark", podcatsit.addMark);
app.post("/mod_mark", podcatsit.modMark);
//app.post("/watch/add_mark", watch.addMark);
app.post("/watch/mod_mark", watch.modMark);
app.post("/validate", index.validate);
app.post("/record", professor.record);
app.post("/setting_preference", settings.preference);
app.post("/rename_lecture", lectures.rename);
