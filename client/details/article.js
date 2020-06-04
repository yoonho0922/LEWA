FlowRouter.template('/article/:_id', 'article');

Template.article.onCreated(function() {
    var _id = FlowRouter.getParam('_id')
    DB_ALL_ARTICLES.update({_id:_id}, {
        $inc: {viewCount: 1}  //조회수 1 증가 업데이트

    });

});

Template.article.helpers({
    //기사 관련
    board: function() {
        var _id = FlowRouter.getParam('_id');
        return DB_ALL_ARTICLES.findOne({_id: _id});
    },
    createdAt: function() {
        return this.createdAt.toStringYMDHMS();
    },
    scrap: function () {

        if(Meteor.user() == null){
            return '스크랩';
        }

        var post_id = FlowRouter.getParam('_id');
        var user_id = Meteor.user()._id;

        if(!DB_CLIPS.findOne({post_id : post_id, user_id : user_id})){
            return '스크랩';
        }
        else {
            return '스크랩 취소'
        }
    },
    admire:function () {
        var email = Meteor.user().emails[0].address;
        if(email == 'admire@gmail.com')
            return true;
    },

});

Template.article.events({
    'click #btn-gohome': function() {
    location.href="/main";
},
    'click #btn-goquiz': function() {
        var _id = FlowRouter.getParam('_id')
        location.href = "/quiz/" + _id;
    },
    'click #btn-clip': function() {
        if(!Meteor.user()){
            alert('로그인해주세요.');
            return;
        }

        var post_id = FlowRouter.getParam('_id');
        var user_id = Meteor.user()._id;
        var clip = DB_CLIPS.findOne({post_id : post_id, user_id : user_id});
        var articles = DB_ALL_ARTICLES.findOne({_id : post_id});

        if(!clip){
            DB_CLIPS.insert({   //스크랩 관계 목록 업데이트
                post_id : post_id,
                user_id : user_id
            });
            DB_ALL_ARTICLES.update({_id: post_id}, articles);
            alert('스크랩되었습니다.');
        }else{
            DB_CLIPS.remove({_id : clip._id});     //스크랩 관계 목록 삭제
            DB_ALL_ARTICLES.update({_id: post_id}, articles);
            alert('스크랩이 취소되었습니다.');
        }
    },
    'click #btn-remove-article':function () {
        var _id = FlowRouter.getParam('_id');
        DB_ALL_ARTICLES.remove({_id:_id});
        location.href="/main";

    },

});