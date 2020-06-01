FlowRouter.template('/postingAuto', 'postingAuto');

Template.postingAuto.onRendered(function () {
    // 화면이 그려지고 난 후 제일 먼저 수행
    Session.set('count', 0);
    Session.set('enter_content', []);
    Session.set('enter_title', [])
    Session.set('enter_img','');
    Session.set('srcUrl','');

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
        Session.set('srcUrl', article_link);
        //기사 제목
        Meteor.call('scraping_title', article_link, function (error, result) {
            if (error) {
                alert('Error');
            } else {
                Session.set('enter_title', result);
            }
        });

        //기사 내용
        Meteor.call('scraping_content', article_link, function (error, result) {
            if (error) {
                alert('Error');
            } else {
                Session.set('enter_content', result);
                swal('complete scraping!', Session.get('enter_title'));
            }
        });

        //이미지
        Meteor.call('scraping_img', article_link, function (error, result) {
            if (error) {
                alert('Error');
            } else {
                Session.set('enter_img', result);
                swal('complete img!', Session.get('enter_img'));
            }
        })
    },

    //업로드
    'click #btn-upload': function () {

        var title = Session.get('enter_title');
        var content = Session.get('enter_content');
        var image = Session.get('enter_img');
        var srcUrl = Session.get('srcUrl');

        if(!title){
            swal('First step is scraping');
            return;
        }

        //내용 없는 기사 예외처리
        if(!content || content == 'null' ||content=='<br />'){
            swal('There is no content!');
            return;
        }

        //사진 못 가져올경우
        if(image==''){
            swal('There is no Image!');
            return;
        }

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
            srcUrl: srcUrl
        });

        swal("complete upload!", title, "success");
        //화면에 입력된 값 초기화
        $('#inp-link').val('');
        $('#inp-file').val('');

    }
});