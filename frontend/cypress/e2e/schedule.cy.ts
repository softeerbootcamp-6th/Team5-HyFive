const API_BASE = Cypress.env("API_BASE");

const interceptAll = () => {
  cy.intercept("GET", `${API_BASE}/path/scroll*`, {
    fixture: "scheduleList.json",
  }).as("getScheduleList");

  cy.intercept("GET", `${API_BASE}/path/*/passenger`, {
    fixture: "passengerList.json",
  }).as("getPassengerList");

  cy.intercept("GET", `${API_BASE}/path/*/nodes`, {
    fixture: "nodeList.json",
  }).as("getNodeList");
};

describe("실시간 운행 현황에서 탭/클릭 이동", () => {
  beforeEach(() => {
    interceptAll();
    cy.visit("/admin/book/schedule");
    cy.wait("@getScheduleList");
  });

  it("탭 이동시 리스트 및 헤더가 변경된다", () => {
    const tabStatusPairs = [
      { tab: "운행 중", status: "운행 중" },
      { tab: "운행 대기", status: "운행 대기" },
      { tab: "운행 완료", status: "운행 완료" },
    ];

    tabStatusPairs.forEach(({ tab, status }) => {
      it(`${tab} 탭 클릭 시 전체 운행 경로가 보인다`, () => {
        cy.get("[data-testid='tab']").contains(tab).click();
        cy.get("[data-testid='schedule-list-item']").should("exist");
      });

      it(`${tab} 탭 클릭 시 개별 운행 경로 헤더에 '${status}'가 보인다`, () => {
        cy.get("[data-testid='tab']").contains(tab).click();
        cy.get("[data-testid='schedule-detail']").should("exist");
        cy.get("[data-testid='schedule-detail-title']").should("exist");
        cy.get("[data-testid='schedule-detail-title']").should(
          "contain.text",
          status,
        );
      });
    });
  });

  it("카드 클릭시 개별 운행 경로가 노출된다", () => {
    cy.get("[data-testid='schedule-list-item']").first().click();
    cy.wait("@getNodeList");
    cy.get("[data-testid='schedule-detail']").should("exist");
    cy.get("[data-testid='schedule-detail-map']").should("not.be.empty");
  });

  it("탑승자 정보 클릭시 탑승자 정보가 노출된다", () => {
    cy.get("[data-testid='schedule-list-item']").first().click();
    cy.wait("@getPassengerList");
    cy.get("[data-testid='schedule-detail']").should("exist");
    cy.get("[data-testid='schedule-detail-title']").should("exist");
    cy.get("[data-testid='passenger-schedule-btn']").click();
    cy.get("[data-testid='passenger-schedule-info']").should("exist");
  });
});

describe("데이터 갱신: Polling 및 수동 요청", () => {
  beforeEach(() => {
    // 최초 요청: 기존 데이터
    interceptAll();
    cy.visit("/admin/book/schedule");
    cy.wait("@getScheduleList");
  });

  it("polling 주기마다 새로운 데이터로 리스트가 갱신된다", () => {
    // 신규 요청: 새로운 데이터
    cy.intercept("GET", `${API_BASE}/path/scroll*`, {
      fixture: "scheduleNewList.json",
    }).as("getScheduleListPolling");

    cy.wait(61000); //polling 주기 대기
    cy.wait("@getScheduleListPolling");

    cy.get("[data-testid='schedule-list-item']").should("exist");
    cy.get("[data-testid='schedule-list-item']")
      .first()
      .should("contain.text", "경로 #22");
  });

  it("수동 새로고침 버튼 클릭시 새로운 데이터로 리스트가 갱신된다", () => {
    // 신규 요청: 새로운 데이터
    cy.intercept("GET", `${API_BASE}/path/scroll*`, {
      fixture: "scheduleNewList.json",
    }).as("getScheduleListPolling");

    cy.wait(1000); //화면 그려지는 주기 대기
    cy.get("[data-testid='refetch-btn']").click();
    cy.wait("@getScheduleListPolling");
    cy.get("[data-testid='schedule-list-item']").should("exist");
    cy.get("[data-testid='schedule-list-item']")
      .first()
      .should("contain.text", "경로 #22");
  });
});
