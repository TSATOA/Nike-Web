const express = require('express')
const router = express.Router();

//크롤링 준비
const cheerio = require("cheerio")
const axios = require("axios")
const iconv = require("iconv-lite")

const url = "https://www.nike.com/kr/launch/?type=feed" //나이키 SNKRS 페이지

router.get("/crawling",function(req,res){
    axios({url:url, method:"GET", responseType:"arraybuffer"}).then(function(html){
        const content = iconv.decode(html.data,"EUC-KR").toString()
        const $ = cheerio.load(content)
        const table = $(".launch-category ul li div div div div div")  //나이키 태그 찾는중
        table.each(function(i,tag){
            console.log($(tag).text().trimEnd())
        })
        res.send({success:200})
    })
})

router.get("/",function(req,res){
    res.render('main',{title:"태곤이의 신발 발매 사이트"})
})

module.exports = router