Template.articleWord.onRendered(function(){
    Session.set('searchWord', '');
    Session.set('tag_arr', []); // 저장 단어 배열
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
    wordSave1: function(){   //단어를 단어장에 추가했는지 여부
        var word = Session.get('searchWord');
        var user_id = Meteor.user()._id;   //유저 _id
        var article_id = FlowRouter.getParam('_id'); //기사 _id

        // findOne selector : 단어, 유저, 기사
        if(!DB_WORDS.findOne({word: word, article_id: article_id,user_id:user_id,form:1},)){    //null일 경우 - DB에 저장되지 않은 단어
            return '중요한 단어';
        }else{
            return '취소';
        }
    },
    wordSave2: function(){   //단어를 단어장에 추가했는지 여부
        var word = Session.get('searchWord');
        var user_id = Meteor.user()._id;   //유저 _id
        var article_id = FlowRouter.getParam('_id'); //기사 _id

        // findOne selector : 단어, 유저, 기사
        if(!DB_WORDS.findOne({word: word, article_id: article_id,user_id:user_id,form:2},)){    //null일 경우 - DB에 저장되지 않은 단어
            return '어려운 단어';
        }else{
            return '취소';
        }
    },
    wordList: function(){   //중요한 단어에 추가된 단어들
        var article_id = FlowRouter.getParam('_id');
        return DB_WORDS.findAll({article_id:article_id,user_id:Meteor.user()._id,form:1});
    },
    wordList2: function(){   //어려운 단어에 추가된 단어들
        var article_id = FlowRouter.getParam('_id');
        return DB_WORDS.findAll({article_id:article_id,user_id:Meteor.user()._id,form:2});
    },


    meaning: function () {
        return Session.get('data1');
    },

    example1: function () {
        var word = Session.get('searchWord');
        var all_example=Session.get('data2');
        var all_example_array= all_example.split('.',2);
        return all_example_array[0]+'.';
    },
    example2: function () {
        var all_example=Session.get('data2');
        var all_example_array= all_example.split('.',2);
        return all_example_array[1]+'.';
    }

});

Template.articleWord.events({

    'keyup #inp-wordSearch': function(evt){
        if(!Meteor.user()) {
            alert("로그인해주세요.");
            return;
        }

        if(evt.which === 13) {
            var searchWord = $('#inp-wordSearch').val();
            var user_id=Meteor.user()._id;
            var count2 = DB_SEARCH_COUNT.findOne({word: searchWord,  user_id:Meteor.user()._id});
            ///검색횟수 증가하는 함수
            Session.set('searchWord', searchWord);
            if (!count2) {
                // alert('처음검색한 단어');
                DB_SEARCH_COUNT.insert({
                    word: searchWord,
                    count: 1,
                    user_id: user_id
                });
            }else{
                var word_id=DB_SEARCH_COUNT.findOne({word:searchWord,user_id:user_id})._id;


                DB_SEARCH_COUNT.update({_id:word_id},{$inc:{count: 1}});
                // alert('조회수 증가시킴');
            }///여기까지 검색횟수 관련 함수


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
            Meteor.call('word_searching', exampleWord, function (error, result){
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
        }
    },



    //중요한 단어 등록 버튼에 대한 함수
    'click #btn-wordSave1': function(){  //단어장에 추가(저장)하는 버튼
        var searchWord = Session.get('searchWord');   //현재 검색된 단어 가져오기
        var user_id = Meteor.user()._id;//유저의 _id 가져오기
        var article_id = FlowRouter.getParam('_id');   //기사의 _id 가져오기

        //단어를 아직 검색하지 않았을 경우 예외처리
        if(!searchWord){  //단어를 검색하지 않았을때 즐겨찾기 버튼 안보이게하는 작업 필요.
            alert("잘못된 접근 : 단어를 먼저 검색해주세요.")
            return;
        }

        // findOne selector : 단어, 유저, 기사
        var conect_word=DB_WORDS.findOne({word:searchWord,user_id:user_id,form:1});
        // 현재 단어가 DB에 저장되있는지 확인
        // word에는 null 또는 해당 단어의 object가 들어간다 (key, value의 묶음 배열)
        function getToday(){
            var date = new Date();
            return (date.getMonth()+1).toString()+"."+date.getDate().toString();
        }

        function dec() {//같은 기사에서 중요한 단어라고 누른적이 있나 확인하는 함수
            for (i = 0; i < 100; i++) {
                if (conect_word.article_id[i] === article_id) {
                    return '다시 누르면 삭제';
                }
            }
        }

        if(!conect_word){   //null인 경우 - 단어가 저장되지 않았을경우
            DB_WORDS.insert({
                word: searchWord,
                date: getToday().toString(),
                createdAt : new Date(),
                user_id : user_id,
                article_id: [article_id],
                form:1,
                findCount:1,
            });
            alert("중요한 단어장에 저장");
        }else{  //DB에 이미 있는 경우 - 삭제

            if(dec()==='다시 누르면 삭제') {   //같은 기사에서 중요한 단어라고 클릭한 단어를 다시 눌러서 삭제할때
                var remove_id=FlowRouter.getParam('_id');//현재 기사 _id 가져오기
                var arr_length = conect_word.article_id.length;//들어가있는 article_id 배열 길이 가져오기

                var res = new Array();//새로 넣어줄 배열 만들어 주기
                for(i=0,j=0;i<arr_length;i++)
                {
                    if(conect_word.article_id[i]!==remove_id){
                        res[j]=conect_word.article_id[i];
                        j++;
                    }

                }
                DB_WORDS.update({_id: conect_word._id},{$set:{article_id:res}});
                DB_WORDS.update({_id:conect_word._id},{$inc:{findCount: -1}});

                if(conect_word.findCount===1){//예외처리
                    var wordbook_remove_id=DB_WORDS.findOne({_id:conect_word._id,findCount:0})._id;
                    DB_WORDS.remove({_id:wordbook_remove_id});
                }
                alert('취소되었습니다.')
            }
            else{

                DB_WORDS.update({_id: conect_word._id},{$push:{article_id:article_id}})
                //기존에 검색했던 (서로 다른 기사) 단어 디비 update
                DB_WORDS.update({_id:conect_word._id},{$inc:{findCount: 1}});
                // findCount 1씩 증가
                DB_WORDS.update({_id:conect_word._id},{$set:{date:getToday().toString()}});
                // 최신검색날짜 update
                alert('중요한 단어로 등록되었습니다.')

            }//remove는 selector가 무조건 _id여야 함
        }
    },
    //어려운 단어 등록 버튼에 대한 함수
    'click #btn-wordSave2': function(){  //단어장에 추가(저장)하는 버튼
        var searchWord = Session.get('searchWord');   //현재 검색된 단어 가져오기
        var user_id = Meteor.user()._id;//유저의 _id 가져오기
        var article_id = FlowRouter.getParam('_id');   //기사의 _id 가져오기

        //단어를 아직 검색하지 않았을 경우 예외처리
        if(!searchWord){  //단어를 검색하지 않았을때 즐겨찾기 버튼 안보이게하는 작업 필요.
            alert("잘못된 접근 : 단어를 먼저 검색해주세요.")
            return;
        }

        // findOne selector : 단어, 유저, 기사
        var conect_word2=DB_WORDS.findOne({word:searchWord,user_id:user_id,form:2});
        // 현재 단어가 DB에 저장되있는지 확인
        // word에는 null 또는 해당 단어의 object가 들어간다 (key, value의 묶음 배열)
        function getToday(){
            var date = new Date();
            return (date.getMonth()+1).toString()+"."+date.getDate().toString();
        }

        function dec2() {//같은 기사에서 중요한 단어라고 누른적이 있나 확인하는 함수
            for (i = 0; i < 100; i++) {
                if (conect_word2.article_id[i] === article_id) {
                    return '다시 누르면 삭제';
                }
            }
        }

        if(!conect_word2){   //null인 경우 - 단어가 저장되지 않았을경우
            DB_WORDS.insert({
                word: searchWord,
                date: getToday().toString(),
                createdAt : new Date(),
                user_id : user_id,
                article_id: [article_id],
                form:2,
                findCount:1,
            });
            alert("어려운 단어장에 저장");
        }else{  //DB에 이미 있는 경우 - 삭제

            if(dec2()==='다시 누르면 삭제') {   //같은 기사에서 중요한 단어라고 클릭한 단어를 다시 눌러서 삭제할때
                var remove_id=FlowRouter.getParam('_id');//현재 기사 _id 가져오기
                var arr_length2 = conect_word2.article_id.length;//들어가있는 article_id 배열 길이 가져오기

                var res = new Array();//새로 넣어줄 배열 만들어 주기
                for(i=0,j=0;i<arr_length2;i++)
                {
                    if(conect_word2.article_id[i]!==remove_id){
                        res[j]=conect_word2.article_id[i];
                        j++;
                    }

                }
                DB_WORDS.update({_id: conect_word2._id},{$set:{article_id:res}});
                DB_WORDS.update({_id:conect_word2._id},{$inc:{findCount: -1}});

                if(conect_word2.findCount===1){//예외처리
                    var wordbook_remove_id2=DB_WORDS.findOne({_id:conect_word2._id,findCount:0})._id;
                    DB_WORDS.remove({_id:wordbook_remove_id2});
                }
                alert('취소되었습니다.')
            }
            else{

                DB_WORDS.update({_id: conect_word2._id},{$push:{article_id:article_id}});
                //기존에 검색했던 (서로 다른 기사) 단어 디비 update
                DB_WORDS.update({_id:conect_word2._id},{$inc:{findCount: 1}});
                // findCount 1씩 증가
                DB_WORDS.update({_id:conect_word2._id},{$set:{date:getToday().toString()}});
                // 최신검색날짜 update
                alert('어려운 단어로 등록되었습니다.')

            }//remove는 selector가 무조건 _id여야 함
        }
    },

    //단어목록에 삭제버튼에 대한 함수
    'click #word_delete': function(evt) {
        // var tag_update = Session.get('tag_arr');
        // tag_update.splice(tag_update.indexOf($(evt.target).attr('value')), 1);
        // Session.set('tag_arr', tag_update);
        DB_WORDS.remove({_id: this._id});
        alert('삭제 되었습니다.');
    }

});