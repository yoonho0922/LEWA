FlowRouter.template('/articleList', 'articleList');

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
                return DB_ARTICLES.findAll({}, {sort: {viewCount: -1}});
        });
        //기사들을 조회수의 내림차순으로 return
    },

    article: function() { //기사 하나끌고올라고 꼼지락거린 함수
        return DB_ARTICLES.findOne({_id: this.createdAt}).link();
    },

    math: function(lvalue, operator, rvalue) { //index 1부터 시작하게 도와주는 함수
        lvalue = parseInt(lvalue);
        rvalue = parseInt(rvalue);

        return { "+": lvalue + rvalue, "/": lvalue / rvalue }[operator];
    }

});

Template.articleList.events({

});