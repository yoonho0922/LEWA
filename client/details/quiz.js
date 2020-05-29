FlowRouter.template('/quiz', 'quiz');

Template.quiz.onRendered(function () {
    Session.set('index', 0);
});


Template.quiz.helpers({
    meaning: function () {
        var wordArr=['happy','sad','return'];
        var idx= Session.get('index');
        Session.set('wordArr[idx]',wordArr[idx]);
        Meteor.call('word_searching', wordArr[idx], function (error, result) {
            if (error) {
                alert('Error');
            } else {
                result = result[0];
                result = result.replace(/<b>/g, '');
                result = result.replace(/<\/b>/g, '');
                Session.set('meaning', result);
                // console.log(Session.get('data'));
            }
        })
        return Session.get('meaning');
    }
});
// window.onload = function () {
//     //while (저장한 단어 다 돌때까지)
//     const correctWord="hello"; //단어장에 저장한 단어들 불러오기
//     Session.set('correctWord', correctWord);
//     // callback 함수를 이용해서 Meteor.call() 호출
//     Meteor.call('word_searching',correctWord, function (error, result){
//         if (error) {
//             alert('Error');
//         } else {
//             result=result[0];
//             result = result.replace(/<b>/g, '');
//             result = result.replace(/<\/b>/g, '');
//             Session.set('data1', result);
//             // console.log(Session.get('data'));
//         }
//     })
// }

Template.quiz.events({
    'keyup #inp-word': function(evt) {
        if (evt.which === 13) {
            const inpWord = $('#inp-word').val();
            Session.set('inpWord', inpWord);
            const cor_word = Session.get('wordArr[idx]');
            const inp_word = Session.get('inpWord');
            if (cor_word !== inp_word) {
                swal("틀렸습니다! 답은 "+cor_word+"입니다!");
            } else {
                swal("정답입니다!")
            }

        }
    },
    'click #but-next':function () {
        Session.set('index',Session.get('index')+1);

    }
});
