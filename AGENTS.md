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

## Architecture

- `src/data/profile.ts` — 이름/소개/학력/자격증 등 이력서 텍스트 (`[이렇게 감싼]` placeholder를 실제 내용으로 교체)
- `src/content/projects/*/index.md` — 프로젝트별 콘텐츠 (Content Layer `glob` 로더, 스키마는 `src/content.config.ts`)
- `src/pages/index.astro` — 홈(이력서) 페이지, `src/pages/projects/[...slug].astro` — 프로젝트 상세 페이지(`getStaticPaths`로 콘텐츠 컬렉션을 라우트로 변환)
- `src/components/` — `Sidebar.astro`(내비/다크모드 토글), `Section.astro`, `ProjectEntry.astro`
- `src/layouts/Base.astro` — 공통 레이아웃
- `src/styles/global.css` — CSS 변수(`--color-*`)로 라이트/다크 팔레트 관리, 다크모드는 `localStorage`에 저장, 인쇄(⌘/Ctrl+P) 시 사이드바 숨김 + 라이트 모드 강제 전환

## Content 작성 규칙

`src/content/projects/`에 폴더를 만들고 `index.md`를 작성하면 자동으로 홈 화면/사이드바에 노출된다.

- frontmatter: `title`, `period`, `summary`, `techStack`, `order`, 선택적 `githubUrl` / `demoUrl`
- 본문: `## ` 헤딩으로 "문제 정의 → 해결 방안 비교 및 선택 이유 → 문제 해결 과정 → 결과" 4단계 구조를 따른다
- 이미지는 같은 폴더에 넣고 `![설명](./파일명.png)`로 참조하면 클릭 시 확대되는 라이트박스가 자동 적용되고, ` ```mermaid ` 코드 블록은 자동으로 다이어그램 렌더링된다

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
- Content collection은 Content Layer `glob` 로더(`astro/loaders`)를 `src/content.config.ts`에서 사용 (legacy `type: 'content'` 아님) — 새 컬렉션도 동일 패턴 유지.
- 디자인 시스템(`src/styles/global.css`의 색상 hex값, spacing, 인쇄 스타일)은 참고한 외부 사이트의 값을 사용자 요청에 따라 리터럴하게 동일하게 맞춘 의도적 결정 (2026-08-09). 임의로 "정리"하거나 값을 바꾸지 말 것 — 콘텐츠(이력서 텍스트, 이미지)는 재사용하지 않는다.
- Pretendard 폰트와 mermaid.js는 모두 jsdelivr CDN에서 로드된다(`Base.astro` 폰트 링크, `[...slug].astro`의 동적 import) — 오프라인/CSP 제한 환경에서는 폰트나 다이어그램이 깨질 수 있다.
