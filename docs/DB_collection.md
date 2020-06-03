## DB Collection
 모든 Collection엔 _id(UID : uniqued ID)가 있음
* users
    * createdAt
    * services
        * password
    * emails
        * address
        * verified 
    
* DB_CLiPS
    * user_id : 스크랩 한 유저 UID
    * article_id : 스크랩 된 기사 UID

* DB_WORDS
    * word : 사전을 통해 찾은 단어
    * date : 단어 출력형태로 정리한 값
    * createdAt : 추가된 시간
    * user_id : 추가한 사용자 UID
    * article_id: 추가된 기사 UID
    * form : 중요한 단어(1), 어려운 단어(2)로 형식 지정
    * findCount : 그 단어를 저장한 article의 수
    
    * DB_WORDS.findAll(): user_id와 article_id를 토대로 저장된 word를 index로 접근해 꺼내고 wordArr 생성
    * wordArr배열에는 중요한 단어와 어려운 단어가 저장순서대로 배열되어 있음
    * 중요한 단어와 어려운 단어를 중복되지 않게 새로운 배열로 알고리즘을 만들어 퀴즈를 생성
    
 * DB_SEARCH_COUNT
    * word : 검색한 단어
    * count : 검색 횟수
    * user_id : 검색한 유저
   
    
 * DB_ALL_ARTICLES
    * title : 기사 제목
    * image : 사진 link
    * content : 내용
    * date : 날짜 정리된 값
    * createdAt : 추가된 시간
    * viewCount : 조회수


    
 


