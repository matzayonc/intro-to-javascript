var express = require("express")
var app = express()
const PORT = 3000;

var path = require("path")

var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));

var users = [{ nick: "pierwszy", mail: "123@123.com" },{ nick: "345", mail: "345@123.com" },{ nick: "abc", mail: "abc@123.com" },{ nick: "cba", mail: "cba@123.com" }]


app.post('/handleForm', function (req, res) {
    for (var i = 0; i < users.length; i++)
        if (users[i].mail != req.body.mail) {
            users.push({ nick: req.body.nick, mail: req.body.mail })
            res.send("Wpisano konto "+req.body.nick+" do tabeli")
        }else{
            res.send("Podany email istnieje")
        }
});
app.post("/removeS", function (req,res){
    for (var i = 0; i < users.length; i++){
        if (users[i].mail == req.body.mail){
            users.splice(i,1);
            res.send("Email usunięty")
        }
    }
})
app.post("/removeR", function (req,res){
    for (var i = 0; i < users.length; i++){
        if (users[i].mail == req.body.mail){
            users.splice(i,1);
            res.send("Email usunięty")
        }
    }
})
app.post("/removeC", function (req,res){
    
})

app.get('/removeUserBySelect', function (req, res) {
    var output = "<form action='/removeS' method='POST'><select name='mail'>"

    for (var i = 0; i < users.length; i++)
        output += "<option value='" + users[i].mail + "'>" + users[i].mail + "</option>"

    output += "</select><button type='submit' value='submit'>Submit</button></form>"
    res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title><link rel="stylesheet" type="text/css" href="static/css/style.css"></head><body>' + output + '</body></html>')
});


app.get('/removeUserByRadio', function (req, res) {
    var output = "<form action='/removeR' method='POST'>"

    for (var i = 0; i < users.length; i++)
        output += "<label><input type='radio' name='mail' value='"+users[i].mail+"'>"+ users[i].mail + "</label>"

    output += "<button type='submit' value='submit'>Submit</button></form>"
    res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title><link rel="stylesheet" type="text/css" href="static/css/style.css"></head><body>' + output + '</body></html>')
});


app.get('/removeUserByCheckbox', function (req, res) {
    var output = "<form action='/removeC' method='POST'>"

    for (var i = 0; i < users.length; i++)
        output += "<label><input type='checkbox' name='mail' value='"+users[i].mail+"'>"+ users[i].mail + "</label>"

    output += "<button type='submit' value='submit'>Submit</button></form>"
    res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title><link rel="stylesheet" type="text/css" href="static/css/style.css"></head><body>' + output + '</body></html>')
});


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/zadanie.html"))
});



app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})