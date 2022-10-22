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
var apiResponse2 = [];
var tmpIndex = 0;
var tmpIndex2 = 0;
app.get('/',(req,res)=>{
    /*
    res.render("character",{char:{
        firstname: "hector",
        image: "daenerys.jpg"
    }
    });  */
    //options =
    
    const url="https://thronesapi.com/api/v2/Characters";
    const url2 ="https://anapioficeandfire.com/api/characters/";
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
            res.render("home", {characters:apiResponse });
        });
        response.on("error", (e)=>{
            console.log("Error ${e.message}");
            res.send("Error ${e.message}");
        });
    });
    request.end();  
    
    apiResponse2.length=apiResponse.length;
    for( var i=0; i<2139; i++){
    const request2 = https.request(url2+i, (response)=>{ 
        console.log(response.status);
        let data2='';
        response.on('data', (chunk) => {
            data2 = data2 + chunk.toString();
        });
        response.on('end',( )=> { 
            var jsonData2 = JSON.parse(data2);
            //console.log(jsonData);
            for( var j=0; j<apiResponse.length; j++){
                if(jsonData2.name == apiResponse[j].fullName){
                    apiResponse2[j]=i;
                }
            }
            //res.render("character",{char:jsonData}); 
        });
        response.on("error", (e)=>{
            console.log("Error ${e.message}");
            res.send("Error ${e.message}");
        });
    });
    
    request2.end();
    }
    console.log(apiResponse2);
    } else{
        res.render("home", {characters:apiResponse });
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
    const url2 ="https://anapioficeandfire.com/api/characters";
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
            for( var i=0; i<apiResponse2.length; i++){
                if(apiResponse2[i].name == apiResponse[tmpIndex].fullName){
                    tmpIndex2=i;
                }
            }
            
        res.render("character", {char:apiResponse[tmpIndex]});
            
        });
        response.on("error", (e)=>{
            console.log("Error ${e.message}");
            res.send("Error ${e.message}");
        });
    });
    request.end();    
    } else{
        console.log(apiResponse[tmpIndex].fullName)
        for( var i=0; i<apiResponse2.length; i++){
            if(apiResponse2[i].name == apiResponse[tmpIndex].fullName){
                tmpIndex2=i;
                console.log(apiResponse2[i].name);
            }
        }
        res.render("character", {char:apiResponse[tmpIndex]});
    }
})
    
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
        for( var i=0; i<apiResponse2.length; i++){
            if(apiResponse2[i].name == apiResponse[tmpIndex].fullName || apiResponse2[i].name == apiResponse[tmpIndex].firstName){
                tmpIndex2=i;
            }
        }
        res.render("character", {char:apiResponse[tmpIndex]});
    console.log(req);
})
app.listen(3000,()=>{
    console.log("listening to port 3000");
})