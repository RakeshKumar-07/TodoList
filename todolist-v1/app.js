const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food","Cook Food","Eat Food"];
const workItems = [];

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"));

app.set('view engine', "ejs");

app.get("/" , function(req,res){

    const day = date.getDate();

    res.render("list", {listTitle: day, newItem: items});   

});

app.post("/", function(req,res){

    const item = req.body.newItem;

    if(req.body.list === "work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
    
    items.push(item);

    res.redirect("/");
})

app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work List", newItem: workItems})
})

app.post("/work", function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})


app.listen(3000, function(){
    console.log("Server started on port 3000.");
});