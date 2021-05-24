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


var context = {
    subject: "ćwiczenie 3 - dane z tablicy obiektów",  
    books: [
             { title: "Lalka", author: "B Prus", lang: "PL" },
             { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
             { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
             { title: "Dwór mgieł i furii", author: "S.J. Maas", lang: "CZ" }
   ] 
 }

app.get("/", function (req, res) {
    res.render('index3.hbs', context);
});


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})