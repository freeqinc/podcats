// var classes = require("../classes.json");
var courses = require("../courses.json");

function importTime(){
	var list = courses["courses"];
	for(var key in list){
		var current = list[key]["current"];
		current["timeString"] = convertTime(current["elapsed"]);
	}
}

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

exports.classList = function(req, res){
	importTime();
	res.render('home', courses);
};