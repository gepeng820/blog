let mongoose=require('mongoose');
mongoose.Promise=Promise;
let ObjectId=mongoose.Schema.Types.ObjectId;
let conn=mongoose.createConnection('mongodb://127.0.0.1/201704blog');

let UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
});

let User=conn.model('User',UserSchema);
exports.User=User;

let CategorySchema = new mongoose.Schema({
    name:String,
    user:{type:ObjectId,ref:'User'}
});

let Category = conn.model('Category',CategorySchema);
exports.Category=Category;

let ArticleSchema= new mongoose.Schema({
    title:String,
    content:String,
    category:{type:ObjectId,ref:'Category'},
    user:{type:ObjectId,ref:'User'},
    createAt:{type:Date,default:Date.now}
});
let Article = conn.model('Article',ArticleSchema);
exports.Article=Article;