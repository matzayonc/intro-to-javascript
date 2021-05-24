var express = require("express")
var app = express()

var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));

var path = require("path")
app.use(express.static('static'))
var hbs = require('express-handlebars')

app.set('views', path.join(__dirname, 'views'))
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }))
app.set('view engine', 'hbs')


var Datastore = require('nedb')

var data = new Datastore({
    filename: 'kolekcja.db',
    autoload: true
});

var context = {
    cars: []
}


app.get("/", function (req, res) {

    context.cars = []
    data.find({}, function (err, docs) {
        for (var i = 0; i < docs.length; i++)
            context.cars.push(docs[i])
        console.log(docs)
    })

    res.render("index.hbs", context)
});

app.post("/delete", function (req, res) {

    console.log(req.body.id)

    data.remove({ _id: req.body.id }, {}, function (err, numRemoved) { 
        console.log("usunięto dokumentów: ", numRemoved)
    });

    res.redirect("/")
});

app.post("/handleForm", function (req, res) {

    var doc = {
        ubezpieczony: req.body.ubezpieczony == "on" ? "TAK" : "NIE",
        benzyna: req.body.benzyna == "on" ? "TAK" : "NIE",
        uszkodzony: req.body.uszkodzony == "on" ? "TAK" : "NIE",
        naped: req.body.naped == "on" ? "TAK" : "NIE"
    }
    data.insert(doc)
    res.redirect("/")
})



app.listen(3000, function () {
    console.log("start serwera na porcie " + 3000)
})