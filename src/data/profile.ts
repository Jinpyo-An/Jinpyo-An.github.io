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

// intro 문단은 대부분 순수 텍스트지만, 특정 프로젝트/트러블슈팅 문서를 근거로
// 인용하는 문단만 예외적으로 문장 끝에 트레일링 링크를 붙일 수 있다.
type IntroParagraph = string | { text: string; link?: string; linkLabel?: string };

export const profile = {
  name: '안진표',
  tagline: 'backend developer',
  headline: '무엇을, 왜 만드는지 끝까지 고민하는 개발자, 안진표입니다.',
  githubUrl: 'https://github.com/Jinpyo-An',
  email: 'dkswlsvy3312@gmail.com',

  intro: [
    {
      text: 'AI 시대에는 구현 자체의 가치보다 무엇을 만들지 정의하고 설계하는 능력이 개발자의 핵심 역량이라고 생각합니다. 그래서 문제 정의와 설계 과정에는 시간을 아끼지 않고, 그 의도를 스스로 설명할 수 있도록 해왔습니다. 예를 들어 AI 프롬프트 마켓플레이스에서 결제 게이트웨이 장애가 서비스 전체로 번지지 않도록 여러 안전장치를 설계할 때, 왜 이 장치가 필요한지와 왜 이런 구조를 선택해야 하는지를 꼼꼼히 따져 설계했습니다. 그 덕분에 구현 의도를 코드 리뷰에서 명확히 설명할 수 있었고, 팀으로부터 의도에 맞게 잘 작성했다는 평가를 받았습니다.',
      link: '/projects/ai-prompt-marketplace/troubleshooting/toss-payment-resilience-layers/',
      linkLabel: '문서 보기 ↗',
    },
    '의사소통 능력 역시 타고나는 것이 아니라 계속 다듬어야 할 역량이라고 생각합니다. 저는 상대방이 이해할 수 있는 언어로 의견을 전달하고, 상대의 의도를 끝까지 확인하는 습관을 들이고 있습니다. 이 과정이 서로의 이해 차이를 줄이고 일의 반복을 막아 팀의 시간을 아낀다고 믿기 때문입니다.',
    '결국 저는 코드 작성에 그치지 않고, 무엇을 왜 만들어야 하는지 고민하고 그 결과에 책임지는 개발자가 되고 싶습니다. 기술은 변해도 문제를 정의하고 사람과 함께 해결하는 역량은 변하지 않는다고 믿습니다.',
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
