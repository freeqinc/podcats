var lectures = require("../lectures.json");

exports.archivedLectures = function(req, res){
	var tmp = {};
	for(var key in lectures["lectures"]) {
		if(key == req.query["course"]) {
			tmp["lectures"] = lectures["lectures"][key];
			break;
		}
	}
	//console.log(tmp);
	res.render('class', tmp);
};