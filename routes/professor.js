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
	var info = data["courses"][req.query["course"]]["current"];
	info["isLive"] = !info["isLive"];
	if(!Boolean(req.query["pause"])){
		info["elapsed"] = 0;
		info["timeString"] = "0:00:00";
		// send to archieve
	}
	res.redirect("/professor?course="+req.query["course"]);
};