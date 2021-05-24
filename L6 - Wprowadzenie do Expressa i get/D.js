var express = require("express")
var app = express()
const PORT = 3000;

app.use(express.static('static'))
var path = require("path")

app.get('/produkt/:id', function (req, res) {

    res.sendFile(path.join(__dirname+"/static/products/"+req.params.id+".html"))
    console.log(req.params.id)

});

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})