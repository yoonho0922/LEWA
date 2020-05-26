FlowRouter.template('/navbar', 'navbar');

Template.navbar.helpers({
    admire:function () {
        var email = Meteor.user().emails[0].address;
        if(email == 'admire@gmail.com')
            return true;
    },

})

Template.navbar.events({
    'click #sign_in': function() {
        location.href="/login";
    },
    'click #sign_out': function() {
        Meteor.logout();
        alert("로그아웃 되었습니다.");
        location.href="/";      //로그인페이지 생기면 그 페이지로 연결하기
    },
    'click #admire_posting': function() {
        var email = Meteor.user().emails[0].address;
        if( email != 'admire@gmail.com'){
            alert('권한이 없습니다.');
        }else{
            location.href="/posting";
        }
    },
    'click #article_list': function() {
        location.href="/articleList"
    },
    'click #article_clipping': function() {
        if(!Meteor.user()){
            alert('로그인해주세요.');
            return;
        }
        else {
            location.href="/clipping";
        }
    },
    'click #my_quiz': function() {
        if(!Meteor.user()){
            alert('로그인해주세요.');
            return;
        }
        else {
            location.href="/myQuiz";
        }
    },
    'click #word_list': function() {
        if(!Meteor.user()){
            alert('로그인해주세요.');
            return;
        }
        else {
            location.href="/wordBook";
        }
    },
    'click #admire_remove':function () {

        var remove_list = new Array();
        // var remove_articles=DB_ARTICLES.findAll({date:'5-26'})
        var today_date=DB_ARTICLES.findOne({}).date;//기사 올라간 날짜 가져오기
        // alert(today_date);
        DB_ARTICLES.findAll({date:today_date}).forEach(function (element) {
            // DB_ARTICLES.remove({_id:remove_articles._id})
            remove_list.push(DB_ARTICLES.findOne({_id:element._id})._id);
        })
        for(i=0; i<10;i++)
        {
            DB_ARTICLES.remove({_id:remove_list[i]})
        }
        //기사 초기화 기능!
        alert('기사초기화')

        // var email = Meteor.user().emails[0].address;
        // if( email != 'admire@gmail.com'){
        //     alert('권한이 없습니다.');
        // }else{
        //     DB_ARTICLES.remove({});
        //     alert('기사가 삭제되었습니다.')
        // }


    }


})