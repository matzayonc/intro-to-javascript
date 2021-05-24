var express = require("express")
var app = express()
const PORT = 3000;

var path = require("path")
var bodyParser = require("body-parser")
var formidable = require('formidable');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/handleUpload', function (req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + '/static/upload/'       // folder do zapisu zdjęcia
    form.keepExtensions = true                           // zapis z rozszerzeniem pliku
    form.parse(req, function (err, fields, files) {
        console.log("----- przesłane pola z formularza ------");
        console.log(fields);
        console.log("----- przesłane formularzem pliki ------");
        console.log(files);
        res.send(files)
    });
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/formularz.3.html"))
});


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})