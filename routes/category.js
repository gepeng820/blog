let express=require('express');
let {Category}=require('../model');
let router=express.Router();
router.get('/list',function (req, res) {
    Category.find({user:req.session.user._id},function (err, categories) {
        res.render('category/list',{categories,title:'文章分类管理'})
    })
});
router.get('/add',function (req, res) {
    res.render('category/add',{title:'增加分类'})

});
router.post('/add',function (req, res) {
    let category=req.body.category;
    let user=req.session.user._id;
    Category.findOne({name:category,user},function (err, result) {
        if (err){
            req.flash('error',err.toString());
            res.redirect('back')
        }else {
            if (result){
                req.flash('error','分类已存在');
                res.redirect('back')
            }else {
                Category.create({name:category,user},function (err, doc) {
                    if(err){
                        req.flash('error',err.toString());
                        res.redirect('back');
                    }else {
                        req.flash('success','添加成功');
                        res.redirect('/category/list');
                    }
                }
                )
            }
        }
    })
});
router.get('/delete/:_id',function (req, res) {
    let _id=req.params._id;
    Category.remove({_id},function (err, result) {
        if (err){
            req.flash('error',err.toString());
            res.redirect('back');
        }else {
            req.flash('success','删除成功');
            res.redirect('back');
        }
    })

});
module.exports=router;
