var express = require("express")
var app = express()
const PORT = 3000;

var path = require("path")


app.use(express.static('static'))

var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));

var hbs = require('express-handlebars');

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs',
    helpers: {
        shortTitle: function (title) {
            return title.substring(0, 10) + "...";
        },
        bigLetters: function (title) {
            var output = title[0].toUpperCase()
            for (var i = 1; i < title.length; i++)
                if (title[i - 1] == " ")
                    output += title[i].toUpperCase()
                else
                    output += title[i]
            return output
        },
        dashed: function (title) {
            var output = title[0]
            for (var i = 1; i < title.length; i++)
                output += '-' + title[i]
            return output
        }

    }
}));
app.set('view engine', 'hbs');
var context = require("./data/data3.json")
console.log(context)

app.get("/", function (req, res) {
    res.render('index3.hbs', context)
});




app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})