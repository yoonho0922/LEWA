2020년 1학기 상명대학교 스터디 상생플러스의 개발 프로젝트 repository입니다.   
Javascript 기반 application 개발 플랫폼 Meteor를 활용하여 영어기사를 보며 공부할 수 있는 사이트 개발

[미티어 공식사이트](https://www.meteor.com/)
[튜토리얼](https://www.tutorialspoint.com/meteor/index.htm)


## Client
##### 메인 - main
##### 기사 목록 - articleList
##### 스크랩한 기사 - clipping
##### 내가 푼 퀴즈 - myQuiz
##### 나의 단어장 - wordBook
##### 상단바 - navbar

### details
* 기사 하나 보기 - article
    * 기사별 단어 검색 - articleWord

* 내정보 - myPage
* 로그인 페이지 - loing

## DB Collection
##### 모든 Collection엔 _id(UID : uniqued ID)가 있음
* users
    * createdAt
    * services
        * password
    * username
    * emails
        * address
        * verified
    * profile
        * type
        * name
        

* DB_ARTICLES
    * title : 제목
    * image : 사진 uid (DB_IMAGES에 있는 파일의 _id)
    * content : 내용
    * createdAt : 추가된 시간
    * viewCount : 조회수
    
        
* DB_FILES
    * 이미지 파일이 저장되는 DB
    
* DB_CLIPPING
    * user_id : 스크랩 한 유저 UID
    * article_id : 스크랩 된 기사 UID

* DB_WORDS
    * word : 단어
    * createdAt : 추가된 시간
    * user_id : 추가한 사용자 UID
    * article_id: 추가된 기사 UID


