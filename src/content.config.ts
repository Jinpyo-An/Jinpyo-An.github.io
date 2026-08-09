import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 개인 프로젝트 컬렉션.
// 상세 본문(마크다운 body)은 "문제 정의 → 해결 방안 비교 및 선택 이유 →
// 문제 해결 과정 → 결과" 4단계 구조를 ## 헤딩으로 작성한다.
// 이미지/다이어그램(mermaid 코드 블록)은 본문 어디에나 선택적으로 넣으면 된다.
const projects = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/projects' }),
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

export const collections = { projects };
