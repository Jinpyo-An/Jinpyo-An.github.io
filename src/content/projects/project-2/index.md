---
title: '공연 예매 서비스'
period: '2025.05 - 2025.12'
summary: '보고싶은 공연의 좌석을 예매하고 QR 티켓을 발급받는 예매 서비스'
techStack:
  - 'Spring Boot'
  - 'PostgreSQL'
  - 'Redis'
  - 'Nginx'
  - 'GitHub Actions'
order: 2
githubUrl: 'https://github.com/next-frame-lab/api-server'
# demoUrl은 실제 링크가 생기면 주석을 풀고 채워주세요.
# demoUrl: 'https://example.com'
---

## 서비스 설명

보고 싶은 공연의 좌석을 선택해 예매하고, 예매가 완료되면 QR 티켓을 발급받아 현장에서 바로 입장할 수 있는 공연 예매 서비스입니다.

인기 공연은 예매 오픈 시점에 짧은 시간 동안 트래픽이 급격히 몰리는 특성이 있어, 이런 환경에서도 안정적으로 동작하는 시스템을 만드는 것을 이 프로젝트의 기술적 목표로 잡고 진행했습니다.

4인 팀(Frontend 2명, Backend 2명)으로 진행했으며, 그중 Backend로 인증·예매 도메인 설계 및 API 개발을 담당했습니다.

| 구분 | 상세 기술 |
| --- | --- |
| Infra & OS | Raspberry Pi 4, Linux(Ubuntu) |
| Backend | Java 21, Spring Boot 3.5.4 |
| Frontend | React |
| Database | PostgreSQL, Redis |
| DevOps | Nginx(Reverse Proxy), GitHub Actions |
| Monitoring | Prometheus, Grafana, Loki |

<div class="image-row">

<figure>

![메인 페이지](./main-page.png)

<figcaption>홈페이지</figcaption>

</figure>

<figure>

![예매 페이지](./booking-page.png)

<figcaption>공연 예매 페이지</figcaption>

</figure>

</div>

## 서비스 구조

[서비스의 전체적인 아키텍처/구조를 설명해주세요.]
