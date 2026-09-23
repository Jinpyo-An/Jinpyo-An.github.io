// 이력서 본문에 쓰이는 개인 정보 placeholder.
// 실제 내용으로 바꾸기만 하면 사이트 전체(홈/사이드바/메타태그)에 반영된다.

type EducationEntry = {
  school: string;
  degree: string;
  period: string;
  // 소속 연구실 등, activities 목록 전체를 아우르는 소속 정보. 불릿 없이 강조된
  // 한 줄로 activities 목록 바로 위에 표시되며, 그 아래 활동들이 이 소속에서
  // 이루어졌음을 나타낸다. period는 사이트 전반의 날짜 표기 관례(회색)를 따르기
  // 위해 본문과 색상을 분리해서 렌더링한다.
  affiliation?: { text: string; period?: string };
  // 재학 중 활동(조교, 프로젝트, 논문 등)을 해당 학교 항목 아래 하위 불릿으로 표시할 때 사용.
  activities?: { text: string; link?: string; linkLabel?: string }[];
};

// intro 문단은 세그먼트 배열로 구성한다. 일반 텍스트는 문자열 그대로 두고,
// 강조하고 싶은 구절만 { bold: '...' }로 감싼다. 특정 프로젝트/트러블슈팅 문서를
// 근거로 인용하는 문단만 예외적으로 문장 끝에 트레일링 링크를 붙일 수 있다.
type IntroSegment = string | { bold: string };
type IntroParagraph = IntroSegment[] | { segments: IntroSegment[]; link?: string; linkLabel?: string };

export const profile = {
  name: '안진표',
  tagline: 'backend developer',
  headline: '안진표 개발자 이력서',
  githubUrl: 'https://github.com/Jinpyo-An',
  email: 'dkswlsvy3312@gmail.com',

  intro: [
    {
      segments: [
        '저는 ',
        { bold: '문제를 정확히 정의해 최적의 해결책을 찾는 사람' },
        '입니다. 그래서 문제의 정확한 원인을 짚어낸 뒤, 여러 대안을 비교해 가장 적합한 방식을 고르는 데 시간을 아끼지 않습니다. 예를 들어 팀 프로젝트에서 결제 게이트웨이 장애가 서비스 전체로 번지지 않도록 여러 안전장치를 설계할 때도, 장애 상황을 다시 짚어본 뒤 가능한 조합과 방식을 비교해 효과적인 구조를 선택했습니다. 그 덕분에 결제 게이트웨이에 장애가 발생해도 그 여파가 다른 기능까지 번지지 않는 구조를 만들 수 있었습니다.',
      ],
      link: '/projects/ai-prompt-marketplace/troubleshooting/toss-payment-resilience-layers/',
      linkLabel: '문서 보기 ↗',
    },
    [
      '또한 저는 ',
      { bold: '소통을 무엇보다 중요하게 여기는 사람' },
      '입니다. 그래서 제 의견이 의도한 그대로 전달되도록 노력하고, 상대방의 의견도 그 의도에 맞게 이해하려고 노력하는 습관을 가지고 있습니다. 팀 프로젝트에서 아키텍처 방향을 두고 동료와 의견이 갈렸을 때도, 동료의 반대 의견을 이해한 뒤 우려하는 지점을 해소할 수 있는 의견을 의도에 맞게 전달하며 설득할 수 있었습니다.',
    ],
  ] as IntroParagraph[],

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
      affiliation: {
        text: '무선통신 소프트웨어 연구실(WiSoft) 학부 연구생',
        period: '(2023.03 - 2025.02)',
      },
      activities: [
        {
          text: "'리눅스와 오픈소스 하드웨어', '데이터베이스' 수업 조교",
        },
        {
          text: "'소중한 SW 기초 교육 특강: 라즈베리파이' 보조 강사",
        },
        {
          text: "졸업 작품 '가전제품 관리 서비스' 제작 및 전시회 출품",
          link: 'https://github.com/Jinpyo-An/item-manager',
          linkLabel: 'GitHub ↗',
        },
        {
          text: "'RFID 기반 강의실 키 관리 애플리케이션' 개발",
          link: 'https://github.com/Jinpyo-An/stevia',
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
};

export type Profile = typeof profile;
