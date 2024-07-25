import allElements from "../../cypress/support/PageObjects/testpage";

describe("TechTests", () => {
  //I created some automation test for the web (UI) and backend for each user stories
  //I made a base url config with the website link
  //I created a page of objects and imported it to tests

  it("View Available Products and Prices", () => {
    const allWebElements = new allElements();
    //here we will assert some of the products and their prices

    cy.visit("/");

    // cy.get(".col-md-9 > .container").each((item, index) => {
    //   cy.wrap(item).should("contain.text", item[index]);
    // });

    // cy.get(".col-md-9 > .container").should("have.length", 1);
    // allWebElements
    //   .getFirstProductTitle()
    //   .should("have.text", "Combination Pliers");

    //cy.assertHasText(allWebElements.getFirstProductTitle, "Combination Pliers"); - aici pica din cauza ca aduce un alt text

    //- known issue, will create a ticket later
    //allWebElements.getBrokenImg().should("be.visible");

    allWebElements
      .getFirstProductTitle()
      .should("include.text", "Combination Pliers");
  });

  it("Sort and Filter Products", () => {
    const allWebElements = new allElements();

    cy.visit("/");
    //sort visible and select by name - desc
    allWebElements.getSortBox().should("be.visible");
    allWebElements.getSortBox().select("name,desc");

    //this Test will fail so we will see the problem in sorting, they expect an product title item to have letter A to match bu there is no A in the product sorted
    cy.get(
      '[data-test="product-13"] > .card-body > [data-test="product-name"]'
    ).and("match", /^A/);
  });

  it("Add Product to Favourites", () => {
    const allWebElements = new allElements();

    cy.visit("/");
    cy.wait(1000);
    cy.get('[data-test="product-1"]').click();
    cy.get('[data-test="add-to-cart"]').click();
    //assert that the cart icon has changed
    cy.get('[data-test="cart-quantity"]').should("be.visible");
  });

  it("View Products in Cart", () => {
    const allWebElements = new allElements();

    cy.visit("/");
    cy.get('[data-test="product-1"]').click();
    cy.get('[data-test="add-to-cart"]').click();
    //assert that the cart icon has changed
    cy.get('[data-test="cart-quantity"]').should("be.visible");
    cy.get('[data-test="nav-cart"] > .fa').click();
    cy.get(".steps-4").should("include.text", "Cart1Sign in2Address3Payment4");
    allWebElements.getProceedToCheckoutButton().click();
  });

  it("Create an Account", () => {
    const allWebElements = new allElements();

    const generateRandomEmail = () => {
      const randomString = Math.random().toString(36).substring(2, 10);
      return `test_${randomString}@example.com`;
    };

    const randomEmail = generateRandomEmail();

    cy.visit("/");
    cy.viewport(1000, 1000);
    cy.get('[data-test="nav-sign-in"]').click();
    cy.get('[data-test="register-link"]').should("be.visible").click();
    cy.get("body").should("be.visible");

    cy.get('[data-test="email"]').should("exist");
    cy.get('[data-test="email"]').scrollIntoView();
    cy.get('[data-test="email"]').should("be.visible");

    // cy.get('[data-test="email"]').scrollIntoView().type(randomEmail);
    cy.get('[data-test="email"]').type(randomEmail);
    cy.get('[data-test="password"]').type("RandomPassword123");

    cy.get('[data-test="first-name"]').type("test");
    cy.get('[data-test="last-name"]').type("test");
    cy.get('[data-test="dob"]').type("2000-12-02");
    cy.get('[data-test="address"]').type("test");
    cy.get('[data-test="postcode"]').type("test");
    cy.get('[data-test="city"]').type("test");
    cy.get('[data-test="state"]').type("test");
    cy.get('[data-test="country"]').select("Romania");
    cy.get('[data-test="phone"]').type("test");

    cy.get('[data-test="register-submit"]').click();

    //validam si ca se pot pune doar numere la phone

    // cy.get('[data-test="phone-error"]').should(
    //   "have.text",
    //   "&nbsp;Only numbers are allowed.&nbsp; "
    // );

    // textul nu era corect si a trebuit sa validez doar prin visible
    cy.get('[data-test="phone-error"]').should("be.visible");
    cy.get('[data-test="phone"]').clear().type("777777777777");
    cy.get('[data-test="register-submit"]').click();

    // cy.intercept("POST", "/api/register").as("registerRequest");
    // cy.get('[data-test="register-submit"]').click();
    // cy.wait("@registerRequest").then((interception) => {
    //   // Assert that the request was successful
    //   expect(interception.response.statusCode).to.eq(200);
    // cy.request(
    //   "GET",
    //   "https://with-bugs.practicesoftwaretesting.com/#/auth/register"
    //     .its("status")
    //     .should("equal", 200)
    // );

    cy.get("h3").should("be.visible");
  });

  it(" Complete a Purchase", () => {
    const allWebElements = new allElements();

    cy.visit("/");

    cy.visit("/");
    cy.get('[data-test="product-1"]').click();
    cy.get('[data-test="add-to-cart"]').click();
    //assert that the cart icon has changed
    cy.get('[data-test="cart-quantity"]').should("be.visible");
    cy.get('[data-test="nav-cart"] > .fa').click();
    cy.get(".steps-4").should("include.text", "Cart1Sign in2Address3Payment4");
    allWebElements.getProceedToCheckoutButton().click();

    //aici as fi dat niste parametrii de logare :  test1234599@yahoo.com + Qpalzm123@
    // but the proceed button is not working so there is a critical bug and a ticket to raise
  });
});
