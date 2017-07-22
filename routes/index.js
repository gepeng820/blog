let express=require('express');
let router=express.Router();
router.get('/',function (req, res) {
    res.send('主页')
});

module.exports=router;
