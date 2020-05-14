FlowRouter.template('/', 'main');

Template.main.helpers({
  articles: function () {
    return DB_ARTICLES.findAll({}, {sort: {viewCount: -1}});
    //기사들을 조회수의 내림차순으로 return
  },
  image_link: function() {
    // 저장 된 이미지 링크를 반환
    return DB_FILES.findOne({_id: this.image}).link();
  }
});

Template.main.events({

});