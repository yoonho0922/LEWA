FlowRouter.template('/wordBook', 'wordBook');

Template.wordBook.helpers({
    words1: function () {

        var words_list1 = new Array();
        var listed1 = DB_WORDS.findAll({user_id: Meteor.user()._id,form:1});
        listed1.forEach(function (element) {
            words_list1.push(DB_WORDS.findOne({word: element.word}));
        });
        return words_list1;
    },
    words2: function () {

        var words_list2 = new Array();

        var listed2 = DB_WORDS.findAll({user_id: Meteor.user()._id,form:2});
        listed2.forEach(function (element) {
            words_list2.push(DB_WORDS.findOne({word: element.word}));
        });
        return words_list2;
    },
    titles:function (title) {
        return DB_ALL_ARTICLES.findOne({_id:title}).title;
    },
    math: function(lvalue, operator, rvalue) { //index 1부터 시작하게 도와주는 함수
        lvalue = parseInt(lvalue);
        rvalue = parseInt(rvalue);

        return { "+": lvalue + rvalue, "/": lvalue / rvalue }[operator];
    },
});

Template.wordBook.events({
    'click #eachWord1': function(){
        swal("사전뜻 넣어주세용");
    },
    'click #eachWord2': function(){
        swal("사전뜻 넣어주세용");
    }


})