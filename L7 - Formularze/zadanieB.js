var express = require("express")
var app = express()
const PORT = 3000;

var path = require("path")

var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));

var users = [
    { nick: "uno", mail: "uno@w.pl" },
    { nick: "duo", mail: "duo@w.pl" }
]

function isMail(str) {

    return true
}

function wrap(str, repeat, amount) {

    return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title><link rel="stylesheet" type="text/css" href="static/css/style.css"></head><body>' + str + '</body></html>'

}



app.post('/handleForm', function (req, res) {

    console.log(req.body.nick)
    console.log(isMail(req.body.mail))
    if (isMail(req.body.mail) == true)
        users.push({ nick: req.body.nick, mail: req.body.mail })
    console.log(users[-1])
    console.log({ nick: req.body.nick, mail: req.body.mail })
    res.send(users)

});

app.post('/removeUserBySelect', function (req, res) {
    var output = "<select>"

    for (var i = 0; i < users.length; i++)
        output += "<option value=" + users[i].mail + ">" + users[i].mail + "</option>"

    output += "</select>"
    res.send(wrap(output))
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/zadanie.html"))
});


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})