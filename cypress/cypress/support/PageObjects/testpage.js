class allElements {
  getBrokenImg() {
    return cy.get(".navbar-brand > img");
  }

  getFirstProductTitle() {
    return cy.get(
      '[data-test="product-1"] > .card-body > [data-test="product-name"]'
    );
  }

  getSortBox() {
    return cy.get('[data-test="sort"]');
  }

  getFirstElementNameAfterSort() {
    return cy.get(
      '[data-test="product-13"] > .card-body > [data-test="product-name"]'
    );
  }
  getProceedToCheckoutButton() {
    return cy.get('[data-test="proceed-1"]');
  }
}
export default allElements;
