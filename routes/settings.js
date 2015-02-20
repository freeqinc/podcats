var data = require("../settings.json");

exports.settingsPage = function(req, res){
	res.render('settings',data);
};

exports.preference = function(req, res){
	//console.log(data);
	var option = req.query["option"];
	data["option"+option] = req.query["toggle"];
	//console.log(data);
	res.redirect("/settings");
};