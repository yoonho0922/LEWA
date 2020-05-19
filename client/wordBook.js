FlowRouter.template('/wordBook', 'wordBook');

Template.wordBook.helpers({
    words: function () {

        var words_list = new Array();

        // words_list.push(DB_WORDS.findOne({user_id: Meteor.user()._id}));

        var listed = DB_WORDS.findAll({user_id: Meteor.user()._id})
        listed.forEach(function (element) {
            words_list.push(DB_WORDS.findOne({word: element.word}));
        });
        return words_list;
    },
})