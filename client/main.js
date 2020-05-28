FlowRouter.template('/', 'main');


Template.main.helpers({
<<<<<<< Updated upstream
  articles: function () {
    return DB_ARTICLES.findAll({}, {sort: {viewCount: -1}, limit: 10});
=======
    articles: function () { //하고 싶었던거: 1. dataString에 [0]번째(가장최신)기사 date : dateString
    //2. dateString에 해당되는거, 조회순으로 sort하기
    return DB_ARTICLES_10.findAll({}, {sort: {viewCount: -1}, limit: 10});
    // var dateString = DB_ARTICLES.findAll[0].date; //1. 왜 안됨
    // return DB_ARTICLES.find({date : dateString },{ sort: {viewCount: -1}}); //2.
>>>>>>> Stashed changes
    //기사 타이틀은 조회수!!의 내림차순, 10개 return
  },

  image_link: function() {
    // 저장 된 이미지 링크를 반환
    return DB_FILES.findOne({_id: this.image}).link();
  },

  articles2:function () {
    return DB_ARTICLES_10.findAll({}, {sort: {createdAt: -1}, limit: 10});
    //기사 앨범형은 시간!! 내림차순, 10개 return
  },

  math: function(lvalue, operator, rvalue) { //index 1부터 시작하게 도와주는 함수
    lvalue = parseInt(lvalue);
    rvalue = parseInt(rvalue);

    return { "+": lvalue + rvalue, "/": lvalue / rvalue }[operator];
    //index + 1을 return
  }

});

Template.main.events({
  // 'click #go_article': function () {
  //   var view = DB_ARTICLES.findOne({_id: _id});
  //   view.viewCount+=1;



  // }

});