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
});

Template.clipping.events({

});