var express = require("express")
var app = express()
const PORT = 3000;

var path = require("path")

app.use(express.static('static'))

var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));


var logged = false

var users = [
    { mail: "test", pass: "pass", age: "10", lerner: "on", gender: "K" },
    { mail: "test2", pass: "pass", age: "12", lerner: "on", gender: "M" },
    { mail: "test3", pass: "pass", age: "11", lerner: "on", gender: "K" }
]

function wrap(str) {

    return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title><link rel="stylesheet" type="text/css" href="static/css/style.css"></head><body>' + str + '<br><a href="/">Wróć</a></body></html>'

}

function isFree(mail) {
    for (var i = 0; i < users.length; i++)
        if (users[i].mail == mail)
            return false
    return true
}


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/main.html"))
});

app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/register.html"))
});

app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/login.html"))
});

app.get("/admin", function (req, res) {
    if (logged)
        res.sendFile(path.join(__dirname + "/static/admin.html"))
    else
        res.sendFile(path.join(__dirname + "/static/notAdmin.html"))
});

app.post('/registerForm', function (req, res) {

    if (isFree(req.body.mail)) {
        users.push({
            mail: req.body.mail,
            pass: req.body.pass,
            age: req.body.age,
            lerner: req.body.uczen,
            gender: req.body.gender
        })
        res.send(wrap("Użytkownik dodany"))
    }

    else
        res.send(wrap("E-mail zajęty"))
    console.table(users)
});

app.post('/loginForm', function (req, res) {
    for (var i = 0; i < users.length; i++)
        if (users[i].mail == req.body.mail)
            if (users[i].pass == req.body.pass)
                logged = true

    console.log(logged)
    if (logged)
        res.redirect('/admin')
    else
        res.send(wrap("logowanie nieudane"))

})

app.get('/logout', function(req, res){

    logged = false
    res.redirect('/')
})

app.get('/sort', function (req, res) {

    users.sort(function (a, b) {
        return parseFloat(a.age) - parseFloat(b.age);
    });

    //var output = '<span><p>Kierunek:<form action="/sort" method="POST"><input type="radio" onchange="this.submit()" name="sort" value="M" checked="checked">Rosnąco<input type="radio" onchange="this.submit()" name="sort" value="R">Malejąco</p></form></span>'

    var output = "<table>"

    for(var i = 0; i < users.length; i++){

        output += "<tr>"
        output +="<td>" + users[i].mail + "</td>"
        output +="<td>" + users[i].age + "</td>"
        output += "</tr>"
    }

    output += "</table>"

    res.send(wrap(output))
})


app.get('/show', function (req, res) {
    var output = "<table>"

    for(var i = 0; i < users.length; i++){

        output += "<tr>"
        output +="<td>" + users[i].mail + "</td>"
        output +="<td>" + users[i].pass + "</td>"
        output +="<td>" + users[i].age + "</td>"
        output +="<td>" + users[i].lerner + "</td>"
        output +="<td>" + users[i].gender + "</td>"
        output += "</tr>"
    }

    output += "</table>"

    res.send(wrap(output))

})


app.get('/gender', function (req, res) {

    var output = "<table><th><td>Mężczyzni</td></th> "

    for(var i = 0; i < users.length; i++)
        if(users[i].gender == 'M'){
            output += "<tr>"
            output +="<td>" + users[i].mail + "</td>"
            output +="<td>" + users[i].gender + "</td>"
            output += "</tr>"
        }    
        
    output += "</table><br><table><th><td>Kobiety</td></th> "

    for(var i = 0; i < users.length; i++)
        if(users[i].gender == 'K'){
            output += "<tr>"
            output +="<td>" + users[i].mail + "</td>"
            output +="<td>" + users[i].gender + "</td>"
            output += "</tr>"
        }

    output += "</table>"

    res.send(wrap(output))

})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})