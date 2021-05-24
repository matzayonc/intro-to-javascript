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

var context = require("./data/data2.json")
console.log(context)

app.get("/", function (req, res) {
    res.render('index2.hbs', context)
});




app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})