// 이력서 본문에 쓰이는 개인 정보 placeholder.
// 실제 내용으로 바꾸기만 하면 사이트 전체(홈/사이드바/메타태그)에 반영된다.

export const profile = {
  name: '안진표',
  tagline: 'backend developer',
  headline: '백엔드 개발자, 안진표입니다.',
  githubUrl: 'https://github.com/Jinpyo-An',
  email: 'dkswlsvy3312@gmail.com',

  intro: [
    '[자기소개 첫 문단을 입력하세요. 어떤 개발자인지, 무엇에 관심이 있는지 소개해주세요.]',
    '[자기소개 두 번째 문단을 입력하세요. 강점이나 앞으로의 방향을 적어도 좋습니다.]',
  ],

  education: [
    {
      school: '프로그래머스 데브코스',
      degree: '개발자 부트캠프',
      period: '2026.06 - 2026.07',
    },
    {
      school: '국립한밭대학교',
      degree: '정보통신공학과 졸업 3.7 / 4.5',
      period: '2019.03 - 2025.02',
    },
  ],

  certifications: [
    {
      name: '정보처리기사',
      date: '2026.06',
    },
    {
      name: 'SQLD',
      date: '2026.06',
    },
  ],
};

export type Profile = typeof profile;
