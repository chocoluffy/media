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
                    `<div style="height: 70px; display:block; width:100%;" />
                    <div
                        class="banner"
                        style="
                            background: linear-gradient(-60deg, #000, #666);
                            width:100%;
                            height:70px;
                            box-shadow: 0 -7px 10px -5px rgba(28, 64, 85, 0.4);
                            position:fixed;
                            bottom:0px;
                            "
                     >
                        <div style="
                            display: inline-flex;
                            align-items: center;
                        ">
                        <div style="
                                height:70px;
                                width:70px;
                                background: linear-gradient(60deg, #40cca0, #47a3da);
                                display: inline-flex;
                                align-items: center;
                                justify-content: center;
                        ">
                            <img
                                 src="https://firebasestorage.googleapis.com/v0/b/elema-f0ca4.appspot.com/o/images%2Ficon.svg?alt=media&token=69368b7c-becd-4f80-9ee1-6dd311e44148"
                                 style="
                                    width: 35px;
                                "
                            >
                        </div>
                        <div
                            style="
                                display: inline-flex;
                                height: 100%;
                                margin: 0 auto;
                                align-items: center;
                                justify-content: center;
                                color: #fff;
                                padding-left: 15px;
                            "
                        >
                            <span>
                                <span style="font-size: 16px; font-weight: 500; line-height:20px;-webkit-user-select: none;">鲸语</span><br>
                                <span style="font-size: 12px; font-weight: 300; line-height:14px;-webkit-user-select: none;">智能聚合本地最实用的资讯</span>
                            </span>
                        </div>
                        </div>
                        <div style="
                                    position: absolute;
                                    bottom: 0em;
                                    height: 70px;
                                    right: 0em;
                                    min-width: 20px;
                                    max-width: 70px;
                                    font-size: 0.82em;
                                    display: flex;
                                    padding-left: 1em;
                                    padding-right: 1em;
                                    text-align: center;
                                    justify-content: center;
                                    align-items: center;
                            "
                        >
                            <a
                                href="https://appsto.re/ca/klNuhb.i"
                                style="
                                    color: #fff;
                                    font-weight: 300;
                                    border: 1px solid #fff;
                                    border-radius: 40px;
                                    padding: 5px 10px;
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
