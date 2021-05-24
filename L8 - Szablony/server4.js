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
    subject: "ćwiczenie 4 - dane z tablicy, select", 
    fields:[
        {name:"title"},
        {name:"author"},
        {name:"lang"}        
    ], 
    books: [
        { title: "Lalka", author: "B Prus", lang: "PL" },
        { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
        { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
        { title: "Zamek", author: "F Kafka", lang: "CZ" }
   ]  
 }

app.get("/", function (req, res) {

    res.render('index4.hbs', context);
});

app.get("/form", function (req, res) {

    var response = {
        subject: "ćwiczenie 4 - dane z tablicy, select", 
        fields:[
            {name:"title"},
            {name:"author"},
            {name:"lang"}        
        ], 
        books: []
    }  
    console.log(req.query)

    context.books.forEach(el => {
        if(req.query[el.title] == "on")
            response.books.push(el)

    });

    res.render('index4a.hbs', response)
    
});


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})