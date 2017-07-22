let express=require('express');
let router=express.Router();
router.get('/signup',function (req, res) {
    res.send('注册')
});
router.post('/signup',function (req, res) {
    res.send('post 注册')
})
router.get('/signin',function (req, res) {
    res.send('登陆')
});
router.post('/signin',function (req, res) {
    res.send('post 登陆')
})
router.get('/signout',function (req, res) {
    res.send('退出')
});
module.exports=router;