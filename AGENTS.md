## Development

`npm install` 후 (Node `>=22.12.0`):

```
npm run dev       # http://localhost:4321
npm run build     # ./dist 에 정적 빌드
npm run preview   # 빌드 결과 로컬 미리보기
```

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

테스트 스위트가 없으므로, Content Collection/라우팅 변경은 `npm run build` 후
`dist/**/*.html`을 `grep`으로 직접 확인하는 게 브라우저 없이도 가장 빠르다
(예: `grep -o '<h2 id="[^"]*"' dist/projects/*/index.html`로 헤딩 id 생성 확인).

## Architecture

- `src/data/profile.ts` — 이름/소개/학력/자격증 등 이력서 텍스트 (`[이렇게 감싼]` placeholder를 실제 내용으로 교체)
- `src/content/projects/{project}/index.md` — 프로젝트별 콘텐츠 (Content Layer `glob` 로더, 스키마는 `src/content.config.ts`의 `projects` 컬렉션)
- `src/content/projects/{project}/troubleshooting/{case}/index.md` — 프로젝트별 트러블슈팅 사례 (`src/content.config.ts`의 `troubleshooting` 컬렉션, nested glob 패턴)
- `src/pages/index.astro` — 홈(이력서) 페이지
- `src/pages/projects/[...slug].astro` — 프로젝트 랜딩 페이지(`/projects/{project}/`). 헤더(제목/기간/GitHub·Demo 링크) + 한 줄 요약 + 하위 문서(서비스 개요, 트러블슈팅 사례) 내비게이션 목록만 보여주는 허브 페이지다. 본문(Content)은 렌더링하지 않는다.
- `src/pages/projects/[project]/overview.astro` — 서비스 개요 페이지(`/projects/{project}/overview/`). `projects` 컬렉션 엔트리의 본문(Content, `## 서비스 설명` → `## 서비스 구조`)을 렌더링하는 독립 페이지. 프로젝트 랜딩 페이지와 동일한 헤더(기간/GitHub·Demo 링크)를 반복해서, 랜딩 페이지를 거치지 않고 이 URL에 바로 들어와도 맥락이 완결되게 한다.
- `src/pages/projects/[project]/troubleshooting/[case].astro` — 트러블슈팅 사례 상세 페이지(`getStaticPaths`로 `troubleshooting` 컬렉션을 라우트로 변환)
- `src/components/` — `Sidebar.astro`(내비/다크모드 토글, 프로젝트별 목차 트리), `Section.astro`, `ProjectEntry.astro`
- `src/layouts/Base.astro` — 공통 레이아웃
- `src/styles/global.css` — CSS 변수(`--color-*`)로 라이트/다크 팔레트 관리, 다크모드는 `localStorage`에 저장, 인쇄(⌘/Ctrl+P) 시 사이드바 숨김 + 라이트 모드 강제 전환
- `astro.config.mjs` — Tailwind v4를 `@tailwindcss/vite` 플러그인으로 연결, Shiki 코드 하이라이팅 테마(`github-dark`) 설정. 커스텀 remark 플러그인(`remarkMermaid`)도 여기 정의되어 있는데, 이게 ` ```mermaid ` 코드 블록을 Shiki 하이라이팅 대신 `<pre class="mermaid">`로 바꿔주는 실제 구현체다(클라이언트 렌더링은 본문을 그리는 `overview.astro`/`[case].astro`가 담당)

## Content 작성 규칙

프로젝트 본문(`src/content/projects/{project}/index.md`) 또는 트러블슈팅 사례(`src/content/projects/{project}/troubleshooting/{case}/index.md`)를 작성/수정할 때는 `write-project-content` 스킬을 참고할 것 (frontmatter 필드, 본문 헤딩 구조, 구현 디테일 노출 수준 규칙).

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Gotchas

- Astro 7+("Sätteri" 프로세서)에서 `markdown.remarkPlugins`/`rehypePlugins`는 top-level에서 deprecated. `npm install @astrojs/markdown-remark` 후 `markdown.processor: unified({ remarkPlugins: [...] })`로 설정할 것.
- Content collection은 Content Layer `glob` 로더(`astro/loaders`)를 `src/content.config.ts`에서 사용 (legacy `type: 'content'` 아님) — 새 컬렉션도 동일 패턴 유지. 중첩된 하위 컬렉션(예: `troubleshooting`)을 추가할 때는 `projects` 컬렉션의 glob `pattern`이 `**/index.md`처럼 재귀적이면 하위 폴더의 `index.md`까지 같이 매칭되어 스키마 검증 에러가 나므로, 정확히 원하는 깊이(`*/index.md` 등)로 좁혀야 한다.
- `@astrojs/markdown-remark`의 `unified()` 프로세서는 `rehypePlugins`를 지정하지 않아도 헤딩 `id` 자동 생성(`rehypeHeadingIds`, `github-slugger` 기반)과 `render()`가 반환하는 `headings` 배열을 기본으로 포함한다 — 앵커 스크롤/목차 기능에 `rehype-slug` 등을 별도로 설치할 필요 없음.
- 디자인 시스템(`src/styles/global.css`의 색상 hex값, spacing, 인쇄 스타일)은 참고한 외부 사이트의 값을 사용자 요청에 따라 리터럴하게 동일하게 맞춘 의도적 결정 (2026-08-09). 임의로 "정리"하거나 값을 바꾸지 말 것 — 콘텐츠(이력서 텍스트, 이미지)는 재사용하지 않는다.
- Pretendard 폰트와 mermaid.js는 모두 jsdelivr CDN에서 로드된다(`Base.astro` 폰트 링크, `overview.astro`/`[case].astro`의 동적 import) — 오프라인/CSP 제한 환경에서는 폰트나 다이어그램이 깨질 수 있다.
- mermaid 예시 코드 블록을 HTML 주석(`<!-- ... -->`)으로 감싸서 "렌더링은 안 되고 문서로만 보이게" 하면 안 된다. CommonMark HTML 주석 블록은 `-->` 문자열이 처음 나오는 줄에서 끝나는데, flowchart 화살표 문법 자체가 `-->`를 쓰므로 주석이 다이어그램 중간에서 조기 종료되고, 뒤에 남은 ` ``` `가 닫히지 않은 코드 블록을 열어서 이후 본문(다음 `##` 섹션 포함)을 통째로 삼켜버린다. mermaid 예시가 필요하면 주석 없이 실제로 렌더링되게 두거나(작성자가 나중에 지우면 됨), 화살표가 없는 설명으로 대체할 것.
- `main` 브랜치에 푸시하면 `.github/workflows/deploy.yml`(GitHub Actions, `withastro/action` + `actions/deploy-pages`)이 자동으로 빌드하고 GitHub Pages에 배포한다. 별도 배포 명령이나 수동 `gh-pages` 푸시가 필요 없다.
- `src/content/projects/{project}/` 폴더명이 곧 라우팅 slug(`project.id`)다. 컴포넌트 링크는 대부분 `project.id` 기반 동적 생성이라 폴더 rename만으로 자동 반영되지만, 트러블슈팅 문서 본문 안에서 다른 사례를 참조하는 마크다운 링크(예: `/projects/{slug}/troubleshooting/{case}/`)는 하드코딩된 문자열이라 rename 후 `grep -rn "구슬러그" src/content`로 찾아 직접 고쳐야 한다.
