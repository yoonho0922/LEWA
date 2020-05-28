Template.articleWord.onRendered(function() {
    Session.set('searchWord', "");
});

Template.articleWord.helpers({
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
        var user_id = Meteor.user()._id;   //유저 _id
        var article_id = FlowRouter.getParam('_id'); //기사 _id

        // findOne selector : 단어, 유저, 기사
        if(!DB_WORDS.findOne({word: word, article_id: article_id,user_id:user_id},)){    //null일 경우 - DB에 저장되지 않은 단어
            return '☆';
        }else{
            return '★';
        }
    },
    wordList: function(){   //이 기사에 추가된 단어 목록
        var article_id = FlowRouter.getParam('_id');
        return DB_WORDS.findAll({article_id:article_id,user_id:Meteor.user()._id});
<<<<<<< Updated upstream
=======
    },

    meaning: function () {
        return Session.get('data1');
>>>>>>> Stashed changes
    },





});

Template.articleWord.events({

<<<<<<< Updated upstream
    //단어 검색했을때 단어 띄우는 함수 (임시 사전)
    'click #btn-wordSearch': function(){
        var searchWord = $('#inp-wordSearch').val();
        var user_id=Meteor.user()._id;
        Session.set('searchWord', searchWord);
        var count2 = DB_SEARCH_COUNT.findOne({word: searchWord,  user_id:Meteor.user()._id});
        // var word_id=FlowRouter.getParam('_id');
        var count=FlowRouter.getParam('count');

        if (!count2) {
            alert("d");
            DB_SEARCH_COUNT.insert({
                word: searchWord,
                count: 0,
                user_id: user_id
            });
        }else{
            alert("ddd");


            // alert(word_id);
            DB_SEARCH_COUNT.update({word:searchWord,user_id:user_id},{$inc:{count: 1}});
            alert("dddddd")

            // // count2.count+=1;
            // count.count += 1;
            // // addcount+=1;
            // alert("aaa");
            // // alert(addcount);
            // DB_SEARCH_COUNT.update({word: searchWord, user_id: user_id}, addcount)
            //
            // // DB_SEARCH_COUNT.update({count:addcount-1}, addcount);
            // alert("aasa");
=======
    'keyup #inp-wordSearch': function(evt){
        if(!Meteor.user()) {
            alert("로그인해주세요.");
            return;
        }

        if(evt.which === 13) {
            var searchWord = $('#inp-wordSearch').val();
            Session.set('searchWord', searchWord);
            // callback 함수를 이용해서 Meteor.call() 호출
            Meteor.call('word_searching', searchWord, function (error, result){
                if (error) {
                    alert('Error');
                } else {
                    result=result[0];
                    result = result.replace(/<b>/g, '');
                    result = result.replace(/<\/b>/g, '');
                    Session.set('data1', result);
                    // console.log(Session.get('data'));
                }
            })
            var exampleWord = $('#inp-wordSearch').val();
            Session.set('exampleWord', exampleWord);
            // callback 함수를 이용해서 Meteor.call() 호출
            Meteor.call('word_searching', exampleWord, function (error, result) {
                if (error) {
                    alert('Error');
                } else {
                    result = result[1];
                    if (result.indexOf('<b>')!=-1) {
                        result = result.replace(/<b>/g, '');
                        result = result.replace(/<\/b>/g, '');
                        result = result.replace(/<br>/g, '');
                        result = result.replace(/<br \/>/g, '');
                    }
                    else{
                        result="예문이 존재하지 않습니다."
                    }
                    Session.set('data2', result);
                }
            })
>>>>>>> Stashed changes
        }

<<<<<<< Updated upstream


        // Session.set('searchWord', searchWord);

        // if(searchWord===DB_WORDS.findOne({word: searchWord,  user_id:Meteor.user()._id}))
        // {
        //     DB_WORDS.update({_id: _id,word:searchWord}, {
        //         $inc: {searchCount: 1}  //조회수 1 증가 업데이트
        //     });
=======
    //단어 검색했을때 단어 띄우는 함수 (임시 사전)
    'click #btn-wordSearch': function(){
        var searchWord = $('#inp-wordSearch').val();
        var user_id=Meteor.user()._id;
        Session.set('searchWord', searchWord);
        var count2 = DB_SEARCH_COUNT.findOne({word: searchWord,  user_id:Meteor.user()._id});

        if (!count2) {
            alert('처음검색한 단어');
            DB_SEARCH_COUNT.insert({
                word: searchWord,
                count: 0,
                user_id: user_id
            });
        }else{
            var word_id=DB_SEARCH_COUNT.findOne({word:searchWord,user_id:user_id})._id;

            alert('이미 검색한 단어');

            DB_SEARCH_COUNT.update({_id:word_id},{$inc:{count: 1}});
            alert('조회수 증가시킴');


        }
>>>>>>> Stashed changes
    },

    //즐겨찾기 버튼에 대한 함수
    'click #btn-wordSave': function(){  //단어장에 추가(저장)하는 버튼
        var searchWord = Session.get('searchWord');   //현재 검색된 단어 가져오기
        var user_id = Meteor.user()._id;//유저의 _id 가져오기
        var article_id = FlowRouter.getParam('_id');   //기사의 _id 가져오기

        //단어를 아직 검색하지 않았을 경우 예외처리
        if(!searchWord){  //단어를 검색하지 않았을때 즐겨찾기 버튼 안보이게하는 작업 필요.
            alert("X")
            return;
        }


        // findOne selector : 단어, 유저, 기사
        var word = DB_WORDS.findOne({word: searchWord, article_id: article_id, user_id:Meteor.user()._id});
        // 현재 단어가 DB에 저장되있는지 확인
        // word에는 null 또는 해당 단어의 object가 들어간다 (key, value의 묶음 배열)

        function getToday(){
            var date = new Date();
            return (date.getMonth()+1).toString()+"."+date.getDate().toString();
        }

        if(!word){   //null인 경우 - 단어가 저장되지 않았을경우
            DB_WORDS.insert({
                word: searchWord,
                date: getToday().toString(),
                createdAt : new Date(),
                user_id : user_id,
                article_id: article_id,
                // searchCount: 0

            });
            alert("저장");
        }else{  //DB에 이미 있는 경우 - 삭제
            DB_WORDS.remove({_id: word._id}); //remove는 selector가 무조건 _id여야 함
            alert("삭제");
        }


    },

    //단어목록에 삭제버튼에 대한 함수
<<<<<<< Updated upstream
    'click #word_delete': function(){



=======
    'click #word_delete': function(evt) {
        // var tag_update = Session.get('tag_arr');
        // tag_update.splice(tag_update.indexOf($(evt.target).attr('value')), 1);
        // Session.set('tag_arr', tag_update);
        DB_WORDS.remove({_id: this._id});
        alert('삭제 되었습니다.');
>>>>>>> Stashed changes
    }

});
