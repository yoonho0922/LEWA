FlowRouter.template('/posting/', 'posting');

Template.posting.onRendered(function() {
    $('#editor').summernote({
        // popover: {},
        minHeight: 200,
        maximumImageFileSize: 1048576*10,
        callbacks: {
            onImageUpload : function(files) {
                if (!files.length) return;
                var file = files[0];
                // create FileReader
                var reader  = new FileReader();
                reader.onloadend = function () {
                    // when loaded file, img's src set datauri
                    // console.log("img",$("<img>"));
                    var img = $("<img>").attr({src: reader.result, width: "100%"}); // << Add here img attributes !
                    // console.log("var img", img);
                    $('#editor').summernote("insertNode", img[0]);
                }

                if (file) {
                    // convert fileObject to datauri
                    reader.readAsDataURL(file);
                }
            }
        }

    });
});

Template.posting.helpers({

});

Template.posting.events({
    'click #btn-save' : function(){

        //화면에 입력된 값을 변수에 저장
        var title = $('#inp-title').val();
        var image = null;
        var html = $('#editor').summernote('code'); //editor에 저장된 content를 저장함

        var file = $('#inp-file').prop('files')[0];   // 화면에서 선택 된 이미지 파일 가져오기

        if(!title || !file) {    //제목과 이미지를 반드시 입력해야함
            return alert('작성하지 않은 부분이 있습니다.');
        }

        var image = DB_FILES.insertFile(file);    //이미지 파일 DB에 저장하고 _id 가져오기
        //DB에 insert하면 _id를 return한다

        function getToday(){
            var date = new Date();
            var arrDate = new Array();
            arrDate = [date.getFullYear().toString(), (date.getMonth()+1).toString(), date.getDate().toString()];
            return arrDate;
            //return ["2020", "5", "26"]
        }

        //나머지 DB에 저장

        DB_ALL_ARTICLES.insert({
            title: title,
            image: image,   //DB_FILES에 있는 이미지의 _id 저장
            content: html,
            date: getToday(),
            createdAt: new Date(),
            viewCount: 0,

        });//이건 전체 DB에 넣는거

        alert('저장하였습니다.');
        //화면에 입력된 값 초기화
        $('#inp-title').val('');
        $('#inp-file').val('');
        $('#editor').summernote('reset');
        FlowRouter.go('/');
    }

})