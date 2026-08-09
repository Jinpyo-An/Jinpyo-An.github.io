// 이력서 본문에 쓰이는 개인 정보 placeholder.
// 실제 내용으로 바꾸기만 하면 사이트 전체(홈/사이드바/메타태그)에 반영된다.

type EducationEntry = {
  school: string;
  degree: string;
  period: string;
  // 재학 중 활동(연구실, 조교, 프로젝트, 논문 등)을 해당 학교 항목 아래 하위 불릿으로 표시할 때 사용.
  activities?: { text: string; link?: string; linkLabel?: string }[];
};

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
      activities: [
        {
          text: '무선통신 소프트웨어 연구실(WiSoft) 학부 연구생 (2023.03 - 2025.02)',
        },
        {
          text: "'리눅스와 오픈소스 하드웨어', '데이터베이스' 수업 조교",
        },
        {
          text: "'소중한 SW 기초 교육 특강: 라즈베리파이' 보조 강사",
        },
        {
          text: "졸업 작품 '가전제품 관리 서비스' 단독 제작 및 전시회 출품",
          link: 'https://github.com/Jinpyo-An/item-manager',
          linkLabel: 'GitHub ↗',
        },
        {
          text: "한국HCI학회 「RFID 기반 키 관리 애플리케이션을 통한 강의실 자원 최적화 시스템 설계」 게재 (공동저자)",
          link: 'https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12131721',
          linkLabel: '논문 보기 ↗',
        },
        {
          text: "한국정보과학회 「전자제품 폐기물 감소를 위한 가전제품 관리 애플리케이션」 게재 (제1저자)",
          link: 'https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12042266',
          linkLabel: '논문 보기 ↗',
        },
      ],
    },
  ] as EducationEntry[],

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

  awards: [
    {
      name: '소중한 오픈소스 활용 SW 경진대회',
      rank: '3위',
      date: '2024.11',
      description: "'RFID 기반 강의실 키 관리 애플리케이션' 개발",
      link: 'https://github.com/Jinpyo-An/stevia',
    },
  ],
};

export type Profile = typeof profile;
