# 백엔드 API 응답 예시

수집일: 2026-07-20

실행 중인 로컬 백엔드와 MySQL 데이터에서 수집한 대표 응답이다.

## 라운드 목록

`GET /rounds`

```json
[
  {
    "roundId": 2,
    "roundNumber": 1,
    "startDate": "2024-03-01",
    "endDate": "2024-03-03"
  }
]
```

## 라운드별 경기 목록

`GET /rounds/2/matches`

```json
[
  {
    "matchId": 1,
    "matchDate": "2024-03-01T19:00:00",
    "homeTeam": {
      "id": 7,
      "name": "울산 HD FC",
      "logoUrl": "/logos/ulsan.png"
    },
    "awayTeam": {
      "id": 9,
      "name": "포항 스틸러스",
      "logoUrl": "/logos/pohang.png"
    },
    "finalScore": {
      "home": 1,
      "away": 0
    }
  }
]
```

## 경기 상세

`GET /matches/1`

```json
{
  "matchid": 1,
  "roundNumber": 1,
  "matchDate": "2024-03-01T19:00:00",
  "homeTeam": {
    "id": 7,
    "name": "울산 HD FC",
    "logoUrl": "/logos/ulsan.png"
  },
  "awayTeam": {
    "id": 9,
    "name": "포항 스틸러스",
    "logoUrl": "/logos/pohang.png"
  },
  "finalScore": {
    "home": 1,
    "away": 0
  }
}
```

상세 응답의 ID 필드는 목록 응답의 `matchId`와 달리 `matchid`이다. 프론트 Adapter가 두 필드를 동일한 `matchId`로 변환한다.

## 득점 확률

`GET /matches/1/goal-probabilities`

```json
{
  "timeline": [
    {
      "minute": 0,
      "homeGoalProbability": 0.057051492,
      "awayGoalProbability": 0.071270644
    }
  ]
}
```

- 전체 97개
- 시간 범위: 0~98분
- 70분과 91분 데이터 없음

## 승률

`GET /matches/1/win-probabilities`

```json
{
  "timeline": [
    {
      "minute": 0,
      "home": 0.4648430617312793,
      "draw": 0.2738218898755158,
      "away": 0.2613350483932048
    }
  ]
}
```

- 전체 99개
- 시간 범위: 0~98분
- 70분과 91분 데이터 존재
- 98분 홈·무·원정 확률 합계: 약 1.0

## 오류 응답 확인

- `GET /matches/999999`: HTTP 500
- 프론트는 조회 오류 상태를 표시한다.
- 존재하지 않는 리소스는 향후 백엔드에서 HTTP 404로 개선할 필요가 있다.
