let express=require('express');
let {Article,Category} = require('../model');
let router=express.Router();

router.get('/add',function (req, res) {
    Category.find({user:req.session.user._id},function (err, categories) {
        res.render('article/add',{title:'发表文章',categories,article:{}});
    });

});
router.post('/add',function (req, res) {
  let article=req.body;
  article.user=req.session.user._id;
  Article.create(article,function (err,doc) {
      if (err){
          req.flash('error',err.toString());
          res.redirect('back');
      }else {
         req.flash('success','文章发表成功');
         res.redirect('/');
      }
  })

});
router.get('/detail/:_id',function (req,res) {
   let _id=req.params._id;
   Article.findById(_id).populate('category').populate('user').exec((err,article)=>{
       res.render('article/detail',{title:'文章详情',article});
   });

});

router.get('/delete/:_id',function (req, res) {
   let _id=req.params._id;
   Article.remove({_id},function (err, result) {
       if(err){
           req.flash('error',err.toString());
           res.redirect('back');
       }else {
           req.flash('success','删除成功');
           res.redirect('/');
       }

   })
});

router.get('/update/:_id',function (req, res) {
    let _id=req.params._id;
    Category.find({user:req.session.user._id},function (err, categories) {
        Article.findById({_id},function (err, article) {
            res.render('article/add',{article,categories})
        })
    })
});

router.post('/update/:_id',function (req, res) {
    let _id=req.params._id;
    let article=req.body;
    Article.update({_id},article,function (err, result) {
        if (err){
            req.flash('error',err.toString());
            res.redirect('back')
        }else {
            res.redirect(`/article/detail/${_id}`)
        }
    })
});

module.exports=router;
