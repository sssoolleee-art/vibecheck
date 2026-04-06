# 바이브체크 (vibecheck)

앱인토스 미니앱. 전체 계획서: ~/appintoss/docs/appintoss_plan.md §5-③

## 앱 정보
- appName: `vibecheck`
- displayName: `바이브체크` (granite.config.ts = 콘솔 = index.html title 동일 필수)
- primaryColor: `#7C3AED`
- port: 5173 (기본값)

## 핵심 기능
- 설문/심리테스트 형식의 바이브 진단
- 결과 유형별 상세 설명
- 결과 공유
- 리워드 광고: 상세 결과 잠금 해제

## 주의사항
- 자체 뒤로가기 버튼 구현 금지
- TDS 컴포넌트만 사용 (`@toss/tds-mobile`)
- 광고는 테스트 ID 사용 중인지 확인 후 운영 ID로 교체
