require('dotenv').config()
let bodyParser = require('body-parser');
let express = require('express');
let app = express();
app.use("/", function middleware(req, res, next) {
    let string = req.method + ' ' + req.path + ' - ' + req.ip;
    console.log(string)
    next();
});
app.use(bodyParser.urlencoded({extended: false}))
app.use("/public", express.static(__dirname + "/public"));
app.get("/", function(req, res) {
    // res.send("Hello Express");
    let absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
});
app.get("/:word/echo", function(req, res, next) {
    const word = req.params.word;
    res.json({
        echo: word
    });
});
app.get("/now", function(req, res, next) {
    req.time = new Date().toString();
    next();
},  function(req, res) {
    res.json({
        time: req.time
    })
});
app.route('/name')
.get(function(req, res) {
    let firstName = req.query.first;
    let lastName = req.query.last
    res.json({
        name: `${firstName} ${lastName}`
    })
}).post(function(req, res) {
    let string = req.body.first + ' ' + req.body.last;
    res.json({
        name: string
    })
});
app.get("/json", function(req, res) {
    if(process.env.MESSAGE_STYLE ==="uppercase") {
        res.json({
            "message": "HELLO JSON"    
        });
    } else {
        res.json({
            "message": "Hello json" 
        });
    } 
});

// console.log("Hello World")



































 module.exports = app;
