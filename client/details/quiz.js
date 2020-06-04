FlowRouter.template('/quiz/:_id', 'quiz');

Template.quiz.onRendered(function () {
    var _id = FlowRouter.getParam('_id')
    Session.set('index', 0); // index 초기화
});

Template.quiz.helpers({
    number : function(){
        if(Session.get('index')!==Session.get('wordQuizArrlen')){
            return Session.get('index')+1;
        } else{
            return ' ';
        }
    },
    endCurrentQuiz: function () {
        return Session.get('endCurrentQuiz');
    },
    // 단어 뜻 불러오는 것
    meaning: function () {
        var _id = FlowRouter.getParam('_id')
        var idx = Session.get('index');
        var len = DB_WORDS.findAll({article_id: _id, user_id: Meteor.userId()}).length;
        if(len != 0) {
            var wordArr = new Array();
            for(var i=0; i < len; i++) {
                wordArr[i]=DB_WORDS.findAll({article_id: _id, user_id: Meteor.userId()})[i].word;
            }
            var wordQuizArr = new Array();
            var a=0;
            var temp;
            for (var i=0; i<wordArr.length; i++) {
                for (var j=0; j<wordArr.length; j++) {
                    if (wordArr[i]===wordArr[j]) {
                        temp=wordArr[i];
                        wordArr[j]=0;
                        wordArr[i]=temp;
                    }
                }
            }
            for (var i=0; i<wordArr.length; i++){
                if(wordArr[i]!==0){
                    wordQuizArr[a]=wordArr[i];
                    a++;
                }
            }
            Session.set('wordQuizArrlen',wordQuizArr.length);
            if(idx >= wordQuizArr.length) {
                Session.set('endCurrentQuiz', true);
            }
            if(idx == null)
                console.log(" ")
            else {
                Session.set('wordQuizArr[idx]',wordQuizArr[idx]);
                Meteor.call('word_searching',wordQuizArr[idx], function (error, result){
                    if (error) {
                        alert('Error');
                    } else {
                        result=result[0];
                        result = result.replace(/<b>/g, '');
                        result = result.replace(/<\/b>/g, '');
                        Session.set('meaning', result);
                    }
                })
            }
            return Session.get('meaning');
        }
    }
});

Template.quiz.events({
    'keyup #inp-word': function(evt) {
        if (evt.which === 13) {
            const inpWord = $('#inp-word').val();
            Session.set('inpWord', inpWord);
            const cor_word = Session.get('wordQuizArr[idx]');
            const inp_word = Session.get('inpWord');
            if (cor_word !== inp_word) {
                swal("틀렸습니다! 답은 "+cor_word+"입니다!");
            } else {
                swal("정답입니다!")
            }
        }
    },

    'click #but-back':function () {
        if (Session.get('index')>0){
            Session.set('index', Session.get('index') - 1);
        }
        $('#inp-word').val('');
    },
    'click #but-next':function () {
        Session.set('index',Session.get('index')+1);
        $('#inp-word').val('');
    },
    'click #btn-main':function () {
        location.href="/main";
    },
    'click #btn-gotowordbook':function () {
        location.href=" /wordBook";
    }
});
