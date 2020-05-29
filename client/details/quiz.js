FlowRouter.template('/quiz', 'quiz');

Template.quiz.onRendered(function () {
    console.log("onRendered");
    Session.set('index', 0); // index 초기화
    Session.set('loading', 'Loading...');
    // Session.set('currentQuiz', true);

});

Template.quiz.helpers({
    endCurrentQuiz: function () {
        return Session.get('endCurrentQuiz');
    },
    // 단어 뜻 불러오는 것
    meaning: function () {
        console.log("helpers-meaning");
        var wordArr = ['apple', 'banana', 'grape', 'melon', 'strawberry'];
        var idx = Session.get('index');

        if(idx >= wordArr.length) {
            Session.set('endCurrentQuiz', true);
        }
        if(idx == null)
            console.log(" ")
        else {
            Session.set('wordArr[idx]', wordArr[idx]);
            Meteor.call('word_searching',wordArr[idx], function (error, result){
                if (error) {
                    alert('Error');
                } else {
                    console.log("helpers-meaning-meteor.call");
                    result=result[0];
                    result = result.replace(/<b>/g, '');
                    result = result.replace(/<\/b>/g, '');
                    Session.set('meaning', result);
                    // return Session.get('meaning');
                }
            })
        }


        return Session.get('meaning');
    }
});

Template.quiz.events({
    'keyup #inp-word': function(evt) {
        if (evt.which === 13) {
            const inpWord = $('#inp-word').val();
            Session.set('inpWord', inpWord);
            const cor_word = Session.get('wordArr[idx]');
            const inp_word = Session.get('inpWord');
            if (cor_word !== inp_word) {
                alert("틀렸습니다! 답은 "+cor_word+"입니다!");
            } else {
                swal("정답입니다!")
            }

        }
    },
    'click #but-next':function () {
        Session.set('index',Session.get('index')+1);

    },
    'click #btn-main':function () {
        location.href='/';
    },
    'click #btn-gotowordbook':function () {
        location.href=" /wordBook";
    }
});
