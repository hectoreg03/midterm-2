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

var apiResponse = [];
var tmpIndex = 0;
app.get('/',(req,res)=>{
    /*
    res.render("character",{char:{
        firstname: "hector",
        image: "daenerys.jpg"
    }
    });  */
    //options =
    
    const url="https://thronesapi.com/api/v2/Characters";
    if (apiResponse.length == 0){
    const request = https.request(url, (response)=>{ 
        console.log(response.status);
        let data='';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });
        response.on('end',( )=> { 
            var jsonData = JSON.parse(data);
            //console.log(jsonData);
            apiResponse=jsonData;
            //res.render("character",{char:jsonData}); 
            res.render("character", {char:apiResponse[tmpIndex]});
        });
        response.on("error", (e)=>{
            console.log("Error ${e.message}");
            res.send("Error ${e.message}");
        });
    });
    request.end();  
    } else{
        res.render("character", {char:apiResponse[tmpIndex]});
    }
})
app.get('/character',(req,res)=>{
    /*
    res.render("character",{char:{
        firstname: "hector",
        image: "daenerys.jpg"
    }
    });  */
    //options =
    
    const url="https://thronesapi.com/api/v2/Characters";
    if (apiResponse.length == 0){
    const request = https.request(url, (response)=>{ 
        console.log(response.status);
        let data='';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });
        response.on('end',( )=> { 
            var jsonData = JSON.parse(data);
            //console.log(jsonData);
            apiResponse=jsonData;
            //res.render("character",{char:jsonData}); 
            res.render("character", {char:apiResponse[tmpIndex]});
        });
        response.on("error", (e)=>{
            console.log("Error ${e.message}");
            res.send("Error ${e.message}");
        });
    });
    request.end();  
    } else{
        res.render("character", {char:apiResponse[tmpIndex]});
    }
})
/*
app.get('/character',(req,res)=>{
    
    var tmpIndex = 0;
    
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
})*/
/*
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
    }*/
    
app.post('/character',(req,res)=>{
    if(req.body.next != undefined){
        tmpIndex= tmpIndex+1;
        if(tmpIndex >= apiResponse.length)
            tmpIndex=0;
        console.log(tmpIndex);
        } else{
            
            if(req.body.previous != undefined){
                if(tmpIndex == 0)
                    tmpIndex=apiResponse.length -1;
                else
                    tmpIndex= tmpIndex -1;
                    console.log(tmpIndex);
             }
             else{
                
                if(req.body.searcher != undefined){
                    //console.log(apiResponse[0].firstName);
                    for( var i=0; i<apiResponse.length;i++){
                        if( apiResponse[i].firstName == req.body.search){
                            tmpIndex=i;
                        }
                    }
                }
             }
        }
        
        res.render("character", {char:apiResponse[tmpIndex]});
    console.log(req);
})
app.listen(3000,()=>{
    console.log("listening to port 3000");
})