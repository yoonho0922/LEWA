FlowRouter.template('/article/:_id', 'article');



Template.article.helpers({
    //기사 관련
    board: function() {
        var _id = FlowRouter.getParam('_id');
        return DB_ARTICLES.findOne({_id: _id});
    },
    createdAt: function() {
        return this.createdAt.toStringYMDHMS();
    }
});

Template.article.events({
    'click #btn-gohome': function() {
    location.href="/";
},
    'click #btn-goquiz': function() {
        location.href = "/quiz";
    },
});