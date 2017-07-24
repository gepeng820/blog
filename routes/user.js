let express=require('express');
let router=express.Router();
let multer=require('multer');
let upload=multer({dest:'./public'});
let {User}=require('../model');
router.get('/signup',function (req, res) {
    res.render('user/signup',{title:'用户注册'})
});
router.post('/signup',upload.single('avatar'),function (req, res) {
   let user=req.body;
    user.avatar=`/${req.file.filename}`;
    User.findOne({username:user.username},function (err, oldUser) {
       if (err){
           req.flash('error',err.toString());
         res.redirect('back')
       }else {
           if(oldUser){
               req.flash('error','用户名已存在');
               res.redirect('back')
           }else {
               User.create(user,function (err, doc) {
                   if(err){
                       req.flash('error',err.toString());
                       res.redirect('back');
                   }else {
                       req.flash('success','恭喜您注册成功');
                       res.redirect('/user/signin');
                   }
               })
           }
       }
   });

});
router.get('/signin',function (req, res) {
    res.render('user/signin',{title:'用户登录'})
});
router.post('/signin',function (req, res) {
    let user=req.body;
    User.findOne(user,function (err, result) {
        if(err){
            req.flash('error',err.toString());
            res.redirect('back')
        }else {
            if (result){
                req.flash('success','恭喜您登陆成功');
                req.session.user=result;
                res.redirect('/');
            }else {
                req.flash('error','用户名或密码错误');
                res.redirect('back')
            }
        }
    })
});
router.get('/signout',function (req, res) {
    req.session.user=null;
    res.redirect('/')
});
module.exports=router;