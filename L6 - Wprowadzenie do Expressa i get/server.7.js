var express = require("express")
var app = express()
const PORT = 3000;


var cookieParser = require("cookie-parser")

app.use(cookieParser())


app.get('/', function (req, res) {
    res.status(403).send("brak strony takiego produktu")
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})