FlowRouter.template('/clipping', 'clipping');

Template.clipping.helpers({
    boards: function () {

        var clip_articles = new Array();
        var clipped = DB_CLIPS.findAll({user_id: Meteor.user()._id})
        clipped.forEach(function (element) {
            clip_articles.push(DB_ALL_ARTICLES.findOne({_id: element.post_id}));
        });
        return clip_articles;
    },
    image_link: function() {
        // 저장 된 이미지 링크를 반환
        return DB_FILES.findOne({_id: this.image}).link();
    },
});

Template.clipping.events({

});