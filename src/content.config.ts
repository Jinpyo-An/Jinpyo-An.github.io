import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 개인 프로젝트 컬렉션.
// 상세 본문(마크다운 body)은 "## 서비스 설명 → ## 서비스 구조" 2단계 고정
// 구조로 작성한다. 이 두 헤딩은 사이드바 목차에 자동으로 노출되어 클릭 시
// 해당 위치로 앵커 스크롤된다(헤딩 id는 Astro 마크다운 파이프라인이 자동 생성).
// 이미지/다이어그램(mermaid 코드 블록)은 본문 어디에나 선택적으로 넣으면 된다.
const projects = defineCollection({
  // '*/index.md'(1단계)로 한정해서 하위의 troubleshooting/**/index.md가
  // 프로젝트 자체로 잘못 인식되지 않게 한다.
  loader: glob({ pattern: '*/index.md', base: './src/content/projects' }),
  schema: z.object({
    // 홈 화면 목록/사이드바에 노출되는 제목
    title: z.string(),
    // 진행 기간 (placeholder 예: "[진행 기간을 입력하세요]")
    period: z.string(),
    // 홈 화면 카드에 노출되는 한 줄 요약
    summary: z.string(),
    // 사용 기술 스택 태그. 별도 Skills 섹션 없이 프로젝트별로 표시한다.
    techStack: z.array(z.string()),
    // 홈 화면/사이드바 노출 순서 (작을수록 위)
    order: z.number(),
    githubUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
  }),
});

// 프로젝트별 트러블슈팅 사례 컬렉션.
// src/content/projects/{project}/troubleshooting/{case}/index.md 로 추가하면
// 해당 프로젝트의 사이드바 목차에 "문제 해결" 그룹으로 자동 노출되고,
// 사례별 상세 페이지(/projects/{project}/troubleshooting/{case}/)가 생성된다.
// 사례가 하나도 없는 프로젝트는 "문제 해결" 그룹 자체가 노출되지 않는다.
// 본문은 "## 문제 정의 → ## 해결 방안 비교 및 선택 이유 →
// ## 문제 해결 과정 → ## 결과" 4단계 구조를 따른다(사이드바 목차에는 반영 안 함).
const troubleshooting = defineCollection({
  loader: glob({
    pattern: '*/troubleshooting/*/index.md',
    base: './src/content/projects',
    // id를 "{projectId}/{caseId}" 형태로 정규화해서 소속 프로젝트를 알 수 있게 한다.
    generateId: ({ entry }) => entry.replace(/\/troubleshooting\//, '/').replace(/\/index\.md$/, ''),
  }),
  schema: z.object({
    // 사이드바 목차/상세 페이지 제목에 노출되는 제목
    title: z.string(),
    // 같은 프로젝트 안에서의 노출 순서 (작을수록 위)
    order: z.number(),
  }),
});

export const collections = { projects, troubleshooting };
