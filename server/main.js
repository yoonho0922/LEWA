const request = require('request'); // request
const cheerio = require('cheerio'); // cheerio
const sanitizeHtml = require('sanitize-html');
Future = Npm.require('fibers/future'); // fibers/future

Meteor.methods({

  'word_searching':function(args) {

    const fut = new Future(); // Future 객체 생성
    const word = args; // 받아온 인자 값을 word 변수에 저장

    Meteor.setTimeout(function() {
      var link = 'http://aha-dic.com/View.asp?word=' + word;
      request.get(link, function (err, response, html) {
        const $ = cheerio.load(html,{decodeEntities: true});
        const meaning = sanitizeHtml($('ul li').html(), {
          parser: {
            decodeEntities: true
          }
        });
        // console.log(link); // 새로운 링크 잘 연결 되었는가??
        // console.log(word); // 인자 값 잘 가져왔는가??
        // console.log(meaning); // 뜻이 잘 나오는가??
        fut.return(meaning); // client로 값 return
      })
    }, 1000);
    return fut.wait(); // async? sync?

  }

});

