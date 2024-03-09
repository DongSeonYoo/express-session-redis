## 현재 로그인 한 유저의 목록을 보여주는 기능

### 사용 기술

#### 템플릿
[express-prisma-template](https://github.com/DongSeonYoo/express-prisma-template).


#### 데이터베이스
세션 저장을 위한 Key-value 데이터베이스
- ioredis^5.3.2
- connect-redis^7.1.1
- express-session

node환경에서 di를 위한 typedi 사용
- typedi^0.10.0

session을 자동으로 생성해주고 관리해주는 express-session 사용
- express-session:^1.18.0


## API
현재 로그인 한 유저들의 리스트를 보여줍니다 <br>

### ENDPOINT <br>

POST /auth/login
  - 생략
  
POST /auth/logout
  - 생략

GET /account/logged-in/list (로그인 필요)

### request

```Typescript
{
  "headers": {
    "Content-Type": "application/json"
  },
  "path": {},
  "query": {},
  "body": {}
}
```

### response

```Typescript
{
  statusCode: 200,
  message: "",
  data: {
    account: [
      {
        id: number, // 유저의 인덱스
        name: string, // 유저의 이름
        email: string, // 유저의 이메일
        loggedInAt: Date, // 로그인 한 시간
        createdAt: Date // 사용자 생성 일
      },
    ]
    ...
  }
}
```
