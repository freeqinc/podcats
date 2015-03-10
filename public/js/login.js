$(document).ready(function(argument) {
    var counter = 0;
    //var kS = ["2IbfC20HDh", "WfxG8N11as", "h9kqE1zc9O", "Wo0B01q5cp"];

    function login(username, password) {
        /*var rK = (parseInt(Math.random() * 10)) % 4;
        password = CryptoJS.DES.encrypt(password, kS[rK]);
        var encrypted = CryptoJS.DES.encrypt(password, "BRIAN");
        var decrypted = CryptoJS.DES.decrypt(encrypted, "BRIAN");
        console.log("Encrtyped: " + encrypted);
        console.log("Decrtyped: " + decrypted.toString(CryptoJS.enc.Utf8));
        return false;*/
        $.post("/validate?username=" + username + "&password=" + password, function(result) {
            if (result["verified"]) {
                $('.the-input').val("");
                window.location.href = '/classes?id='+result["id"];
            } else {
                alert("Invalid username and/or password");
                return;
            }
        });
    }

    function signup(username, password) {
        if (username.length == 0 || password.length == 0) {
            alert("Please enter a username and password to signup.");
            return;
        } else {
            var url = "/register?username=" + username + "&password=" + password;
            $.post(url, function(result) {
                console.log(result);
                if (result["added"] == true && result["id"] != -1) {
                    $(".ti-1").val("");
                    $(".ti-2").val("");
                    alert("Sign-up successful!");
                    window.location.replace("/classes?id="+result["id"]);
                }
            });
        }
    }

    $("#login").on('click', function() {
        if (counter % 2 == 0) {
            var username = $(".ti-1").val();
            var password = $(".ti-2").val();
            login(username, password);
        }
        counter++;
    });

    $('.signup').on('click', function() {
        var username = $(".ti-1").val();
        var password = $(".ti-2").val();
        signup(username, password);
    });

    $(".ti-1").keypress(function(e) {
        if (e.which == 13) {
            var username = $(".ti-1").val();
            var password = $(".ti-2").val();
            login(username, password);
        }
    });

    $(".ti-2").keypress(function(e) {
        if (e.which == 13) {
            var username = $(".ti-1").val();
            var password = $(".ti-2").val();
            login(username, password);
        }
    });
});
