FlowRouter.template('/articleList', 'articleList');

Template.articleList.helpers({
    articles: function () {
        return DB_ARTICLES.findAll({}, {sort: {viewCount: -1}});
        //기사들을 조회수의 내림차순으로 return
    },
    image_link: function() {
        // 저장 된 이미지 링크를 반환
        return DB_FILES.findOne({_id: this.image}).link();
    },

    get_i_article: function() { //기사 하나끌고올라고 꼼지락거린 함수
        return DB_ARTICLES.findOne({_id: this.createdAt}).link();
    }
    });

Template.articleList.events({

});