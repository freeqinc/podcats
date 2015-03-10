// var classes = require("../classes.json");
var courses = require("../courses.json");
var models = require('../models');

function importTime() {
    var list = courses["courses"];
    for (var key in list) {
        var current = list[key]["current"];
        current["timeString"] = convertTime(current["elapsed"]);
    }
}

function convertTime(secondTotal) {
    var seconds = parseInt(secondTotal) % 60;
    var minutes = parseInt(secondTotal / 60);
    var hours = parseInt(minutes / 60);
    if (seconds < 10)
        seconds = "0" + seconds;
    if (minutes < 10)
        minutes = "0" + minutes;
    return hours.toString() + ":" + minutes.toString() + ":" + seconds.toString();
}

exports.classList = function(req, res) {
    console.log(req.query);
    if (!("id" in req.query)) {
        //console.log('here');
        res.redirect('/');
    } /*else {
        var id = req.query["id"];
        models.User
            .find({
                "_id": id
            })
            .exec(function(err, users) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i]["_id"] == id && !users[i]["online"]) {
                        res.redirect('index');
                    } else if (users[i]["_id"] == id) {
                        courses = {
                            "courses": users[i]["courses"]
                        };
                        console.log(courses);
                        break;
                    }
                    //console.log(users[i]["courses"]);
                }
            });
    }*/
    importTime();
    /*console.log(models.User.find().exec(function(err, users) {
        if (err)
            console.log(err);
        for (var i = 0; i < users.length; i++) {
            console.log(users[i]);
            console.log(users[i]["courses"]);
        }
    }));*/
    res.render('home', courses);
};
