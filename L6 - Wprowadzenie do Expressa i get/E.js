var express = require("express")
var app = express()
const PORT = 3000;
var cookieParser = require("cookie-parser")

function wrap(str){
    return '<!DOCTYPE html><html lang="en"><head><title>Document</title></head><body>' + str + '</body></html>'
}

app.use(cookieParser())

app.get('/', function (req, res) {

    var now = Date.now()
    var first = req.cookies.First
    var last = req.cookies.Last
    var output = "Witaj, "

    if(req.cookies["First"] == undefined){
        res.cookie("First", now)
        output += "jesteś po raz pierwszy na nasszej stronie"
    }
    else{
        

    output += "pierwszy raz byłeś na naszej stronie "+ parseInt((now - first)/60000) +" minut "+ parseInt((now - first)/1000%60) +" sekund temu"
    output += "<br>"
    output += "ostatnio raz byłeś na naszej stronie "+ parseInt((now - last)/60000) +" minut "+ parseInt((now - last)/1000%60) +" sekund temu"
    }
    res.cookie("Last", now)
    res.send(wrap(output))
    
});

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})