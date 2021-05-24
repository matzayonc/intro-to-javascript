var express = require("express")
var app = express()
const PORT = 3000;


function wrap(str){
    return '<!DOCTYPE html><html lang="en"><head><title>Document</title></head><body>' + str + '</body></html>'
}

app.get("/", function (req, res) {
    var output = '<!DOCTYPE html><html lang="en"><head><title>Document</title></head><body>'


    if(req.query.toRad == "true")
        res.send(wrap(req.query.value+" stopni to "+ req.query.value*Math.PI/180 +" radianów"))
    else
        res.send(wrap(req.query.value+" radianów to "+ req.query.value*180/Math.PI +" stopni"))
    
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})