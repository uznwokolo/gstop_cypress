/// <reference types="cypress" />

describe("Testing Employee Manager v2...", () => {
    
    it("should launch Employee Manager v2", () => {
        // Navigate to the website
        cy.visit("https://devmountain-qa.github.io/employee-manager-v2/build/index.html")
        // Check if the title exists and is correct
        cy.get('.titleText', {timeout:2000}).should('exist').contains('Employee Manager')
    })
    it("should have relevant UI elements displayed", () => {
        // Assert that the employee list is on the page
        cy.get('ul.listContainer', {timeout:10000}).should('exist')
        // Assert that the search input is on the page
        cy.get('[name="searchEmployee"]', {timeout:3000}).should('exist')
        // Assert that the add employee link is on the page
        cy.get('[name="addEmployee"]', {timeout:3000}).should('exist')
    })
    it("should be able to add a new employee", () => {
        // Click Add Employee link
        cy.get('[name="addEmployee"]').click()
        // Click New Employee
        cy.contains('New Employee').click()
        // Clear name input and type a name
        cy.get('[name="nameEntry"]').clear().type('Harald Skjall')
        // Clear phone input and type a phone number
        cy.get('[name="phoneEntry"]').clear().type('5427890061')
        // Clear email input and type an email address
        cy.get('[name="emailEntry"]').clear().type('H.Skjall@gmail.com')
        // Clear title input and type a job title
        cy.get('[name="titleEntry"]').clear().type('Product Manager')
        // Click the save button
        cy.get('#saveBtn').click()
        // Assert that the newly added employee appears in employee list
        cy.get('.listContainer').contains('Harald Skjall').should('exist')
    })
    it("should be able to display employee info", () => {
        // Click an employee to display info
        cy.contains('Darth Vadar').click()
        // Take a screenshot
        cy.screenshot("DVadar")
        // Click an employee to display info
        cy.contains('Harald Skjall').click()
        // Take a screenshot
        cy.screenshot("HSkjall")
    })
    it("should be able to delete an employee", () => {
        // Click an employee to display info
        cy.get('li').contains('Harald Skjall').click()
        // Click Delete button
        cy.get('[name="delete"]').click()
        // Assert that the correct window prompt appears
        cy.on('window:alert', (str) => {
            expect(str).to.equal('You are removing the employee record:')
        })
        // Click OK on the prompt
        cy.on('window:confirm', () => true);
        // Assert that the deleted employee is no longer in the list
        cy.get('.listContainer').contains('Harald Skjall').should('not.exist')
    })
    
})