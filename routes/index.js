//var validUsers = require('../user.json');
var models = require('../models');
//var kS = ["2IbfC20HDh", "WfxG8N11as", "h9kqE1zc9O", "Wo0B01q5cp"];
var tmpCourses = {
    "chem6a": "CSE 112",
    "cse141": "CSE 141",
    "cse141l": "CSE 141L",
    "cse170": "CSE 170"
};

exports.login = function(req, res) {
    res.render('index');
};

exports.validate = function(req, res) {
    var toAdd = req.query;
    models.User
        .find({
            "username": toAdd["username"],
            "password": toAdd["password"]
        })
        .exec(exists);

    function exists(err, users) {
        var result = {};
        if (users.length == 0) {
            result["verified"] = false;
            result["id"] = -1;
        } else {
            users[0]["online"] = true;
            result["verified"] = true;
            result["id"] = users[0]["id"];
        }

        if (err) {
            console.log(err);
        }
        res.json(result);
    };
};

exports.signup = function(req, res) {
    var toAdd = req.query;
    var result = {
        "added": false,
        "id": -1
    };
    var existed = false;
    toAdd["online"] = true;
    toAdd["courses"] = [];
    for (var key in tmpCourses) {
        var tmpCourse = new models.Course({
            "code": key,
            "name": tmpCourses[key],
            "current": [],
            "archive": []
        });
        toAdd["courses"].push(tmpCourse);
    }
    var newUser = new models.User(toAdd);
    models.User
        .find({
            "username": toAdd["username"],
            "password": toAdd["password"]
        })
        .exec(exists);

    //if (result["added"]) {
    newUser.save(success);
    //}

    function exists(err, users) {
        if (err) {
            console.log(err);
        }
        console.log(users.length);
        if (users.length == 0) {
            existed = true;
        }
    }

    function success(err) {
        if (err) {
            console.log(err);
        }
        result["added"] = true;
        result["id"] = newUser["_id"];
        res.json(result);
    }

};
