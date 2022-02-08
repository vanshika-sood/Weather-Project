const express = require("express");
const https=require("https"); 
const bodyParser=require("body-parser");
const app = express();



app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
})

app.use(bodyParser.urlencoded({extended:true}));
app.post("/",function(req,res){
    var cityName=req.body.cityName;

    const query=cityName;
    const apiKey="878a21ca4848cb2cb3b250404c0f5bff";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            weatherDesc=weatherData.weather[0].description;
            const weatherIcon=weatherData.weather[0].icon;
            const imageURL="https://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";
            res.set("Content-Type", "text/html");
            res.write("The weather is currently "+ weatherDesc);
            res.write("<h1>The temperature in "+cityName+ " is " +temp+" degrees Celcius</h1>");
            res.write("<img src="+imageURL+"> ");
            res.send();
        })
    })
   
})
    




app.listen(3000,function(){
    console.log("Server is running on port 3000");
})