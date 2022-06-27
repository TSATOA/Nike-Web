const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded());
const ejs = require("ejs")

//views의 front파일을 전달해준다
app.set('view engine', 'ejs');
app.set('views','./views');
app.use('/public',express.static(__dirname + '/public'));

const mainRouter = require("./router/mainRouter")
app.use('/',mainRouter)

app.listen(3000,function(req,res){
    console.log("서버 실행중입니다.")
})