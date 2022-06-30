const express = require('express')
const router = express.Router();
const db = require('../model/db');

//크롤링 준비
const cheerio = require("cheerio")
const axios = require("axios")
const iconv = require("iconv-lite");


const url = "https://www.nike.com/kr/launch/?type=upcoming" //나이키 SNKRS Upcoming페이지

router.get("/",function(req,res){
    res.render('main',{title:"태곤이의 신발 발매 사이트"})

    axios({url:url, method:"GET", responseType:"arraybuffer"}).then(function(html){
        const content = iconv.decode(html.data,"UTF-8").toString()
        const $ = cheerio.load(content)

        let shoeName = [];
        let launchDate = [];
        let Draw = [];
        let shoeImg = [];
        let shoeId = [];
        const ims = $("li.launch-list-item")
        
        db.items.destroy({where:{}})
        let k = 0;
        ims.each(function(i,tag){
            let cnt = 0;
            shoeName[k] = $(this).find('a.card-link').attr('title')
            shoeName[k] +=" "+ $(this).find('img').attr('alt')
            for(let j=0;j<k;j++){
                if(shoeName[k]==shoeName[j]){
                    shoeName[k]='';
                    cnt++;
                } 
            }
            if(cnt==0){
                launchDate[k] = $(this).attr('data-active-date')
                if( $(this).find('a.ncss-btn-primary-dark').text().replace(/^\s+|\s+$/gm,'')==''){
                    Draw[k] = "Sold Out"
                }else{
                    Draw[k] = $(this).find('a.ncss-btn-primary-dark').text().replace(/^\s+|\s+$/gm,'')
                }
                shoeImg[k] = $(this).find('img').attr('data-src')

                db.items.create({
                    shoeName:shoeName[k],
                    launchDate:launchDate[k],
                    Draw:Draw[k],
                    shoeImg:shoeImg[k]
                })
                k++;
            }
            
        })
    })


})


// router.get("/data/create",function(req,res){
//     let user_id = parseInt(Math.random()*10000)
//     db.items.create({shoeId:user_id}).then(function(result){
//         res.send({success:200})
//     })
// })


router.get("/data/read",function(req,res){
    db.items.findAll().then(function(result){
        res.send({success:200, data:result})
    })
})

module.exports = router