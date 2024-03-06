## 현재 로그인 한 유저의 목록을 보여주는 기능

현재 로그인 한 유저들의 리스트를 보여줍니다
endpoint

- POST /auth/login
  - 생략
- POST /auth/logout
  - 생략
- GET /account/logged-in/list (로그인 필요)

### request

```Typescript
{
	"headers": {
		"Content-Type": "application/json"
	},
	"path": {}
	"query": {}
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
				loggedInAt: string, // 로그인 한 시간 (YYYY-MM-DD-SS-MM)
			}
		]
	}
}
```
