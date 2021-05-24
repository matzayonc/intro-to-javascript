var express = require("express")
var app = express()
const PORT = 3000;

var path = require("path")
var bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({ extended: true }));

app.post("/handleForm", function (req, res) {
    res.send('<!DOCTYPE html><html lang="en"><head><style>body{background-color:' + req.body.color + ';}h1{text-align:center;font-size:150px;}</style></head><body><h1>' + req.body.color + '</h1></body></html>')

})

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/formularz.2.html"))
});


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})