FlowRouter.template('/article/:_id', 'article');

Template.article.onCreated(function() {
    var _id = FlowRouter.getParam('_id')
    DB_ARTICLES_10.update({_id: _id}, {
        $inc: {viewCount: 1}  //조회수 1 증가 업데이트
    });
    var article_id=DB_ARTICLES_10.findOne({_id:_id}).article_id;
    DB_ALL_ARTICLES.update({_id:article_id}, {
        $inc: {viewCount: 1}  //조회수 1 증가 업데이트

    });

});

Template.article.helpers({
    //기사 관련
    board: function() {
        var _id = FlowRouter.getParam('_id');
        return DB_ARTICLES_10.findOne({_id: _id});
    },
    createdAt: function() {
        return this.createdAt.toStringYMDHMS();
    },
    clip_img: function () {

        if(Meteor.user() == null){
            // return 'pre_scrap.png';
            return '☆';
        }

        var post_id = FlowRouter.getParam('_id');
        var user_id = Meteor.user()._id;

        if(!DB_CLIPS.findOne({post_id : post_id, user_id : user_id})){
            return '☆';
            // return 'pre_scrap.png';
        }else{
            // return 'post_scrap.png';
            return '★';
        }
    },
    viewadd:function () {
        var title=DB_ARTICLES_10.findOne({_id:_id}).title;
        alert(title);
        DB_ALL_ARTICLES.update({title:title}, {
            $inc: {viewCount: 1}  //조회수 1 증가 업데이트

        });

    }

});

Template.article.events({
    'click #btn-gohome': function() {
    location.href="/";
},
    'click #btn-goquiz': function() {
        location.href = "/quiz";
    },
    'click #btn-clip': function() {
        if(!Meteor.user()){
            alert('로그인해주세요.');
            return;
        }

        var post_id = FlowRouter.getParam('_id');
        var user_id = Meteor.user()._id;
        var clip = DB_CLIPS.findOne({post_id : post_id, user_id : user_id});
        var articles = DB_ARTICLES_10.findOne({_id : post_id});
        if(!clip){
            DB_CLIPS.insert({   //스크랩 관계 목록 업데이트
                post_id : post_id,
                user_id : user_id
            });
            DB_ARTICLES_10.update({_id: post_id}, articles);



            alert('스크랩');
        }else{
            DB_CLIPS.remove({_id : clip._id});     //스크랩 관계 목록 삭제
            DB_ARTICLES_10.update({_id: post_id}, articles);
            alert('스크랩 취소');
        }
    },
});