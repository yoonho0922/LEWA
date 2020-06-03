const request = require('request'); // request
const cheerio = require('cheerio'); // cheerio
const sanitizeHtml = require('sanitize-html'); // sanitize-html
Future = Npm.require('fibers/future'); // fibers/future

Meteor.methods({

  // 단어 뜻과 예문 가져오는 함수
  'word_searching':function(args) {

    const fut = new Future(); // Future 객체 생성
    const word = args; // 받아온 인자 값을 word 변수에 저장

    Meteor.setTimeout(function() {
      var link = 'http://aha-dic.com/View.asp?word=' + word; // 단어 뜻 가져오는 링크

      request.get(link, function (err, response, html) {
        const $ = cheerio.load(html,{decodeEntities: true});
        const wordmeaning =new Array();
        wordmeaning[0] = sanitizeHtml($('ul li').html(),{ parser: {decodeEntities: true}});
        wordmeaning[1] = sanitizeHtml($('fieldset.panel span').html(), { parser: {decodeEntities: true}});
        fut.return(wordmeaning);// client로 단어의 뜻과 예문 return
      })
    }, 1000);

    return fut.wait(); // sync하게 코딩할 수 있도록
  },


  // 기사 본문 스크래핑하는 함수
  'scraping_content':function(link_article) {

    const fut = new Future(); // Future 객체 생성
    const link = link_article; // 받아온 인자 값을 link 변수에 저장

    Meteor.setTimeout(function() {
      request.get(link, function (err, response, html) {
        const $ = cheerio.load(html,{decodeEntities: true});

        // 기사 본문 내용 스크래핑
        article = sanitizeHtml($('div.view_con_t').eq(1).html(),{ parser: {decodeEntities: true}});

        fut.return(article); // client로 기사 본문 내용 return
      })
    }, 1000);
    return fut.wait();

  },

  // 기사 제목 스크래핑하는 함수
  'scraping_title':function(link_article) {

    const fut = new Future(); // Future 객체 생성
    const link = link_article; // 받아온 인자 값을 link 변수에 저장

    Meteor.setTimeout(function() {
      request.get(link, function (err, response, html) {
        const $ = cheerio.load(html,{decodeEntities: true});

        // 기사 제목 스크래핑
        title = sanitizeHtml($('h1.view_tit').html(),{ parser: {decodeEntities: true}});

        fut.return(title); // client로 기사 제목 return
      })
    }, 1000);
    return fut.wait();

  },

  // 기사 이미지(썸네일) 스크래핑
  'scraping_img':function(link_article) {

    const fut = new Future(); // Future 객체 생성
    const link = link_article; // 받아온 인자 값을 link 변수에 저장

    Meteor.setTimeout(function() {
      request.get(link, function (err, response, html) {
        const $ = cheerio.load(html,{decodeEntities: true});

        // 기사 썸네일 스크래핑
        thumbnail = sanitizeHtml($('div.view_con img').attr('src'),{ parser: {decodeEntities: true}});

        fut.return(thumbnail);// client로 src 값 return
      })
    }, 1000);
    return fut.wait();

  }
});