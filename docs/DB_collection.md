## DB Collection
 모든 Collection엔 _id(UID : uniqued ID)가 있음
* users
    * createdAt
    * services
        * password
    * emails
        * address
        * verified 
        

* DB_ARTICLES
    * title : 제목
    * image : 사진 uid (DB_IMAGES에 있는 파일의 _id)
    * content : 내용
    * createdAt : 추가된 시간
    * viewCount : 조회수
    
        
* DB_FILES
    * 이미지 파일이 저장되는 DB
    
* DB_CLiPS
    * user_id : 스크랩 한 유저 UID
    * article_id : 스크랩 된 기사 UID

* DB_WORDS
    * word : 단어
    * createdAt : 추가된 시간
    * user_id : 추가한 사용자 UID
    * article_id: 추가된 기사 UID
    * searchCount: 단어 검색 횟수


