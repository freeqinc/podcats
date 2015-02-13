// var classes = require("../classes.json");
var courses = require("../courses.json");

exports.homePage = function(req, res){
	var courseList = {"courses":[]};
	/*for(var key in courses["courses"]) {
		if (courses["courses"].hasOwnProperty(key)) {
			courseList["courses"].push({"name":key});
		}
	}*/
	//console.log(courseList);
	// res.render('home', classes);
	res.render('home', courses);
};