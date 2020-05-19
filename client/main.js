FlowRouter.template('/', 'main');


i=0;
Template.main.helpers({
  articles: function () {
    return DB_ARTICLES.findAll({}, {sort: {viewCount: -1}});
    //기사 타이틀은 조회수의 내림차순으로 return
  },
  image_link: function() {
    // 저장 된 이미지 링크를 반환
    return DB_FILES.findOne({_id: this.image}).link();
  },
  articles2:function () {
    return DB_ARTICLES.findAll({}, {sort: {createdAt: -1}});
    //기사 앨범형은 시간 내림차순으로 return
  },

  articles3:function () {
    i++;
    if(i==11)
      i=1;
    return i;

  },//조회순위 index 만들기


});

Template.main.events({
  // 'click #go_article': function () {
  //   var view = DB_ARTICLES.findOne({_id: _id});
  //   view.viewCount+=1;



  // }

});