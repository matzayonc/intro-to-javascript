var express = require("express")
var app = express()
const PORT = 3000;



function wrap(str){
    return '<!DOCTYPE html><html lang="en"><head><title>Document</title></head><body>' + str + '</body></html>'
}

app.get("/", function (req, res) {
    res.send(wrap("<a href='http://[2a02:a31d:8445:a380:a075:ecc4:e50f:b99c]:3000/bat'>Uruchom bata</a>'"))
})

app.get("/bat", function (req, res) {
    

    res.send("Success")

    const { spawn } = require('child_process');
    const bat = spawn('cmd.exe', ['/c', 'my.bat']);




    bat.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    bat.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    bat.on('exit', (code) => {
        console.log(`Child exited with code ${code}`);
    });



})



app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})