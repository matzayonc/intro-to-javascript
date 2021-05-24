var express = require("express")
var app = express()
const PORT = 3000;

var path = require("path")

app.use(express.static('static'))

var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));

var hbs = require('express-handlebars');

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));
app.set('view engine', 'hbs');


app.get("/", function (req, res) {
    res.redirect("/index")
});

app.get("/index", function (req, res) {
    res.render('index.hbs', { layout: "main.hbs" })
});

app.get("/login", function (req, res) {
    res.render('login.hbs', { layout: "main.hbs" })
});


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})