# Jinpyo-An.github.io

Astro + Tailwind CSS로 만든 개인 이력서/포트폴리오 사이트. GitHub Actions로 GitHub Pages에 자동 배포된다.

## 로컬 개발

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # ./dist 에 정적 빌드
npm run preview   # 빌드 결과 로컬 미리보기
```

`main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 자동으로 빌드 후 GitHub Pages에 배포한다.

## 콘텐츠 채우는 방법

지금은 전체 구조만 잡혀 있고 실제 내용은 `[이렇게 괄호로 감싼]` placeholder로 채워져 있다. 아래 파일들을 실제 내용으로 바꾸면 된다.

| 채울 내용 | 파일 |
| --- | --- |
| 이름, 한 줄 소개, GitHub/이메일, 자기소개, 학력, 자격증 | `src/data/profile.ts` |
| 프로젝트 목록 및 각 프로젝트 상세 내용 | `src/content/projects/*/index.md` |
| 파비콘 | `public/favicon.svg` |

### 프로젝트 추가/수정

`src/content/projects/` 아래에 폴더를 하나 만들고 `index.md`를 작성하면 자동으로 홈 화면 목록과 사이드바에 노출된다.

- frontmatter: `title`, `period`, `summary`, `techStack`, `order`(정렬 순서), 선택적으로 `githubUrl` / `demoUrl`
- 본문: `문제 정의 → 해결 방안 비교 및 선택 이유 → 문제 해결 과정 → 결과` 4단계 구조(`##` 헤딩)를 따른다
- 이미지는 같은 폴더에 넣고 `![설명](./파일명.png)`로 참조하면 클릭 시 확대되는 라이트박스가 자동 적용된다
- Mermaid 다이어그램은 `` ```mermaid `` 코드 블록으로 작성하면 자동으로 렌더링된다 (둘 다 선택 사항)

## 디자인 시스템

`src/styles/global.css`의 CSS 변수(`--color-*`)로 라이트/다크 팔레트를 관리한다. 다크모드는 사이드바의 토글 버튼으로 전환하고 `localStorage`에 저장된다. 인쇄(⌘/Ctrl+P) 시에는 사이드바가 숨겨지고 라이트 모드로 강제 전환되어 이력서를 PDF로 저장하기 좋게 최적화되어 있다.

> **참고**: 색상 hex값, spacing(레이아웃 그리드/타이포그래피 크기), 인쇄 스타일은 참고 사이트(`Hyune-c.github.io`)의 값을 사용자 요청에 따라 리터럴하게 동일하게 맞췄다 (2026-08-09 결정). 콘텐츠(실제 이력서 텍스트, 이미지)는 재사용하지 않는다.
