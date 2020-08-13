describe("Test form inpusts", function () {
    beforeEach(function () {
        cy.visit("http://localhost:3000");
    });
    it("Form works correctly with valid input", function () {
        cy.get('[data-cy="name"]').type('Natalia').should("have.value", "Natalia");
        cy.get('[data-cy="email"]').type('mila@mail.ru').should("have.value", "mila@mail.ru");
        cy.get('[data-cy="password"]').type('password').should("have.value", "password");
        cy.get('[type="checkbox"]').check().should("be.checked");
        cy.get('form').submit();
        cy.get('h2').should("contain", "Natalia");
        cy.get('h4').should("contain", "mila@mail.ru");
    })
    it("Getting error messages when input invalid", function () {
        cy.get('[data-cy="name"]').type('Natalia');
        cy.get('[data-cy="name"]').clear();
        cy.get('p').should("contain", "Must include user name");
        cy.get('[data-cy="email"]').type('milamail.ru');
        cy.get('p').should("contain", "Must be a valid email address.");
        cy.get('[data-cy="password"]').type('pass');
        cy.get('p').should("contain", "Passwords must be 8 characters long");
        cy.get('[type="checkbox"]').check().should("be.checked");
        cy.get('[type="checkbox"]').uncheck();
        cy.get('p').should("contain", "Must accept Terms and Conditions");
        cy.get('[data-cy="submit-button"]').should('be.disabled')
    })
})