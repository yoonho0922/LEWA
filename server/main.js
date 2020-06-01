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
        // meaning = sanitizeHtml($('ul li').html(),{ parser: {decodeEntities: true}});
        const wordmeaning =new Array();
        wordmeaning[0] = sanitizeHtml($('ul li').html(),{ parser: {decodeEntities: true}});
        wordmeaning[1] = sanitizeHtml($('fieldset.panel span').html(), { parser: {decodeEntities: true}});
        // console.log(link); // 새로운 링크 잘 연결 되었는가??
        // console.log(word); // 인자 값 잘 가져왔는가??
        // console.log(wordmeaning[0]);
        // console.log(wordmeaning[1]);// 뜻이 잘 나오는가??
        fut.return(wordmeaning);// client로 값 return
      })
    }, 1000);
    return fut.wait(); // async? sync?
  },


  // 기사 긁어오는 함수
  'scraping_content':function(link_article) {

    const fut = new Future(); // Future 객체 생성
    const link = link_article; // 받아온 인자 값을 word 변수에 저장
    //link = http://www.koreaherald.com/view.php?ud=20200601000228

    Meteor.setTimeout(function() {
      // var link = 'http://aha-dic.com/View.asp?word=' + word;
      request.get(link, function (err, response, html) {
        const $ = cheerio.load(html,{decodeEntities: true});

        // article이 기사 가져오는거 -> 성공
        article = sanitizeHtml($('div.view_con_t').eq(1).html(),{ parser: {decodeEntities: true}});
        // console.log(article)

        fut.return(article);// client로 값 return
      })
    }, 1000);
    return fut.wait(); // async? sync?

  },

  'scraping_title':function(link_article) {

    const fut = new Future(); // Future 객체 생성
    const link = link_article; // 받아온 인자 값을 word 변수에 저장

    Meteor.setTimeout(function() {
      // var link = 'http://aha-dic.com/View.asp?word=' + word;
      request.get(link, function (err, response, html) {
        const $ = cheerio.load(html,{decodeEntities: true});

        // 제목 가져오기
        article = sanitizeHtml($('h1.view_tit').html(),{ parser: {decodeEntities: true}});
        // console.log(article)

        fut.return(article);// client로 값 return
      })
    }, 1000);
    return fut.wait(); // async? sync?

  }
});

// ARTICLE 디비 지우기
// DB_ALL_ARTICLES.remove({});