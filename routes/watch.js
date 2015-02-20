var data = require('../courses.json');
var query = {};

function hasQuery() {
    return "course" in query && typeof query["course"] != "undefined";
}

exports.watchPage = function(req, res) {
	if(!req.query["course"] || !req.query["lecture"]) {
		return;
	}
	query = req.query;
	var lecture = data["courses"][query["course"]]["archive"][parseInt(query["lecture"])];
	lecture["course"] = query["course"];
	lecture["marks"] = lecture["marks"].filter(function(n){
        return n !== undefined;
    });
	res.render('watch',lecture);
};

exports.addMark = function(req,res) {
    if(!hasQuery()) {
        res.redirect("/watch");
        return;
    }
    var currCourse = query["course"];
    data["courses"][currCourse]["archive"][parseInt(query["lecture"])]["marks"].unshift(req.query);
    console.log(data["courses"][currCourse]["current"][parseInt(query["lecture"])]["marks"]);
    res.redirect("/watch?course="+query["course"]+"&lecture="+query["lecture"]);
};

exports.modMark = function(req,res) {
    if(!hasQuery()) {
        res.redirect("/archive");
        return;
    }
    var currCourse = query["course"];
    var index = parseInt(req.query["index"].substring(1));
    console.log(index);
    var reference = data["courses"][currCourse]["archive"][parseInt(query["lecture"])]["marks"];
    console.log(reference);
    if(req.query["action"] == "delete"){
        delete reference[index];
    }
    else if(req.query["action"] == "edit"){
        reference[index]["comment"] = req.query["comment"]; 
    }
    console.log(reference[index]);
    res.redirect("/watch?course="+query["course"]+"&lecture="+query["lecture"]);
};