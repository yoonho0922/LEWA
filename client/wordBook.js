FlowRouter.template('/wordBook', 'wordBook');

Template.wordBook.helpers({
    words1: function () {
        return DB_WORDS.findAll({user_id: Meteor.user()._id,form:1},{sort:{findCount:-1}});
    },
    words2: function () {
        return DB_WORDS.findAll({user_id: Meteor.user()._id,form:2},{sort:{findCount:-1}});
    },
    article_id1:function(){
        var a = DB_WORDS.findOne({user_id:Meteor.user()._id,word:this.word,form:1});
        return a.article_id[a.article_id.length-1];
    },
    article_id2:function(){
        var a = DB_WORDS.findOne({user_id:Meteor.user()._id,word:this.word,form:2});
        return a.article_id[a.article_id.length-1];
    },
    titles1:function (titleid) {
        var a = DB_WORDS.findOne({user_id:Meteor.user()._id,word:this.word,form:1});
        var s =  DB_ALL_ARTICLES.findOne({_id:a.article_id[a.article_id.length-1]}).title;

        if(s.length > 31){
            return s.substr(0,30) + "...";
        }
        return s;
    },
    titles2:function (titleid) {
        var a = DB_WORDS.findOne({user_id:Meteor.user()._id,word:this.word,form:2});
        var s =  DB_ALL_ARTICLES.findOne({_id:a.article_id[a.article_id.length-1]}).title;

        if(s.length > 31){
            return s.substr(0,30) + "...";
        }
        return s;
    },

});

Template.wordBook.events({
    'click #eachWord1': function(evt){
        var searchWord = $(evt.target).attr('value');
        console.log(searchWord)
        // callback 함수를 이용해서 Meteor.call() 호출
        Meteor.call('word_searching', searchWord, function (error, result){
            if (error) {
                alert('Error');
            } else {
                result=result[0];
                result = result.replace(/<b>/g, '');
                result = result.replace(/<\/b>/g, '');
                Session.set('data1', result);
                console.log(result);
                swal(result);
            }
        })
    },
    'click #eachWord2': function(evt){
        var searchWord = $(evt.target).attr('value');
        console.log(searchWord)
        // callback 함수를 이용해서 Meteor.call() 호출
        Meteor.call('word_searching', searchWord, function (error, result){
            if (error) {
                alert('Error');
            } else {
                result=result[0];
                result = result.replace(/<b>/g, '');
                result = result.replace(/<\/b>/g, '');
                Session.set('data1', result);
                console.log(result);
                swal(result);
            }
        })
    },
    'click #remove_word1':function () {
        var word_id = DB_WORDS.findOne({word:this.word,form:1})._id;
        DB_WORDS.remove({_id:word_id});
        //단어장에서 디비에 있는 단어 삭제

    },
    'click #remove_word2':function () {
        var word_id = DB_WORDS.findOne({word:this.word,form:2})._id;
        DB_WORDS.remove({_id:word_id});
        //단어장에서 디비에 있는 단어 삭제

    }


})