FlowRouter.template('/clipping', 'clipping');

Template.clipping.helpers({
    boards: function () {

        var clip_articles = new Array();
        var cliping = DB_CLIPS.findAll({user_id: Meteor.user()._id})
        cliping.forEach(function (element) {
            clip_articles.push(DB_CLIPS.findOne({_id: element.post_id}));
        });
        var boards = new Array();

////몰ㄹ라 모르겠음

    },

    //     return DB_CLIPS.findAll({}, {sort: {viewCount: -1}});
    //     //기사들을 조회수의 내림차순으로 return
    // },
    link: function() {
        // 저장 된 이미지 링크를 반환
        return DB_FILES.findOne({_id: this.file_id}).link()
    }
});

Template.clipping.events({

});