var lectures = require("../lectures.json");

exports.archivedLectures = function(req, res){
	res.render('class', lectures);
};