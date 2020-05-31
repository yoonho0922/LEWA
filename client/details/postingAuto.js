FlowRouter.template('/postingAuto', 'postingAuto');

Template.postingAuto.onRendered(function() {
    // 화면이 그려지고 난 후 제일 먼저 수행
    Session.set('count', 0);
    Session.set('data', " ");
    Session.set('enter_content', []);
    Session.set('enter_title', [])

});

Template.postingAuto.helpers({

    link: function () {
        var arr = Session.get('enter_content');
        // console.log("arr: " + arr);
        for(var i = 0; i < arr.length; i++) {
            document.write(arr[i] + "<br>");
        }
        // return arr;
    }
});

Template.postingAuto.events({
    // 화면의 이벤트를 처리
    'click #btn-scraping': function(event) {
        var title;
        var content;

        var article_link = $('#inp-link').val(); // input 창에 입력된 단어 가져오기

        Meteor.call('scraping_content', article_link, function (error, result) {
            if(error) {
                alert('Error');
            } else{
                // result = result.replace(/<br>/g, '');
                // result = result.replace(/<br \/>/g, '');
                // var entering_content = new Array();
                var entering_content = result;
                Session.set('enter_content', entering_content);

                console.log(entering_content[1]);
                console.log(entering_content);
                Session.set('data', result);
                console.log(Session.get('data'));
            }
        })

        Meteor.call('scraping_title', article_link, function (error, result) {
            if(error) {
                alert('Error');
            } else{
                // result = result.replace(/<br>/g, '');
                // result = result.replace(/<br \/>/g, '');
                // var entering_content = new Array();
                var entering_title = result;
                Session.set('enter_title', entering_title);

                console.log(entering_title[1]);
                console.log(entering_title);
                Session.set('data', result);
                console.log(Session.get('data'));
            }
        })

    }
});