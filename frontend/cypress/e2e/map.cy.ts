describe("카카오맵 Marker 테스트", () => {
  beforeEach(() => {
    cy.visit("/admin/book/schedule"); // 지도가 있는 페이지
    cy.wait(1000); // SDK 로딩 대기
  });

  it("초기 Marker 렌더링 확인", () => {
    cy.get("img[src*='marker-start']").should("have.length.at.least", 1);
    cy.get("img[src*='marker-end']").should("have.length.at.least", 1);
  });

  it("Highlight 클릭 시 승차-탑승 Marker 갱신", () => {
    cy.get("div[data-testid='passenger-btn']").click();
    cy.get("li[data-testid='passenger-highlight-btn']").first().click();
    cy.get("img[src*='marker-enter.svg']").should("exist");
    cy.get("img[src*='marker-out.svg']").should("exist");
  });
});
