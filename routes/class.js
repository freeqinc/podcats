var data = require("../courses.json")
// var lectures = require("../lectures.json");
var query = {};
function hasQuery() {
    return "course" in query && typeof query["course"] != "undefined";
}
exports.archivedLectures = function(req, res){
	// var tmp = {};
	// for(var key in lectures["lectures"]) {
	// 	if(key == req.query["course"]) {
	// 		tmp["lectures"] = lectures["lectures"][key];
	// 		break;
	// 	}
	// }
	// //console.log(tmp);
	// res.render('class', tmp);
	if(req.query["course"])
	{
		query = req.query;
	}
	var courses = data["courses"][query["course"]]
	res.render('class', courses);
};

exports.rename = function(req, res) {
	console.log(req.query);
	/*if(!hasQuery() || (req.query["label"] && req.query["index"])){
		// do something
		return;
	}*/
	var course = data["courses"][query["course"]];
	course["archive"][parseInt(req.query["index"])]["name"] = req.query["label"];
	console.log(data["courses"][query["course"]]["archive"]);
	// console.log(courses);
	res.redirect("/archive?course="+query["course"]);
};