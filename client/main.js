FlowRouter.template('/', 'main');


Template.main.helpers({
  articles: function () {
    return DB_ARTICLES.findAll({}, {sort: {viewCount: -1}, limit: 10});
    //기사 타이틀은 조회수!!의 내림차순, 10개 return
  },

  image_link: function() {
    // 저장 된 이미지 링크를 반환
    return DB_FILES.findOne({_id: this.image}).link();
  },

  articles2:function () {
    return DB_ARTICLES.findAll({}, {sort: {createdAt: -1}, limit: 10});
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