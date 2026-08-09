// 이력서 본문에 쓰이는 개인 정보 placeholder.
// 실제 내용으로 바꾸기만 하면 사이트 전체(홈/사이드바/메타태그)에 반영된다.

export const profile = {
  name: '[이름을 입력하세요]',
  tagline: '[한 줄 소개를 입력하세요 — 예: 문제를 끝까지 파고드는 신입 개발자]',
  githubUrl: 'https://github.com/[깃허브 아이디]',
  email: '[이메일을 입력하세요]',

  intro: [
    '[자기소개 첫 문단을 입력하세요. 어떤 개발자인지, 무엇에 관심이 있는지 소개해주세요.]',
    '[자기소개 두 번째 문단을 입력하세요. 강점이나 앞으로의 방향을 적어도 좋습니다.]',
  ],

  education: [
    {
      school: '[학교명을 입력하세요]',
      degree: '[전공 및 학위를 입력하세요]',
      period: '[재학 기간을 입력하세요]',
    },
  ],

  certifications: [
    {
      name: '[자격증명을 입력하세요]',
      date: '[취득일을 입력하세요]',
    },
  ],
};

export type Profile = typeof profile;
