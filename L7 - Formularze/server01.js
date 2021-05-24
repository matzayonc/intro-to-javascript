var express = require("express")
var app = express()
const PORT = 3000;

var path = require("path")


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/formularz.1.html"))
});

app.get("/handleForm", function (req, res) {
    console.log(req.query.color)

    res.send('<!DOCTYPE html><html lang="en"><head><style>body{background-color:' + req.query.color + ';}h1{text-align:center;font-size:150px;}</style></head><body><h1>' + req.query.color + '</h1></body></html>')
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})