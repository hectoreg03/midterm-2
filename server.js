const https = require("https");
const express =require("express");
const fetch =require("node-fetch");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("html", require("ejs").renderFile); 
app.set("view engine", "html");
let characters = [];
let index = 0;

app.get("/",(req, res) =>{
    fetch('https://thronesapi.com/api/v2/Characters')
    .then((response) => response.json())
    .then((body) => characters = body)
    .then((data) => res.render("character.ejs", {charname: data[0]}));
});

app.post('/previous',(req,res)=>{
    index --;
    index = index < 0 ? (characters.length - 1) : index;
    res.render("character.ejs", {charname: characters[index]});
});

app.post('/next',(req,res)=>{
    index ++;
    index = index >= (characters.length) ? 0 : index;
    res.render("character.ejs", {charname: characters[index]});
});

app.post('/search',(req,res)=>{
    const name = req.body.name;
    let searchIndex = 0;
    for (let i = 0; i < characters.length; i++) {
        if (characters[i].fullName === name || characters[i].firstName === name || characters[i].lastName === name) {
            searchIndex = i;
            break;
        }
    }
    res.render("character.ejs", {charname: characters[searchIndex]});
});

app.listen(3000,()=>{
    console.log("listening to port 3000");
})