var express = require("express")
var app = express()

var path = require("path")
var formidable = require('formidable')

app.use(express.static('static'))
var hbs = require('express-handlebars')

app.set('views', path.join(__dirname, 'views'))
app.engine('hbs', hbs({ defaultLayout: 'projekt.hbs' }))
app.set('view engine', 'hbs')


var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true })); 

var context = {files: []}
var idCounter = 1


function add(file){
    context.files.push(file)
    context.files[context.files.length - 1].id = idCounter++

    var imgURL = ""
    var name = file.name.split(".")

    console.log(name[name.length-1])

    switch (name[name.length-1]) {
        case "docx": 
            imgURL = "http://www.icons101.com/icons/54/Filecons__ZIP_folder_by_lRezz/64/.docx.png"
            break;

        case "png":
            imgURL = "http://www.icons101.com/icons/29/Boxed_Metal_by_Martin/128/png.png"
            break;

        case "jpg": 
            imgURL = "http://www.icons101.com/icons/39/Flat_File_Type_by_PelFusion/128/JPG.png"
            break;

        case "txt":
            imgURL = "http://www.icons101.com/icons/39/Flat_File_Type_by_PelFusion/128/TXT.png"
            break;

        case "rar":
            imgURL = "http://www.icons101.com/icons/71/Ampola_by_Ampeross/128/rar.png"
            break;

        default:
            imgURL = "http://www.icons101.com/icons/88/All_Flat_Icons_by_Mahm0udWally/128/Unknown-Extension.png"
            break;

    }
    context.files[context.files.length - 1].image = imgURL
}


app.get("/", function (req, res) {
    res.redirect("/upload")
});

app.get("/upload", function (req, res) {
    res.render('upload.hbs', context)
});


app.post('/handleUpload', function (req, res) {
    var form = new formidable.IncomingForm()
    form.uploadDir = __dirname + '/static/upload/'
    form.keepExtensions = true
    form.multiples = true

    form.parse(req, function (err, fields, uploaded) {

        if(uploaded.files.length == undefined)
            add(uploaded.files)
        else
            for(var i = 0; i < uploaded.files.length; i++)
                add(uploaded.files[i])
            

    });
    res.redirect("/fileMenager")
});

app.post('/info', function (req, res) {

    for(var i = 0; i < context.files.length; i++)
        if(context.files[i].id == req.body.id)
            res.render('info.hbs', context.files[i])

    //res.send("<h1>Błąd</h1>")
})

app.post('/delete', function (req, res) {

    for(var i = 0; i < context.files.length; i++)
        if(context.files[i].id == req.body.id)
            context.files.splice(i, 1)
    res.redirect("/fileMenager")
})

app.get("/fileMenager", function (req, res) {
    res.render('fileMenager.hbs', context)
});


app.listen(3000, function () {
    console.log("start serwera na porcie " + 3000)
})