# 프론트엔드 리팩토링 기준선

기록일: 2026-07-20

## 작업 기준

- 기준 커밋: `9f04879 feat: complete kleague project front`
- 작업 브랜치: `refactor/portfolio`
- 백엔드 API 연결과 기존 사용자 기능을 유지한다.

## 기존 사용자 흐름

1. `/`에 진입하면 `/rounds`로 이동한다.
2. 라운드 목록을 조회하고 첫 번째 라운드를 선택한다.
3. 이전·다음 버튼 또는 선택 상자로 라운드를 변경한다.
4. 경기 행을 선택하면 `/matches/:matchId`로 이동한다.
5. 상세 화면에서 승률, 득점 확률, 팀 통계를 확인한다.
6. 재생·정지·초기화 또는 슬라이더로 경기 시간을 변경한다.

## 기준 검사 결과

### 변경 전

- `npm run build`: 성공
- `npm run lint`: 실패
  - `src/components/rounds/RoundSection.jsx`의 미사용 `round` prop 1건

### 전역 스타일 기반 적용 후

- `npm run build`: 성공
- `npm run lint`: 성공

## 프론트엔드가 사용하는 API

- `GET /rounds`
- `GET /rounds/:roundId/matches`
- `GET /matches/:matchId/team-summary`
- `GET /matches/:matchId/goal-probabilities`
- `GET /matches/:matchId/win-probabilities`

## 후속 확인 항목

- 기록 시점에 `localhost:8080` 백엔드가 실행 중이지 않아 실제 API 응답 예시는 수집하지 못했다.
- 실제 응답 예시는 백엔드 실행 후 원문 그대로 추가한다.
- 브라우저 자동화 연결 오류로 변경 전 화면 캡처는 수집하지 못했다.
- 다음 화면 작업 전 라운드 목록과 경기 상세를 데스크톱·모바일 크기로 확인한다.

## 라운드별 경기 목록 리디자인

### 사용자 관점 변화

- 시즌, 페이지 목적, 현재 라운드를 한 화면에서 확인할 수 있다.
- 이전·다음 버튼과 라운드 선택 상자가 하나의 컨트롤로 통합되었다.
- 경기 목록이 날짜별로 구분되고 각 경기가 하나의 카드로 표시된다.
- 카드 전체를 마우스 또는 키보드로 선택해 상세 화면으로 이동할 수 있다.
- 로딩, 조회 오류, 경기 없음 상태가 서로 다른 화면으로 표시된다.
- 작은 화면에서는 팀 로고·팀명·스코어가 3열 카드로 배치된다.

### 검증 결과

- `npm run lint`: 성공
- `npm run build`: 성공
- 라운드 화면 인라인 스타일 검사: 없음
- Git diff 공백 오류 검사: 성공
