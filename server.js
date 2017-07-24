let express=require('express');
let index=require('./routes/index');
let user=require('./routes/user');
let category=require('./routes/category');
let article=require('./routes/article');
let bodyParser=require('body-parser');
let path=require('path');
let session=require('express-session');
let MongoStore=require('connect-mongo')(session);
let flash=require('connect-flash');
let app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('.html',require('ejs').__express);
app.use(express.static(path.resolve('node_modules')));
app.use(express.static(path.resolve('public')));
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'bk',
    store:new MongoStore({
        url:'mongodb://127.0.0.1/201704blog'
    })
}));
app.use(flash());
app.use(function (req, res, next) {
    res.locals.success=req.flash('success').toString();
    res.locals.error=req.flash('error').toString();
    res.locals.user=req.session.user;
    next()
});
app.use('/',index);
app.use('/user',user);
app.use('/category',category);
app.use('/article',article);

app.listen(8081,function () {
    console.log('ok');
});