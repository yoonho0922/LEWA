FlowRouter.template('/navbar', 'navbar');
Template.navbar.events({
    'click #sign_in': function() {
        location.href="/login";
    },
    'click #sign_out': function() {
        Meteor.logout();
        alert("로그아웃 되었습니다.");
        location.href="/";      //로그인페이지 생기면 그 페이지로 연결하기
    }

})