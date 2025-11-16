# [Node 6기] item-simulator

## 개요

https://teamsparta.notion.site/Node-6-CH-3-876f5290ea714cbdadc069327c4b3e54

## API 명세서

https://www.notion.so/item-simulator-2a6a73bc0efd805ba3bee459e53faa68

## ERD

https://drawsql.app/teams/-1829/diagrams/item-simulator

## 필수 기능

- [x] 1. 회원가입 API
- [x] 2. 로그인 API
- [x] 3. 캐릭터 생성 API (JWT)
- [x] 4. 캐릭터 삭제 API (JWT)
- [x] 5. 캐릭터 상세 조회
- [x] 6. 아이템 생성 API
- [ ] 7. 아이템 수정 API
- [ ] 8. 아이템 목록 조회 API
- [ ] 9. 아이템 상세 조회 API

## 도전 기능

- [ ] 1. 아이템 구입 API (JWT)
- [ ] 2. 아이템 판매 API (JWT)
- [ ] 3. 캐릭터가 보유한 인벤토리 내 아이템 목록 조회 API (JWT)
- [ ] 4. 캐릭터가 장착한 아이템 목록 조회 API
- [ ] 5. 아이템 장착 API (JWT)
- [ ] 6. 아이템 탈착 API (JWT)
- [ ] 7. 게임 머니를 버는 API (JWT)

## 질문과 답변

i. 암호화 방식

- 비밀번호를 DB에 저장할 때 Hash를 이용했는데, Hash는 단방향 암호화와 양방향 암호화 중 어떤 암호화 방식에 해당할까요?

- 비밀번호를 그냥 저장하지 않고 Hash 한 값을 저장 했을 때의 좋은 점은 무엇인가요?

ii. 인증 방식

- JWT(Json Web Token)을 이용해 인증 기능을 했는데, 만약 Access Token이 노출되었을 경우 발생할 수 있는 문제점은 무엇일까요?

- 해당 문제점을 보완하기 위한 방법으로는 어떤 것이 있을까요?

iii. 인증과 인가

- 인증과 인가가 무엇인지 각각 설명해 주세요.

- 위 API 구현 명세에서 인증을 필요로 하는 API와 그렇지 않은 API의 차이가 뭐라고 생각하시나요?

- 아이템 생성, 수정 API는 인증을 필요로 하지 않는다고 했지만 사실은 어느 API보다도 인증이 필요한 API입니다. 왜 그럴까요?

iv. Http Status Code

- 과제를 진행하면서 사용한 Http Status Code를 모두 나열하고, 각각이 의미하는 것과 어떤 상황에 사용했는지 작성해 주세요.

v. 게임 경재

- 현재는 간편한 구현을 위해 캐릭터 테이블에 money라는 게임 머니 컬럼만 추가하였습니다.
  - 이렇게 되었을 때 어떠한 단점이 있을 수 있을까요?
  - 이렇게 하지 않고 다르게 구현할 수 있는 방법은 어떤 것이 있을까요?

- 아이템 구입 시에 가격을 클라이언트에서 입력하게 하면 어떠한 문제점이 있을 수 있을까요?
