// write a test to test if page is loading
describe("Test if page is loading", () => {
  it("should load the page", () => {
    cy.visit("http://localhost:3000");
  });
});

// test if login <Link href="/api/auth/signin">Login</Link> is working
describe("Test if login link is working", () => {
  it("should load the login page", () => {
    cy.visit("http://localhost:3000");
    cy.get("a").contains("Login").click();
  });
});

// on http://localhost:3000/api/auth/signin page Sign in with GitHub button should be visible
describe("Test if Sign in with GitHub button is visible", () => {
  it("should load the login page", () => {
    cy.visit("http://localhost:3000/api/auth/signin");
    cy.get("button").contains("Sign in with GitHub");
  });
});
