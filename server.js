const express= require('express');
const { request } = require('http');
const https = require('https');
const { stringify } = require('querystring');
const app= express();
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static("public"));

app.engine('ejs',require('ejs').renderFile);
app.set("view engine", "ejs");

app.get('/',(req,res)=>{
    var tmpIndex = 0;
    /*
    res.render("character",{char:{
        firstname: "hector",
        image: "daenerys.jpg"
    }
    });  */
    //options =
    
    const url="https://thronesapi.com/api/v2/Characters";
    const request = https.request(url+"/"+String(tmpIndex), (response)=>{ 
        console.log(response.status);
        let data='';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });
        response.on('end',( )=> { 
            var jsonData = JSON.parse(data);
            console.log(jsonData);
            //res.render("character",{char:jsonData}); 
            res.render("character", {char:jsonData});
        });
        response.on("error", (e)=>{
            console.loeg("Error ${e.message}");
            res.send("Error ${e.message}");
        });
    })
    request.end();
})
/*
app.get('/character',(req,res)=>{
    
    var tmpIndex = 0;
    
    var apiResponse = [];
    https.request('https://thronesapi.com/api/v2/Characters',(response)=>{ 
        console.log(response.status);
        response.on("data",(data)=>{
            var jsonData = JSON.parse(data);
            apiResponse = jsonData;
            res.render("character",{charname: apiResponse[tmpIndex]});  
        })
        .on("error", (e)=>{
            console.loeg("Error ${e.message}");
            res.send("Error ${e.message}");
        })
    })
})
app.post('/character',(req,res)=>{
    function initialize(data) {
    document.getElementById("demo").value = data[0].firstName + " " + data[0].lastName;
        document.getElementById("demo2").src = data[0].imageUrl;
    }
    function previous() {
    tmpIndex = tmpIndex > 0 ? (tmpIndex -1) : (apiResponse.length - 1);
    console.log(tmpIndex);
    document.getElementById("demo").value = apiResponse[tmpIndex].firstName + " " + apiResponse[tmpIndex].lastName;
    document.getElementById("demo2").src = apiResponse[tmpIndex].imageUrl;
    }
    function next() {
    tmpIndex = tmpIndex >= (apiResponse.length - 1) ? 0 : (tmpIndex + 1);
    console.log(tmpIndex);
    document.getElementById("demo").value = apiResponse[tmpIndex].firstName + " " + apiResponse[tmpIndex].lastName;
    document.getElementById("demo2").src = apiResponse[tmpIndex].imageUrl;
    }
})*/
app.listen(3000,()=>{
    console.log("listening to port 3000");
})