---
name: write-project-content
description: 프로젝트 본문(src/content/projects/{project}/index.md) 또는 트러블슈팅 사례(src/content/projects/{project}/troubleshooting/{case}/index.md)를 새로 작성하거나 수정할 때 사용. frontmatter 필드, 본문 헤딩 구조, 구현 디테일 노출 수준 규칙을 담고 있다.
---

## 프로젝트 본문

`src/content/projects/{project}/index.md`를 작성하면 자동으로 홈 화면/사이드바에 노출된다.

- frontmatter: `title`, `period`, `summary`, `techStack`, `order`, 선택적 `githubUrl` / `demoUrl`
- 본문: `## 서비스 설명` → `## 서비스 구조` 2단계 고정 구조로 작성한다. 이 본문은 프로젝트 랜딩 페이지(`/projects/{project}/`)가 아니라 별도 URL을 가진 "서비스 개요" 페이지(`/projects/{project}/overview/`, `src/pages/projects/[project]/overview.astro`)에서 렌더링된다(2026-08-12 확정). 랜딩 페이지는 이 본문을 렌더링하지 않고, 헤더 + summary + "서비스 개요"/"문제 해결" 링크 목록만 보여준다. Sidebar에서 프로젝트를 펼치면 "서비스 개요" 링크 1개가 노출되며 클릭 시 개요 페이지로 이동한다(과거처럼 두 헤딩을 앵커 2개로 노출하지 않음).
- 이미지는 같은 폴더에 넣고 `![설명](./파일명.png)`로 참조하면 클릭 시 확대되는 라이트박스가 자동 적용되고, ` ```mermaid ` 코드 블록은 자동으로 다이어그램 렌더링된다

## 트러블슈팅 사례

`src/content/projects/{project}/troubleshooting/{case}/index.md`를 추가하면 해당 프로젝트의 사이드바 목차와 프로젝트 랜딩 페이지(`/projects/{project}/`)에 "문제 해결" 그룹(구분선)이 자동으로 나타나고, 그 아래에 사례 링크가 추가된다. 사례가 하나도 없으면 "문제 해결" 그룹 자체가 (사이드바와 랜딩 페이지 양쪽 모두에서) 숨겨진다.

- frontmatter: `title`, `order`(같은 프로젝트 안에서의 정렬 순서, 작을수록 위)
- 본문: `## 문제 정의` → `## 해결 방안 비교 및 선택 이유` → `## 문제 해결 과정` → `## 결과` 4단계 구조를 따른다. 이 헤딩들은 사이드바 목차에는 반영되지 않고, 사례 자체의 상세 페이지(`/projects/{project}/troubleshooting/{case}/`) 본문 구조로만 쓰인다.
- 각 사례는 프로젝트 본문과 별도의 URL을 가진 독립 페이지다(같은 페이지 내 앵커가 아님).
- 구현 디테일 노출 수준은 아래 세 기준을 따른다(모든 프로젝트에 동일하게 적용, 2026-08-12 확정).
  - **항상 일반화**: 이 코드베이스에만 존재하는 고유 식별자 — 클래스명·메서드명·필드명·에러코드·DB 테이블명·API 경로·조건식·락 키 포맷 문자열·애노테이션 파라미터 등. 코드 문법 형태 자체를 남기지 않고 자연어 서술로 완전히 풀어 쓴다. (예: `OrderSnapshot` → "주문 정보 로컬 캐시", `tryLock(waitTime=3초, leaseTime=10초)` → "3초 이내에 락을 획득하지 못하면 즉시 실패시키고, 획득한 락은 최대 10초 뒤 자동 해제되도록")
  - **실명 유지**: 실제 기술/라이브러리/벤더 이름(Redis, Redisson, Lettuce, Kafka, Toss, resilience4j, 카카오 등)은 일반명사로 대체하지 않고 그대로 쓴다.
  - **정량적 근거 유지**: 성능 수치·동시성 규모·타임아웃/TTL 값처럼 실측·설계 근거가 되는 숫자는 지우지 않되, 코드 문법이 아니라 자연어 문장으로 표현한다. (예: `waitTime=3초` → "3초 이내에 락을 획득하지 못하면")
