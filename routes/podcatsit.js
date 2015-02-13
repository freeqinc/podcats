var data = require('../courses.json');
var query = {};

setInterval(function() {
    if(hasQuery()) {
    	var isLive = data["courses"][query["course"]]["current"]["isLive"];
    	if(!isLive) {
    		return;
    	}
        data["courses"][query["course"]]["current"]["elapsed"]++;
    }
}, 1000);


function convertTime(secondTotal) {
    var seconds = secondTotal%60;
    var minutes = parseInt(secondTotal/60);
    var hours = parseInt(minutes/60);
    if(seconds < 10)
        seconds = "0"+seconds;
    if(minutes < 10)
        minutes = "0"+minutes;
    return hours.toString()+":"+minutes.toString()+":"+seconds.toString();
}

function loadLecture() {
    if(!(hasQuery())) {
        return {
            "marks" : [],
            "elapsed" : 0,
            "isLive" : false,
            "timeString" : "0:00:00"
        };
    }
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
	res.render('podcatsit', loadLecture());
};

exports.timer = function(req,res) {
    var timeJSON = { "now" : loadLecture()["timeString"]};
    res.json(timeJSON);
};

exports.bookmark = function(req,res) {
    var currCourse = query["course"];
    data["courses"][currCourse]["current"]["marks"].unshift(req.query);
    console.log(data["courses"][currCourse]["current"]["marks"]);
    if(hasQuery())
        res.redirect("/podcatsit?course="+query["course"]);
    else
        res.redirect("/podcatsit");
};