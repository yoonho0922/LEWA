Template.articleWord.onRendered(function() {
    Session.set('searchWord', "");
});

Template.articleWord.helpers({
    //단어장 관련
    searchWord: function(){ //검색한 단어 반환
        var searchWord = Session.get('searchWord');
        if (!searchWord) {
            return '';
        } else {
            return searchWord;
        }
    },
    wordSave: function(){   //단어를 단어장에 추가했는지 여부
        var word = Session.get('searchWord');
        if(!DB_WORDS.findOne({word: word})){
            return '☆';
        }else{
            return '★';
        }
    },
    wordList: function(){   //이 기사에 추가된 단어 목록
        var article_id = FlowRouter.getParam('_id');
        return DB_WORDS.findAll({article_id:article_id});
    }

});

Template.articleWord.events({
    'click #btn-wordSearch': function(){    //단어 검색했을때 단어 띄우는 함수 (임시 사전)
        var word = $('#inp-wordSearch').val();
        Session.set('searchWord', word);
    },
    'click #btn-wordSave': function(){  //단어장에 추가(저장)하는 버튼
        var word = Session.get('searchWord');   //현재 검색된 단어 가져오기
        var user_id = "";   //유저의 _id 가져오기
        var article_id = FlowRouter.getParam('_id');   //기사의 _id 가져오기

        if(!word){
            return;
        }


        DB_WORDS.insert({
            word: word,
            createdAt : new Date(),
            // user_id : user_id,
            article_id: article_id,
        });
        alert("저장");
    }
});