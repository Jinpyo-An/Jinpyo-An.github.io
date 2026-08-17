---
title: 'AI 프롬프트 마켓플레이스'
period: '2026.06 - 2026.07'
summary: 'AI 프롬프트를 등록·판매·구매하는 MSA 기반 마켓플레이스 서비스'
techStack:
  - 'Java 21'
  - 'Spring Boot 4'
  - 'Spring Cloud'
  - 'gRPC'
  - 'Kafka'
  - 'PostgreSQL(+pgvector)'
  - 'Redis'
  - 'ELK'
  - 'Docker'
  - 'Kubernetes'
  - 'EC2'
  - 'S3'
order: 1
githubUrl: 'https://github.com/prgrms-be-adv-devcourse/beadv6_6_3JMT_BE'
frontendGithubUrl: 'https://github.com/prgrms-be-adv-devcourse/beadv6_6_3JMT_FE'
# demoUrl은 실제 링크가 생기면 주석을 풀고 채워주세요.
# demoUrl: 'https://example.com'
role: '5인 팀(BE5, FE 공통) | 결제·AI 도메인 백엔드 개발'
implementationHighlights:
  - '결제 승인 API 구현 - 멱등키 검증·주문 서비스 금액 대조·Resilience4j 기반 장애 대응으로 중복 결제·금액 위변조·PG 장애 방어'
  - '부분 환불 기능 구현 - Kafka 이벤트 구독 기반 비동기 트리거로 처리하고, 누적 환불액을 검증해 과환불 방지'
  - '결제·환불 감사 로그 구현 - 상태 전이를 감사 테이블에 기록하고, Elasticsearch에 미러링해 Kibana에서 조회·분석 가능하도록 구성'
  - 'AI 기반 상품 자동검수 파이프라인 구현 - Vision 멀티모달로 텍스트·이미지를 검수하고, 프롬프트 품질 체크리스트를 함께 제공'
troubleshootingHighlights:
  - 'page-composition-frontend-migration'
  - 'refund-request-payment-to-order'
  - 'toss-payment-resilience-layers'
  - 'order-verification-cache-to-grpc'
---

## 서비스 설명

AI 프롬프트를 상품으로 등록하고 사고팔 수 있는 마켓플레이스입니다. 판매자가 프롬프트를 등록하면 AI가 이미지·텍스트를 자동으로 검수해 승인 여부를 판정하고, 구매자는 검수를 통과한 상품을 검색해 구매할 수 있습니다.

도메인마다 배포 주기와 트래픽 특성이 달라질 수 있다고 보고, 서비스를 도메인 단위로 완전히 분리해 독립적으로 배포·확장할 수 있는 구조를 만드는 것을 이 프로젝트의 기술적 목표로 잡고 진행했습니다. 서비스 간 결합도를 낮추기 위해 조회성 연동은 동기 호출로, 상태 변경이 뒤따르는 연동은 이벤트 기반 비동기 처리로 구분해 설계했습니다.

5인 팀으로 진행했으며, 그중 결제 서비스(Payment Service) 전체와 AI 서비스(AI Service)의 상품 자동 검수 기능을 담당했습니다. 결제 서비스에서는 외부 PG 연동과 환불 이벤트 처리를, AI 서비스에서는 이벤트 기반 자동 검수 워커와 LLM 연동을 설계·구현했습니다.

| 구분 | 상세 기술 |
| --- | --- |
| 언어/프레임워크 | Java 21, Spring Boot 4.1.0, Spring Cloud 2025.1.2 |
| 내부 동기 통신 | gRPC 1.80.0 + Protobuf |
| 비동기 메시징 | Apache Kafka (Confluent) |
| 데이터 저장소 | PostgreSQL 18(+pgvector), Redis 7.4, Elasticsearch |
| 배포/CI-CD | Docker, GitHub Actions, Kubernetes |
| 인프라(AWS) | EC2, S3 |
| 외부 연동 | Toss Payments, OpenAI |
| 관측성 | Fluent Bit, Logstash, Elasticsearch, Kibana |

## 서비스 구조

전체 시스템을 User/Product/Order/Payment/Admin/AI/Notification/Settlement 8개 도메인별 마이크로서비스로 분리하고, Kubernetes 위에서 게이트웨이·서비스 디스커버리·설정 관리를 중앙화해 각 서비스가 독립적으로 배포·확장될 수 있도록 구성했습니다.

![서비스 아키텍처](./service-architecture.png)

### 인프라 구성

사용자 요청은 프론트엔드(Vercel 배포)를 거쳐 AWS의 Internet Gateway와 Ingress를 통해 클러스터 내부로 들어옵니다. Kubernetes 클러스터는 Control Plane(Medium EC2)과 Worker Node(Large EC2)로 역할을 분리했고, Worker Node 위에서 API 게이트웨이·마이크로서비스·Kafka가 함께 동작합니다.

### 서비스 구성

Spring Cloud Gateway를 단일 진입점으로 두고, Eureka Discovery와 Spring Cloud Config로 서비스 등록과 설정을 중앙에서 관리합니다. 서비스 간 조회성 동기 호출은 gRPC로 처리하는데, 예를 들어 결제 서비스는 결제 승인 검증을 위해 gRPC로 주문 서비스를 직접 조회합니다.

| 서비스 | 역할 |
| --- | --- |
| User Service | 회원 가입·인증, 사용자 정보 관리 |
| Product Service | 프롬프트 상품 등록·조회, 검색 색인 관리 |
| Order Service | 주문 생성 및 상태 관리 |
| Payment Service | 결제 승인·환불, 외부 PG 연동 |
| Admin Service | 운영자용 관리 기능 |
| AI Service | 상품 자동 검수(LLM 기반 판정) |
| Notification Service | 알림 발송 |
| Settlement Service | 판매자 정산 |

### 비동기 이벤트 처리

상태 변경이 여러 서비스에 걸쳐 전파돼야 하는 연동은 Kafka 기반 이벤트 발행/구독으로 처리해 서비스 간 결합도를 낮췄습니다. 예를 들어 주문 서비스가 발행한 환불 요청 이벤트를 결제 서비스가 구독해 비동기로 환불을 처리하고, 상품 등록 이벤트를 AI 서비스가 구독해 자동 검수를 수행한 뒤 판정 결과를 다시 이벤트로 발행합니다. 이벤트 처리가 재시도 후에도 실패하면 DLT(Dead Letter Topic)로 격리해 장애가 다른 서비스로 전파되지 않도록 했습니다.

### 외부 서비스 연동

결제는 Toss Payments API와 직접 연동하며, 장애 전파를 막기 위해 Resilience4j 기반 회복성 계층(서킷 브레이커·벌크헤드·속도 제한·재시도)과 멱등성 키를 함께 적용했습니다. 상품 자동 검수는 OpenAI 모델을 Spring AI의 `ChatModel` 추상화로 호출해, 승인 여부와 반려 사유를 구조화된 형태로 받아 처리합니다.

### CI/CD 파이프라인

GitHub Actions에서 빌드한 이미지를 GHCR(GitHub Container Registry)에 푸시하면 Kubernetes 클러스터가 이를 pull해 배포합니다. 배포 진행 상황은 Slack으로 공유해 팀 전체가 실시간으로 확인할 수 있도록 했습니다.

### 모니터링

Fluent Bit이 각 서비스의 로그를 수집해 Logstash로 전달하고, Elasticsearch에 적재된 로그를 Kibana로 시각화합니다. 여러 마이크로서비스에 흩어진 로그를 한 곳에서 조회하고 장애를 추적할 수 있는 관측성 체계를 구성했습니다.
