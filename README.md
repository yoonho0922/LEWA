## Study Sangsaeng Plus 2020-1

2020년 1학기 상명대학교 스터디 상생플러스의 개발 프로젝트 repository입니다.   
Javascript 기반 웹 개발 플랫폼 Meteor를 이용하여 영어기사를 보며 공부할 수 있는 사이트 개발

[미티어 공식사이트](https://www.meteor.com/)

## 페이지
* 메인 - main.html / main.js
*  기사 목록 - articles.html / articles.js
    * 기사 하나 보기 - article.html / article.js
* 스크랩한 기사 - clipping.html / clipping.js
* 내가 푼 퀴즈 - myQuiz.html / myQuiz.js
* 나의 단어장 - wordBook.html / wordBook.js   

* 내정보 - myPage.html / myPage.js
* 로그인 기능 - login.js   
#### 공통
* navbar.html / navbar.js   

## DB
* users
    * _id : UID(UniquedID)
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
    * _id
    * title : 제목
    * image : 사진 링크(URL)
    * content : 내용
    * createdAt : 추가된 시간
    * viewCount : 조회수
    
* DB_CLIPPING
    * _id
    * user_id : 스크랩 한 유저 UID
    * article_id : 스크랩 된 기사 UID

* DB_WORDS
    * _id
    * word : 단어
    * createdAt : 추가된 시간
    * user_id : 추가한 사용자 UID
    * article_id: 추가된 기사 UID
    
* DB_FILES
    * 이미지 파일이 저장되는 DB
    

