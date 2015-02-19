var data = require('../courses.json');
var query = {};

setInterval(function() {
    if(hasQuery()) {
    	var isLive = data["courses"][query["course"]]["current"]["isLive"];
    	if(!isLive)
    		return;
        data["courses"][query["course"]]["current"]["elapsed"]++;
    }
}, 1000);


function convertTime(secondTotal) {
    var seconds = parseInt(secondTotal)%60;
    var minutes = parseInt(secondTotal/60);
    var hours = parseInt(minutes/60);
    if(seconds < 10)
        seconds = "0"+seconds;
    if(minutes < 10)
        minutes = "0"+minutes;
    return hours.toString()+":"+minutes.toString()+":"+seconds.toString();
}

function loadLecture() {
    if(!hasQuery())
        return {};
    var course = data["courses"][query["course"]]["current"];
    var time = course["elapsed"];
    course["timeString"] = convertTime(time);
    return course;
}

function hasQuery() {
    return "course" in query && typeof query["course"] != "undefined";
}

exports.liveLecture = function(req, res){
	query = req.query;
    if(!hasQuery()) {
        res.redirect('/classes');
        return;
    }
    var current = loadLecture();
    current["marks"] = current["marks"].filter(function(n){
        return n !== undefined;
    });
    if(current["isLive"])
        res.render('podcatsit', current);
    else
	   res.redirect('/classes'); // TO BE CHANGED
};

exports.timer = function(req,res) {
    var timeJSON = { "now" : loadLecture()["timeString"]};
    res.json(timeJSON);
};

exports.addMark = function(req,res) {
    if(!hasQuery()) {
        res.redirect("/podcatsit");
        return;
    }
    var currCourse = query["course"];
    data["courses"][currCourse]["current"]["marks"].unshift(req.query);
    console.log(data["courses"][currCourse]["current"]["marks"]);
    res.redirect("/podcatsit?course="+query["course"]);
};

exports.delMark = function(req,res) {
    if(!hasQuery()) {
        res.redirect("/podcatsit");
        return;
    }
    var currCourse = query["course"];
    var index = parseInt(req.query["index"].substring(4));
    delete data["courses"][currCourse]["current"]["marks"][index];
    console.log(data["courses"][currCourse]["current"]["marks"][index]);
    res.redirect("/podcatsit?course="+query["course"]);
};