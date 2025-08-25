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

describe("카카오맵 Marker 테스트", () => {
  beforeEach(() => {
    interceptAll();
    cy.visit("/admin/book/schedule");
    cy.wait("@getScheduleList");
    cy.wait("@getPassengerList");
    cy.wait("@getNodeList");

    cy.wait(1000); // SDK 로딩 대기
  });

  it("초기 Marker가 렌더링된다", () => {
    cy.get("img[title*='marker-start']").should("have.length.at.least", 1);
    cy.get("img[title*='marker-end']").should("have.length.at.least", 1);
    cy.get("img[title*='marker-middle']").should("have.length.at.least", 1);
  });
});

describe("카카오맵 Highlight 테스트", () => {
  beforeEach(() => {
    interceptAll();
    cy.visit("/admin/book/schedule");
    cy.wait("@getScheduleList");
    cy.wait("@getPassengerList");
    cy.wait("@getNodeList");
    cy.wait(1000); // SDK 로딩 대기
  });

  it("탑승자 경로 보기 버튼 클릭 시 승차-탑승 Marker가 갱신된다", () => {
    cy.get("div[data-testid='passenger-btn']").click();
    cy.get("li[data-testid='passenger-highlight-btn']").first().click();
    cy.get("img[title*='marker-enter']").should("exist");
    cy.get("img[title*='marker-out']").should("exist");
  });

  it("탑승자 경로 보기 버튼 클릭 시 승차 위치에 InfoWindow가 렌더링된다", () => {
    cy.get("div[data-testid='passenger-btn']").click();
    cy.get("li[data-testid='passenger-highlight-btn']").first().click();
    cy.get("[data-testid='map-infowindow']").should("exist");
  });

  it("마커 클릭 시 승차-탑승 Marker가 갱신된다", () => {
    cy.get("img[title*='marker-middle']").first().click();
    cy.get("img[title*='marker-enter']").should("exist");
    cy.get("img[title*='marker-out']").should("exist");
  });

  it("마커 클릭 시 승차 위치에 InfoWindow가 렌더링된다", () => {
    cy.get("img[title*='marker-middle']").first().click();
    cy.get("[data-testid='map-infowindow']").should("exist");
  });
});
