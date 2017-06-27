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
                    `<div style="height: 49px; display:block; width:100%;" />
                    <div
                        class="banner"
                        style="
                            background-color:#fff;
                            width:100%;
                            height:49px;
                            box-shadow: 0px 0px 10px rgba(0, 0, 0, .15);
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
                                    height: 40px;
                                    width: 40px;
                                    border-radius: 2px;
                                    margin-left: 1em;
                                    box-shadow: 0 1px 5px #A9DFFF, inset 0 0 3px;
                                "
                            >
                        </div>
                        <div
                            style="
                                display: flex;
                                height: 100%;
                                margin: 0 auto;
                                align-items: center;
                                justify-content: center;
                                color: #262626;
                                font-size: 0.82em;
                                font-weight: 300;
                            "
                        >『鲸语』智能聚合本地最实用的资讯</div>
                        <div style="
                                    position: absolute;
                                    background-color: #262626;
                                    bottom: 0em;
                                    height: 49px;
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
