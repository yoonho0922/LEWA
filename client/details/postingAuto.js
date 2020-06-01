FlowRouter.template('/postingAuto', 'postingAuto');

Template.postingAuto.onRendered(function () {
    // 화면이 그려지고 난 후 제일 먼저 수행
    Session.set('count', 0);
    Session.set('enter_content', []);
    Session.set('enter_title', [])

});

Template.postingAuto.helpers({

    link: function () {
        var arr = Session.get('enter_content');
        // console.log("arr: " + arr);
        for (var i = 0; i < arr.length; i++) {
            document.write(arr[i] + "<br>");
        }
        // return arr;
    }
});

Template.postingAuto.events({
    //스크래핑
    'click #btn-scraping': function (event) {
        var article_link = $('#inp-link').val(); // input 창에 입력된 단어 가져오기

        //기사 제목
        Meteor.call('scraping_title', article_link, function (error, result) {
            if (error) {
                alert('Error');
            } else {
                Session.set('enter_title', result);
            }
        })

        //기사 내용
        Meteor.call('scraping_content', article_link, function (error, result) {
            if (error) {
                alert('Error');
            } else {
                Session.set('enter_content', result);
                swal('complete scraping!', Session.get('enter_title'));
            }
        })
    },

    //업로드
    'click #btn-upload': function () {

        var title = Session.get('enter_title');
        var content = Session.get('enter_content');

        if(!title){
            swal('First step is scraping');
            return;
        }

        //내용 없는 기사 예외처리
        if(!content || content == 'null' ||content=='<br />'){
            swal('There is no content!');
            return;
        }

        var file = $('#inp-file').prop('files')[0];   // 화면에서 선택 된 이미지 파일 가져오기

        if(!file) {    //제목과 이미지를 반드시 입력해야함
            swal('plz upload file');
            return;
        }

        var image = DB_FILES.insertFile(file);    //이미지 파일 DB에 저장하고 _id 가져오기
        //DB에 insert하면 _id를 return한다

        function getToday(){
            var date = new Date();
            // return (date.getMonth()+1).toString()+"-"+date.getDate().toString();
            var arrDate = new Array();
            arrDate = [date.getFullYear().toString(), (date.getMonth()+1).toString(), date.getDate().toString()];
            return arrDate;
            //return ["2020", "5", "26"]
        }

        //나머지 DB에 저장

        DB_ALL_ARTICLES.insert({
            title: title,
            image: image,   //DB_FILES에 있는 이미지의 _id 저장
            content: content,
            date: getToday(),
            createdAt: new Date(),
            viewCount: 0,

        });

        swal("complete upload!", title, "success");
        //화면에 입력된 값 초기화
        $('#inp-link').val('');
        $('#inp-file').val('');

    }
});