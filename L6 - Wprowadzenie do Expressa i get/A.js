var express = require("express")
var app = express()
const PORT = 3000;


app.use(express.static('static'))
var path = require("path")

app.get("/strona1", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/1.html"))
    console.log("1")
})

app.get("/strona2", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/2.html"))
    console.log("2")
})

app.get("/strona3", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/3.html"))
    console.log("3")
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})