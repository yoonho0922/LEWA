FlowRouter.template('/articleList', 'articleList');

Template.articleList.onRendered(function() {

    //오늘 날짜 가져오기 형식:["2020", "5", "26"]
    var date = new Date();
    var arrDate = new Array();
    arrDate = [date.getFullYear().toString(), (date.getMonth()+1).toString(), date.getDate().toString()];
    Session.set('searchingDate', arrDate);
});

Template.articleList.helpers({
    articleDate:function(){
        var date = Session.get('searchingDate')
        return DB_ALL_ARTICLES.findAll({date: date});

    },

    math: function(lvalue, operator, rvalue) { //index 1부터 시작하게 도와주는 함수
        lvalue = parseInt(lvalue);
        rvalue = parseInt(rvalue);

        return { "+": lvalue + rvalue, "/": lvalue / rvalue }[operator];
    },

    searchingDate: function(){
        var date = Session.get('searchingDate')
        return date[0]+'. '+date[1]+'. '+date[2];
    },

    SD_Year: function(){
        var date = Session.get('searchingDate')
        return date[0];
    },
    SD_Month: function() {
        var date = Session.get('searchingDate')
        return date[1];
    },
    SD_Day: function(){
        var date = Session.get('searchingDate')
        return date[2];
    }

});

Template.articleList.events({
    'click #btn-createdAt': function(){
        var sdy = $('#sdy').val();
        var sdm = $('#sdm').val();
        var sdd = $('#sdd').val();
        var arrDate = new Array();
        arrDate = [sdy, sdm, sdd];

        Session.set('searchingDate', arrDate);

    }
});