var express=require('express');
var app=express();
var handlebars = require('express3-handlebars')
                 .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port',process.env.PORT||3000);

app.use(express.static(__dirname + '/public'));//静态资源文件
app.use(express.static(__dirname + '/files'));//静态页面
app.use(require('body-parser')())

app.get('/', function(req, res){
    res.render('home');
});

var fortune = require('./lib/fortune.js');

app.get('/about', function(req, res){
   res.render("about",{fortune:fortune.getFortune()});
});
app.get('/reg', function(req, res){
    res.render("reg");
 });
 app.use('/user/:id', function(req, res,next){
     app.locals.editor="1234";
     app.set("key","12345");    
    
    console.log(req.method);
    console.log(req.params);
    console.log(req.query);
    next();
 });
 app.get('/user/:id', function(req, res,next){
     if(req.params.id===0||!req.query.name) next('route');
        else next();
    
 },function(req, res,next){
   res.render('user/home',{id:req.params.id,name:req.query.name});
 });
 app.get('/user/:id', function(req, res,next){
     res.send("参数错误！！！"+app.locals.editor+app.get('key'))
 });
app.use(function(req,res){
     res.status(404);
     res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'),function(){
    console.log("app started on http://localhost:"+app.get('port'))
});