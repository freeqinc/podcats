var validUsers = require('../user.json');

exports.login = function(req, res){

	res.render('index');
};

exports.validate = function(req, res){
	var result = {"1": false, "2": false};
	for(var i=0; i < validUsers["valid"].length; i++){
		if(validUsers["valid"][i]["username"] == req.query["username"]) {
			result["1"] = true;
		}
		if(validUsers["valid"][i]["password"] == req.query["password"]) {
			result["2"] = true;
		}
	}
	res.json(result);
};

exports.signup = function(req, res){
	var result = {"result":true};
	for(var i = 0; i < validUsers["valid"].length; i++) {
		if(validUsers["valid"][i]["username"] == req.query["username"]) {
			result["result"] = false;
			return result;
		}
		if(validUsers["valid"][i]["password"] == req.query["password"]) {
			result["result"] = false;
			return result;
		}
	}
	validUsers["valid"].push(req.query);
	res.redirect('/classes');
};