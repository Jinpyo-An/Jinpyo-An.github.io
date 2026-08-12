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
    'AI의 등장으로 구현 자체의 가치는 낮아지고 있다고 생각합니다. 그만큼 무엇을 만들지 정의하고 설계하는 능력이 개발자의 핵심 역량이 되고 있습니다. 그래서 저는 문제를 정의하고 설계하는 과정에는 시간을 아끼지 않습니다. 구현이 끝난 뒤에도 결과물을 꼼꼼히 검증하는 습관을 들이고, 어떤 의도로 그렇게 구현했는지 스스로 설명할 수 있어야 한다고 생각합니다. 구현은 누구나, 무엇으로든 할 수 있는 시대이지만, 그 구현이 왜 필요했는지 설명할 수 있는 사람은 여전히 드물기 때문입니다.',
    '의사소통 능력은 타고나는 것이 아니라 계속 다듬어야 하는 역량이라고 생각합니다. 저는 항상 상대방이 이해할 수 있는 언어로 제 의견을 전달하려고 노력합니다. 동시에 상대방의 의도를 끝까지 확인하는 습관을 의식적으로 들이고 있습니다. 이해될 때까지 확인하는 과정을 거치면 서로의 이해 차이가 줄어들고, 그만큼 일이 다시 반복되지 않아 팀의 시간을 아낄 수 있다고 믿기 때문입니다.',
    '결국 저는 코드를 작성하는 것에 그치지 않고, 무엇을 왜 만들어야 하는지 고민하고 그 결과에 책임지는 개발자가 되고 싶습니다. 기술이 변해도 문제를 정의하고 사람과 함께 해결하는 역량은 변하지 않는다고 믿습니다.',
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
