var data = require("../courses.json");
var query = {};

setInterval(function() {
    if(hasQuery()) {
    	var isLive = data["courses"][query["course"]]["current"]["isLive"];
    	if(!isLive)
    		return;
        data["courses"][query["course"]]["current"]["elapsed"]++;
    }
}, 1000);

function hasQuery() {
    return "course" in query && typeof query["course"] != "undefined";
}

exports.liveLecture = function(req, res) {
	query = req.query;
	if(!hasQuery() || !(query["course"] in data["courses"])) {
        res.redirect('/classes');
        return;
    }
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
		if(req.query["pause"] == "true"){
			res.redirect("/professor?course="+req.query["course"]);
			return;
		}
		var tmp = {};
		tmp["id"] = new Date().getTime();
		tmp["marks"] = course["current"]["marks"];
		tmp["name"] = "Lecture "+(course["archive"].length+1);
		course["archive"].unshift(tmp);
		course["current"] = {
			"marks" : [], 
			"elapsed" : 0,
			"isLive" : false,
			"timeString" : "0:00:00"
		};

		console.log(course["archive"]);
	}
	res.redirect("/professor?course="+req.query["course"]);
};