FlowRouter.template('/', 'main');


Template.main.helpers({
    articles: function () { //하고 싶었던거: 1. dataString에 [0]번째(가장최신)기사 date : dateString
    //2. dateString에 해당되는거, 조회순으로 sort하기
    return DB_ARTICLES_10.findAll({}, {sort: {viewCount: -1}, limit: 10});
    // var dateString = DB_ARTICLES.findAll[0].date; //1. 왜 안됨
    // return DB_ARTICLES.find({date : dateString },{ sort: {viewCount: -1}}); //2.
    //기사 타이틀은 조회수!!의 내림차순, 10개 return
  },
  //return article10Collection.find({},{sort: {viewCount: -1}}).fetch();
  //return DB_ARTICLES.findAll({}, {sort: {createdAt: -1, viewCount: -1}, limit: 10});
  //var arr = new Array(DB_ARTICLES.findAll({}, {sort: {createdAt: -1}, limit: 10}).fetch());
  //findAll({},{sort: {viewCount: -1}})

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
  },
  words: function () {
      return DB_SEARCH_COUNT.findAll({user_id:Meteor.user()._id},{sort:{count:-1},limit:10});
  }

});

Template.main.events({
  // 'click #go_article': function () {
  //   var view = DB_ARTICLES.findOne({_id: _id});
  //   view.viewCount+=1;

  // }

});