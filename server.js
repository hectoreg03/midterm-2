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

const url2 ="https://www.anapioficeandfire.com/api/characters?name=";

function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}

app.get('/',(req,res)=>{
    
    const url="https://thronesapi.com/api/v2/Characters";

    if (apiResponse.length == 0){

    const request = https.request(url, (response)=>{ 

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
    
    } else{

        res.render("home", {characters:apiResponse });
    }
})
app.get('/character',(req,res)=>{
    //console.log(apiResponse.length);
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
        
        var apiResponse2;
        const request2 = https.request(url2+apiResponse[tmpIndex].fullName, (response)=>{ 
            let data='';
            response.on('data', (chunk) => {
                data = data + chunk.toString();
            });
            response.on('end',( )=> { 
                var jsonData2 = JSON.parse(data);
                console.log(jsonData2);
                if(isArray(jsonData2)) {
                        apiResponse2=jsonData2[jsonData2.length-1];
                    } else {
                        apiResponse2=jsonData2;
                    }
                res.render("character", {char:apiResponse[tmpIndex], complement: apiResponse2});
                //res.render("character",{char:jsonData}); 
            });
            response.on("error", (e)=>{
                apiResponse2.push(apiResponse2[0]);
                console.log("Error ${e.message}");
                res.send("Error ${e.message}");
            });
        });
        request2.end();
            
        });
        response.on("error", (e)=>{
            console.log("Error ${e.message}");
            res.send("Error ${e.message}");
        });
    });
    request.end();    
    } else{
        var apiResponse2;
        const request2 = https.request(url2+apiResponse[tmpIndex].fullName, (response)=>{ 
            console.log(response.status);
            let data2='';
            response.on('data', (chunk) => {
                data2 = data2 + chunk.toString();
            });
            response.on('end',( )=> { 
                var jsonData2 = JSON.parse(data2);
                //console.log(jsonData);
                if(isArray(jsonData2)) {
                    apiResponse2=jsonData2[jsonData2.length-1];
                } else {
                    apiResponse2=jsonData2;
                }
                console.log(apiResponse2);
                res.render("character", {char:apiResponse[tmpIndex], complement: apiResponse2});
                //res.render("character",{char:jsonData}); 
            });
            response.on("error", (e)=>{
                apiResponse2.push(apiResponse2[0]);
                console.log("Error ${e.message}");
                res.send("Error ${e.message}");
            });
        });
        request2.end();
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
        var apiResponse2;
        const request2 = https.request(url2+apiResponse[tmpIndex].fullName, (response)=>{ 
            console.log(response.status);
            let data2='';
            response.on('data', (chunk) => {
                data2 = data2 + chunk.toString();
            });
            response.on('end',( )=> { 
                var jsonData2 = JSON.parse(data2);
                //console.log(jsonData);
                
                if(isArray(jsonData2)) {
                    apiResponse2=jsonData2[jsonData2.length-1];
                } else {
                    apiResponse2=jsonData2;
                }
                
            console.log(apiResponse2);
                res.render("character", {char:apiResponse[tmpIndex], complement: apiResponse2});
                //res.render("character",{char:jsonData}); 
            });
            response.on("error", (e)=>{
                apiResponse2.push(apiResponse2[0]);
                console.log("Error ${e.message}");
                res.send("Error ${e.message}");
            });
        });
        request2.end();
    
})
app.listen(3000,()=>{
    console.log("listening to port 3000");
})