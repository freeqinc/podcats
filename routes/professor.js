var data = require("../courses.json");
var query = {};

function hasQuery() {
    return "course" in query && typeof query["course"] != "undefined";
}

exports.liveLecture = function(req, res) {
	query = req.query;
	var info = data["courses"][req.query["course"]]["current"];
    res.render('professor', info);
};

exports.checkLive = function(req,res) {
	var info = data["courses"][req.query["course"]]["current"];
	var toggler = { "status" : info["isLive"]};
    res.send(toggler);
};

exports.record = function(req,res) {
	var course = data["courses"][req.query["course"]];
	course["current"]["isLive"] = !course["current"]["isLive"];
	if(!course["current"]["isLive"]){
		var tmp = {};
		tmp["id"] = new Date().getTime();
		tmp["marks"] = course["current"]["marks"];
		course["archive"].push(tmp);
		course["current"] = {
			"marks" : [], 
			"elapsed" : 0,
			"isLive" : false,
			"timeString" : "0:00:00"
		};
	}
	res.redirect("/professor?course="+req.query["course"]);
};