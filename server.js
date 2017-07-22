let express=require('express');
let index=require('./routes/index');
let user=require('./routes/user');
let category=require('./routes/category');
let app=express();

app.use('/',index);
app.use('/user',user);
app.use('/category',category);

app.listen(9090,function () {
    console.log('ok');
});