const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
const app = express()

/**
 * test:
 *  http://mp.weixin.qq.com/s?__biz=MzA4ODk4NDExNw%3D%3D&mid=2650046747&idx=5&sn=2160e3f4476fde8db3868ecb8d830056#wechat_redirect"
 */
app.get('/', function (req, res) {
  var feedsrc = req.originalUrl.split("feed=")[1];
  var options = {
        url: feedsrc,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36' // need a user agent to scrape page correctly.
        }
    };
    request(options, function (error, response, html) {
        if (!error && response.statusCode == 200) { 
            if (feedsrc.indexOf('weixin') > -1) { // if comes from weixin source.
                var $ = cheerio.load(html);
                // console.log(html);
                var imgs = $('img');
                console.log(imgs.length);
                imgs.each(function(i, doc){
                    $(this).attr("src", $(this).attr("data-src"));
                });

                $('body').append(
                    `<div 
                        class="banner"
                        style="
                            background-color:#262626;
                            width:100%;
                            height:50px;
                            box-shadow: 0px 1px 50px #5E5E5E;
                            position:fixed;
                            bottom:0px;
                            "
                     > 
                        <div>
                            <img
                                 src="http://chocoluffy.com/media/server/static/icon_1024.png"
                                 style="
                                    position: absolute;
                                    bottom: 1em;
                                    height: 60px;
                                    width: 60px;
                                    border-radius: 15px;
                                    margin-left: 1em;
                                    box-shadow: 0 1px 5px #A9DFFF, inset 0 0 3px;
                                "
                            >
                        </div>
                        <div 
                            style="
                                display: flex;
                                height: 100%;
                                align-items: center;
                                justify-content: center;
                                color: #fff;
                                font-size: 0.82em;
                                font-weight: 100;
                            "
                        >『鲸语』智能聚合本地最实用的资讯</div>
                        <div style="
                                    position: absolute;
                                    border: 1px solid #A9DFFF;
                                    border-radius: 5px;
                                    bottom: 0.8em;
                                    right: 1em;
                                    min-width: 20px;
                                    max-width: 70px;
                                    font-size: 0.82em;
                                    display: block;
                                    padding: 3px 9px;
                                    text-align: center;
                            "
                        >
                            <a 
                                href="https://appsto.re/ca/klNuhb.i"
                                style="
                                    color: white;
                                    font-weight: 100;
                                "
                            >去试试</a>
                        </div>
                     </div>`
                );
                
                res.send($.html());
            }
            else {
                res.send("else");
            } 
        };
    });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})  