var express = require("express")
var app = express()
const PORT = 3000;


function wrap(str){
    return '<!DOCTYPE html><html lang="en"><head><title>Document</title></head><body>' + str + '</body></html>'
}

app.get("/", function (req, res) {
    var output = ""

    for (var i = 0; i < req.query.count; i++)
        output += '<div style="background-color: ' + req.query.bg + ' ">' + (i + 1) + '</div>'

    res.send(wrap(output))
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})