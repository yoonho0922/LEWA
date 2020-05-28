FlowRouter.template('/articleList', 'articleList');

<<<<<<< Updated upstream
Template.articleList.helpers({
    articles10: function (num) { //기사 10개씩 받아오는 함수
        //이건이건 안돼 포기 이건 그 DB랑 연결해서 받아야겠음
        return DB_ARTICLES.findAll({index: num}, {sort: {viewCount: -1}, limit: 10} );
        //기사들을 조회수의 내림차순으로 return
    },

    //return _.map(_.range(0, 10), function(idx) {
   //     return DB_ARTICLES.findAll({}, {sort: {viewCount: -1}} );
   // });


    articles: function () {
        return DB_ARTICLES.findAll({}, {sort: {viewCount: -1}});
        //기사들을 조회수의 내림차순으로 return
    },

    articles00: function (n) {
        this.articles.forEach(function(i){
            if(i/10 === n)
                return DB_ARTICLES.findAll({}, {sort: {viewCount: -1}})[i];
        });
        //기사들을 조회수의 내림차순으로 return
    },

    article: function() { //기사 하나끌고올라고 꼼지락거린 함수
        return DB_ARTICLES.findOne({_id: this.createdAt}).link();
    },
=======
Template.articleList.onRendered(function() {

    //오늘 날짜 가져오기 ["2020", "5", "26"]
    var date = new Date();
    var arrDate = new Array();
    arrDate = [date.getFullYear().toString(), (date.getMonth()+1).toString(), date.getDate().toString()];

    Session.set('searchingDate', arrDate);
});

Template.articleList.helpers({

    //return DB_ARTICLES.findAll({date: num}, {sort: {viewCount: -1}, limit: 10} );

    //return _.map(_.range(0, 10), function(idx) {
    //     return DB_ARTICLES.findAll({}, {sort: {viewCount: -1}} );
    // });

    articleDate:function(){
        // var date = Session.get('searchingDate');
        // var searchingDate = $('#inp-Search').val();//날짜 검색값

        var date = Session.get('searchingDate')
        return DB_ALL_ARTICLES.findAll({date: date});

    },


    // articles: function () {
    //     return DB_ARTICLES.findAll({}, {sort: {viewCount: -1}});
    //     //return DB_ARTICLES.findAll({date: num}, {sort: {viewCount: -1}, limit: 10} );
    //     //기사들을 조회수의 내림차순으로 return
    // },

    // articles00: function (n) {
    //     this.articles.forEach(function(i){
    //         if(i/10 === n)
    //             return DB_ARTICLES.findAll({}, {sort: {viewCount: -1}})[i];
    //     });
    //     //기사 pagination 시도
    // },
>>>>>>> Stashed changes

    math: function(lvalue, operator, rvalue) { //index 1부터 시작하게 도와주는 함수
        lvalue = parseInt(lvalue);
        rvalue = parseInt(rvalue);

        return { "+": lvalue + rvalue, "/": lvalue / rvalue }[operator];
    },

<<<<<<< Updated upstream

    // searchcreatedAt:function () {
    //
    //     var list_articles_create  = new Array();
    //     var searchingDate = $('#btn-createdAt').val();
    //     var searched = DB_ARTICLES.findAll({date: searchingDate});
    //     searched.forEach(function (element) {
    //         list_articles_create.push(DB_ARTICLES.findOne({date:element.date}))
    //
    //     });
    //     return list_articles_create;
    // },
    // issearchdate: function() {
    //     return Session.get('issearchdate'); //
    // },
    // searchDate: function () {
    //     var date = FlowRouter.getParam('date'); //기사 날짜 받아오기
    //     if(!DB_ARTICLES.findAll({date:date){    //null일 경우 - 해당 날짜 기사 없음
    //         return '☆';
    //     }else{
    //         return '★';
    //     }
});


Template.articleList.events({
    'click #btn-createdAt': function(){
        var searchingDate = $('#inp-Search').val();
        // Session.set('issearchdate', true);
        // Session.get('issearchdate');




    },


=======
    // search_date:function () {
    //
    //     var list_searched  = new Array();
    //     var searchingDate = $('#inp-Search').val();//날짜 검색값
    //
    //     var article_date = DB_ARTICLES.findAll({date: searchingDate});
    //     article_date.forEach(function (element) {
    //         list_searched.push(DB_ARTICLES.findOne({_id:element._id}))
    //
    //     });
    //
    //     return list_searched;
    // },

    searchingDate: function(){
        var date = Session.get('searchingDate')
        return date;
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



// issearchdate: function() {
//     return Session.get('issearchdate'); //
// },
// searchDate: function () {
//     var date = FlowRouter.getParam('date'); //기사 날짜 받아오기
//     if(!DB_ARTICLES.findAll({date:date){    //null일 경우 - 해당 날짜 기사 없음
//         return '☆';
//     }else{
//         return '★';
//     }



Template.articleList.events({
    'click #btn-createdAt': function(){
        // var searchingDate = $('#inp-Search').val();


        var sdy = $('#sdy').val();
        var sdm = $('#sdm').val();
        var sdd = $('#sdd').val();
        var arrDate = new Array();
        arrDate = [sdy, sdm, sdd];

        Session.set('searchingDate', arrDate);

        // Session.get('issearchdate');

    }
>>>>>>> Stashed changes
});