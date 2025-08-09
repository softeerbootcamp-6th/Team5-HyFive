# 📋 프로젝트 개요
<img alt="소개이미지1" src="https://github.com/user-attachments/assets/aced3d90-5c8a-4f3f-b0fc-08732ba3d998" />
<div align="center">
  <a href="https://서비스링크.com">
    <img src="https://img.shields.io/badge/Service-%2300C4B3?style=for-the-badge&logo=vercel&logoColor=white&color=FF7700" alt="서비스 바로가기" />
  </a>
  <a href="https://github.com/softeerbootcamp-6th/Team5-HyFive/wiki">
    <img src="https://img.shields.io/badge/Wiki-%236e6e6e?style=for-the-badge&logo=bookstack&logoColor=white&color=346FFA" alt="Wiki" />
  </a>
  <a href="https://spiffy-centipede-875.notion.site/HyFive-23b62570e7c480df80e3ca54de7e7a88?source=copy_link">
    <img src="https://img.shields.io/badge/Notion-%23000000?style=for-the-badge&logo=notion&logoColor=black&color=white" alt="Notion" />
  </a>
  <a href="https://github.com/orgs/softeerbootcamp-6th/projects/5">
    <img src="https://img.shields.io/badge/Project-%23121011?style=for-the-badge&logo=github&logoColor=white&color=F14251" alt="GitHub Projects" />
  </a>
</div>
<br/>
<p align="center">
<a href="#-서비스-소개">🎨 서비스 소개</a> <br>
<a href="#-주요-기능">📌 주요 기능</a> <br>
<a href="#-아키텍처">⚙️ 아키텍처</a> <br>
<a href="#-기술-스택">🛠 기술 스택</a> <br>
<a href="#-프로젝트-타임라인">📅 프로젝트 타임라인</a> <br>
<a href="#-팀-소개">👨‍👩‍👧‍ 팀 소개</a> <br>
</p>

# 🎨 서비스 소개
<img alt="기획서" src="https://github.com/user-attachments/assets/c3273ab8-4ef8-4e8b-a741-5d5050beae8c" />

# 📌 주요 기능
(보류)

# ⚙️ 아키텍처

## CI/CD 파이프라인
<img src="https://github.com/user-attachments/assets/2c868aec-54ed-41d8-a5ce-54f4e58d5be2" alt="Blank diagram - Page 1" style="max-width: 100%; height: auto;">

## ERD
<img alt="image" src="https://github.com/user-attachments/assets/83562a54-de9d-4e35-970a-fad82c2100f9" style="max-width: 100%; height: auto;"/>


# 🛠 기술 스택

### Frontend
![React](https://github.com/user-attachments/assets/e59b2768-3f50-4646-8181-fe47f64f8912)
![pnpm](https://github.com/user-attachments/assets/1d5df84a-cf9f-46ec-91bb-d7cd0d2cac3a)
![Vite](https://github.com/user-attachments/assets/bb61c864-3811-4492-ac56-46ad939f2632)
![Emotion](https://github.com/user-attachments/assets/db0b9097-d081-44fb-97dd-34822e2518fc)
![TanStack Query](https://github.com/user-attachments/assets/52d1d033-39b9-4ecf-997d-71a04ba775aa)
![TypeScript](https://github.com/user-attachments/assets/20788203-4a3a-4657-9138-83c998ce836f)
![vitest](https://github.com/user-attachments/assets/ce7018cc-ba98-45bb-b068-42eda615a632)
![React Testing Library](https://github.com/user-attachments/assets/dc495313-eb1e-46ae-a32d-c9c1ac678117)

### Backend
![springboot](https://github.com/user-attachments/assets/e9f38458-5d2b-491e-91a9-764d9007931a)
![jpa](https://github.com/user-attachments/assets/1bd69556-bb04-4b2a-8237-3eeb43482ffe)
![querydsl](https://github.com/user-attachments/assets/b40d2fc8-4de4-4761-9272-f5fd7a4bb3d5)
![Java](https://github.com/user-attachments/assets/7fb1a331-0ff7-4ffd-9ce6-74f5e2eaf0a7)
![mysql](https://github.com/user-attachments/assets/8c294b7e-678d-414f-95e3-6f3dce185dba)

### 인프라
![AWS EC2](https://github.com/user-attachments/assets/3c888bc3-b50b-453f-9b1b-ab10c3aed706)
![AWS RDS](https://github.com/user-attachments/assets/f20131c5-1c5a-49e5-8564-ed07ba876ebf)
![AWS S3](https://github.com/user-attachments/assets/0b0e1b9c-6993-48a1-906d-f2f62b25db87)
![AWS CodeDeploy](https://github.com/user-attachments/assets/aa8b0356-ba21-4b33-8ff2-bde5eadda8bf)
![AWS CloudFront](https://github.com/user-attachments/assets/a9c4e963-a054-45a4-939e-d5dae33f393d)
![GitHub Actions](https://github.com/user-attachments/assets/98ef3abf-347d-4a73-ba21-767762d572f6)

### 협업
![GitHub](https://github.com/user-attachments/assets/d8fa149a-6cc1-4742-8134-62c4131f6d35)

# 📁 폴더 구조

## 프론트엔드 폴더 구조
경량화된 atomic 기반 폴더 구조를 선택했습니다.
- components: 공통 UI 컴포넌트
- features: 특정 도메인 단위로 컴포넌트, 훅, 테스트를 묶음
- pages: 라우트 진입점으로 각 도메인을 하나의 페이지로 묶음
```
frontend/
└── src/
    ├── components/                   # 전역 재사용 컴포넌트
    │   ├── Button.tsx
    │   ├── Input.tsx
    │   └── FallbackUI.tsx
    │
    ├── features/                      # 기능(도메인) 단위 폴더
    │   ├── book/
    │   ├── calander/
    │   └── map/                       # 지도 관련 기능
    │       ├── MapComponent.tsx       # 지도 UI 컴포넌트
    │       ├── Map.style.ts           # 스타일 정의
    │       ├── Map.types.ts           # 타입 정의
    │       ├── Map.test.tsx           # 단위 테스트
    │       └── useInitializeMap.ts
    │
    ├── layouts/                        # 페이지 레이아웃
    │   ├── AdminLayout.tsx
    │   ├── BookLayout.tsx
    │   ├── CenterLayout.tsx
    │   └── index.ts
    │
    ├── pages/                          # 라우트 진입점
    │   ├── admin/
    │   └── center/
    │
    ├── routes/                         # 라우터 설정
    ├── hooks/                          # 전역 커스텀 훅
    ├── utils/                          # 유틸 함수
    ├── types/                          # 전역 타입 정의
    ├── assets/                         # 정적 파일
    │   ├── images/
    │   ├── icons/
    │   └── fonts/
    ├── styles/                         # 전역 스타일
    │   ├── themes.style.ts
    │   └── globalStyle.ts
    ├── App.tsx
    └── main.tsx
```

# 👨‍👩‍👧‍ 팀 소개

## 팀원 소개
| [김민정](https://github.com/minjeongss) | [유재민](https://github.com/jjamming) | [신지수](https://github.com/didyou88) | [성유진](https://github.com/jin20fd) |
| :--: | :--: | :--: | :--: |
| <img alt="🐿️ 얼룩다람쥐" src="https://github.com/user-attachments/assets/2850d6d1-8a91-490d-a165-79a0f9b5b2a7" /> | <img alt="🐤 병아리" src="https://github.com/user-attachments/assets/57355521-3343-4c91-b278-2bf65d87c434" /> | <img alt="🐙 문어" src="https://github.com/user-attachments/assets/3c471eb1-c66b-42be-a9f9-16d1b7b9fe1f" /> | <img alt="🦦 수달" src="https://github.com/user-attachments/assets/8a7144b5-2e85-4bb0-b359-8797a2b74569" /> |
| `Frontend` | `Frontend` | `Backend` | `Backend` |

## 협업

### Ground Rule

#### 📚 문서화

- 프로젝트 내의 **모든 것은 문서화가 필수**입니다.
- 모든 문서는 **초안은 Notion에서 작성**하고, 다듬은 후 **Wiki로 이관**합니다.
    - 이유: Notion은 **동시 편집이 용이**하기 때문입니다.

#### 📄 중요 문서 유형

- **스크럼 일지**: 오전 / 오후 스크럼 시 작성
- **회고록**: 주간 회고 시 작성
- **회의록**: 회의 큐에 기록된 회의 내용 중 중요한 회의는 별도 회의록으로 정리하여 Wiki에 업로드
- **개발 일지**: 트러블슈팅, 주요 기능 개발 과정 등을 아카이빙
  → Notion에 우선 작성, 중요 문서는 Wiki로 이동
- **발표 일지**: 금요일에 진행하는 데모데이 발표 자료 기록 및 아카이빙

---

#### 🧑‍💻 스크럼 & 업무

- **스크럼 시간 및 내용**
    - 🕙 오전 스크럼: 오전 10시
        - 오늘의 작업 예정 사항 공유
        - 간단한 안건에 대한 논의
    - 🕡 오후 스크럼: 오후 6시 30분
        - 오늘 작업한 사항 공유
        - 금요일 마무리 스크럼: 주말 작업 예정 사항 공유
        - 야근 여부(7시 이후 퇴근 여부) 공유
- **개인 집중시간 운영**
    - 오전 스크럼 ~ 점심시간 전까지는 **개인 집중 시간**입니다. → 집중을 방해하지 않도록 주의!
- **업무 공유**
    - 백로그 및 업무 현황은 **GitHub Projects**로 관리합니다.
    - 스크럼에서도 GitHub Projects를 기준으로 할 일과 한 일을 팀원들과 공유합니다.

---

#### 🗣 회의

- **회의 큐 시스템 도입**
    - 팀의 모든 논의 사항은 **회의 큐 페이지**에 기록합니다.
    - 팀원들과 이야기 나누고 싶은 사항에 대해 **언제든지 회의 큐 페이지에 작성**할 수 있습니다.
    - 검토자는 내용을 확인하고, 모두 확인되면 큐 상태를 변경합니다.
    - 회의가 필요하면 스크럼 시간 또는 Slack에서 제안하여 회의를 진행합니다.
    - 회의 결과는 회의 큐 내부에 기록하며, **중요 회의는 Wiki에도 업로드**합니다.

---

#### 🧘 점심 & 건강

- **점심 메뉴 정하기 시스템**
    - 슬랙에서 `오늘의 점심` 알림봇 워크플로우 운영 🍚🥄
    - 알림봇 댓글에 먹고싶은 메뉴를 작성하고 투표로 결정!
- **점심 체조 시간 운영 🤸**
    - 점심 식사 후 **새천년 체조** 실시
- **특이사항 공유**
    - 병원 일정, 야근 일정 등은 **점심시간에 미리 공유**

### 📦 프로젝트 관리

- 업무 관리 및 일정 공유는 **GitHub Projects**를 사용합니다.
- 스크럼 시에도 해당 보드를 기준으로 공유하고 피드백합니다.

### Git Convention

#### 1. Git 브랜치 이름 작성 규칙

- 브랜치 이름은 **영어 소문자**만 사용합니다.
- 구성: **유형 / 이슈 번호**

**✅ 작성 예시**
```
feat/#23
fix/#45
refactor/#51
docs/#6
```

**🔀 Git 브랜치 전략**
```mermaid

gitGraph
    commit id: "init"

    branch dev
    checkout dev
    commit id: "통합 개발 브랜치 생성"

    branch dev-fe
    checkout dev-fe
    commit id: "dev-fe 준비"

    checkout dev
    branch dev-be
    checkout dev-be
    commit id: "dev-be 준비"


    checkout dev-be
    branch "feature/#1"
    checkout "feature/#1"
    commit id: "feat: 로그인 UI 개발"
    commit id: "feat: 로그인 로직 구현"
    checkout dev-be
    merge "feature/#1" id: "merge login-fe"


    checkout dev-fe
    branch "refactor/#2"
    checkout "refactor/#2"
    commit id: "refactor: 세션 구조 개선"
    commit id: "refactor: 세션 미들웨어 적용"
    checkout dev-fe
    merge "refactor/#2" id: "merge session-be"


    checkout dev
    merge dev-fe id: "dev에 fe 병합"
    merge dev-be id: "dev에 be 병합"


    checkout main
    merge dev id: "main으로 릴리즈"
```

#### 2. Git 커밋 메시지 작성 규칙

- 커밋 메시지는 다음 형식을 따릅니다: `<타입> : <제목 요약>`
- 제목(Subject)은 **50자 이내**로 간결하게 작성합니다.
- `타입(Type)`과 `제목(Subject)` 사이에 **콜론(:)**과 **한 칸(space)**을 넣습니다.

**커밋 유형**

유형 | 설명
-- | --
feat | 새로운 기능 추가
fix | 버그 수정
refactor | 코드 리팩토링 (기능 변화 없음)
chore | 빌드, 설정 파일 등 기타 작업
docs | 문서 수정
style | 스타일 수정 (HTML, CSS, 코드 정렬 등)
test | 테스트 코드 추가 및 수정


**✅ 작성 예시**
```
feat : 로그인 기능 구현
fix : 로그인 API 에러 수정
docs : README 파일 업데이트
refactor : 회원가입 로직 개선
style : 코드 컨벤션 맞춤 정렬 적용
test : 회원가입 유닛 테스트 추가
chore : gitignore 파일 추가
```

#### 3. 템플릿
##### PR template
```markdown
## #️⃣ 연관된 이슈
Close 

## 📝 기능 설명
<!-- 제안하는 기능에 대해 명확하고 간단히 설명해주세요 -->

## 🛠 작업 사항
<!-- 구현한 작업 내용을 설명해주세요 -->

## ✅ 작업 항목
- [ ] 작업 1
- [ ] 작업 2

## 📎 참고 자료
<!-- 관련 문서, 링크, 스크린샷 등을 첨부해주세요 -->
```



##### Issue template
```markdown
## 🎯 작업 목표  
<!-- 작업 목표에 대해 설명해주세요 -->

## ✅ 작업 항목

- [ ] 작업 1
- [ ] 작업 2

## 📅 예상 마감일  
예: 2025-08-02

## 🔗 관련 이슈 또는 PR (선택)
예: #3, #12
```

## 📅 회고

- **주간 회고**: 매주 금요일 진행
    - 팀 전체의 관점에서 **잘한 점 / 개선할 점 / 보완할 점** 공유
        - 보완할 점은 **회고를 진행하면서 즉시 구체적으로 작성**
    - 팀원 별로 그 주 MVP 였던 순간 선정
    - 개선할 점은 스스로 작성하고, 팀원들이 개선 방법 공유해주기
    - 🍽️ 가장 맛있었던 **식사 메뉴 회고**도 함께 진행!
