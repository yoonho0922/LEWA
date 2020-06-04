FlowRouter.template('/main', 'main');


Template.main.helpers({

    dateString: function() { //이거 오래 걸림
        return DB_ALL_ARTICLES.findOne({},{sort:{createdAt:-1}}).date[0]+'. '+DB_ALL_ARTICLES.findOne({},{sort:{createdAt:-1}}).date[1]+'. '+DB_ALL_ARTICLES.findOne({},{sort:{createdAt:-1}}).date[2];
    },

    articles: function () { //1. dataString에 [0]번째(가장최신)기사 date : dateString
    //2. dateString에 해당되는거, 조회순으로 sort하기
      var today_date=DB_ALL_ARTICLES.findOne({},{sort:{createdAt:-1}}).date;

      return DB_ALL_ARTICLES.findAll({date:today_date}, {sort: {viewCount: -1},limit: 10});

    //기사 타이틀은 조회수의 내림차순, 10개 return
  },

  articles2:function () {
    var today_date=DB_ALL_ARTICLES.findOne({},{sort:{createdAt:-1}}).date;

    return DB_ALL_ARTICLES.findAll({date:today_date}, {sort: {createdAt: -1}});
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

});