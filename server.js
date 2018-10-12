var express=require("express");
var hbs= require("hbs");
var fs=require("fs");
const port=process.env.PORT || 3000;
var app= express();
hbs.registerPartials(__dirname+"/views/partials");
hbs.registerHelper("getyear",()=>{
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt",(text)=>{
    return text.toUpperCase();
});

app.use((req,res,next)=>{
    var log= new Date().toString();
    var some=`${log}  ${req.method}  ${req.url}`;
    fs.appendFile("user.log",some +"\n",(err)=>{
        if(err){
            console.log("some error ha soccured");
        }
    });
    next();
});


app.set('view engine',"hbs");

app.use(express.static(__dirname+"/public"));

 app.get("/",(req,res)=>{
    // res.send("<h1>hey budddy</h1>");
    // res.send({
    //     work:"webdexv",
    //     name:"ad",
    //     want:[1,2,"something"]
    // });
    res.render('home.hbs',{
        title:"Home page",
     
        welcome:" welcome my bro"
    });
 });

 app.get("/about",(req,res)=>{
    // res.send("about page");
    res.render('about.hbs',{
        title:"about me",
        
    });
 });

 app.get("/bad",(req,res)=>{
     res.send({
         bad:"something is bad"
     });
 })
 app.listen(port,()=>{
     console.log(`server is up in ${port}`);
 });