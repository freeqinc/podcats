var data = require('../courses.json');
var query = {};

/*setInterval(function() {
    if(hasQuery()) {
    	var isLive = data["courses"][query["course"]]["current"]["isLive"];
    	if(!isLive)
    		return;
        data["courses"][query["course"]]["current"]["elapsed"]++;
    }
}, 1000);*/


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
    current["course"] = query["course"];
    current["date"] = (new Date()).toLocaleDateString();
    console.log(current["date"]);
    var random_num = Math.random();
    if(current["isLive"] && random_num > 0.5)
        res.render('podcatsit', current);
    else if (current["isLive"] && random_num <= 0.5)
        res.render('podcatsit2', current);
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

exports.modMark = function(req,res) {
    if(!hasQuery()) {
        res.redirect("/podcatsit");
        return;
    }
    console.log(req.query);
    var currCourse = query["course"];
    var index = parseInt(req.query["index"]);
    console.log(index);
    var reference = data["courses"][currCourse]["current"]["marks"];
    if(req.query["action"] == "delete"){
        delete reference[index];
    }
    else if(req.query["action"] == "edit"){
        reference[index]["comment"] = req.query["comment"]; 
    }
    console.log(data["courses"][currCourse]["current"]["marks"][index]);
    res.redirect("/podcatsit?course="+query["course"]);
};