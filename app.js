var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");

var todoRoutes  = require("./routes/todo");



// BODY PARSER SET UP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));



// ROUTES CONFIG
app.get("/", function(req, res){
    res.sendFile("index.html")
});



app.use("/api/todo", todoRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is starting " + process.env.PORT)
});