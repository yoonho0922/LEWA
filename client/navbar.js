FlowRouter.template('/navbar', 'navbar');

Template.navbar.helpers({
    admire:function () {
        var email = Meteor.user().emails[0].address;
        if(email == 'admire@gmail.com')
            return true;
    },

})

Template.navbar.events({
    'click #sign_in': function () {
        location.href = "/";
    },
    'click #sign_out': function () {
        Meteor.logout();
        alert("로그아웃 되었습니다.");
        location.href = "/";      //로그인페이지 생기면 그 페이지로 연결하기
    },
    'click #admire_posting': function () {
        var email = Meteor.user().emails[0].address;
        if (email != 'admire@gmail.com') {
            alert('권한이 없습니다.');
        } else {
            location.href = "/postingAuto";
        }
    },

    'click #article_clipping': function () {
        if (!Meteor.user()) {
            alert('로그인해주세요')
            return;
        } else {

        }
    },

    'click #word_list': function () {
        if (!Meteor.user()) {
            alert('로그인해주세요')
            return;
        } else {

        }
    }
});