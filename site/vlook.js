var express=require('express');
var app=express();
var handlebars = require('handlebars')
                 .create({ defaultLayout:'main' }); 
app.engine('handlebars', handlebars.engine); 
app.set('view engine', 'handlebars');

app.set('port',process.env.PORT||3000);

app.get('/', function(req, res){
    res.render('home');
}); 

app.get('/about', function(req, res){          
     res.render('about');
});  

app.use(function(req,res){
   res.type('text/plain');
   res.status(404);
   res.send('糟糕，页面不翼而飞了！')
});

app.listen(app.get('port'),function(){
    console.log("app started on http://localhost:"+app.get('port'))
});