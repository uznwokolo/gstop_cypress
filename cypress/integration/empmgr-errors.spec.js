/// <reference types="cypress" />

describe("Testing error messages and indicators...", () => {
    before(() => {
        // Navigate to the website
        cy.visit("https://devmountain-qa.github.io/employee-manager-v2/build/index.html")
        // Check if the title exists and is correct
        cy.get('.titleText', {timeout:2000}).should('exist').contains('Employee Manager')
        // Assert that the UI elements are on the page
        cy.get('ul.listContainer', {timeout:10000}).should('exist')
        cy.get('[name="searchEmployee"]', {timeout:3000}).should('exist')
        cy.get('[name="addEmployee"]', {timeout:3000}).should('exist')
    })
    after(() => {
        // Click an employee to display info
        cy.get('li').contains('Kylie Verdes').click()
        // Click Delete button
        cy.get('[name="delete"]').click()
        // Assert that the correct window prompt appears
        cy.on('window:alert', (str) => {
            expect(str).to.equal('You are removing the employee record:')
        })
        // Click OK on the prompt
        cy.on('window:confirm', () => true);
        // Assert that the deleted employee is no longer in the list
        cy.get('.listContainer').contains('Kylie Verdes').should('not.exist')
    })
    it("should add a test employee", () => {
        // add a new employee
        cy.get('[name="addEmployee"]').click()
        cy.contains('New Employee').click()
        // Fill in test employee details
        cy.get('[name="nameEntry"]').clear().type('Kylie Verdes')
        cy.get('[name="phoneEntry"]').clear().type('2069104457')
        cy.get('[name="emailEntry"]').clear().type('kylieverdes@bucket.com')
        cy.get('[name="titleEntry"]').clear().type('Business Analyst')
        // Click the save button
        cy.get('#saveBtn').click()
        // Assert that the newly added employee appears in employee list
        cy.get('.listContainer').contains('Kylie Verdes').should('exist')
    })
    it("should show errors if name field is blank", () => {
        // Click an employee to display info
        cy.get('li').contains('Kylie Verdes').click()
        // Clear name input
        cy.get('[name="nameEntry"]').clear()
        // Click Save button
        cy.get('#saveBtn').click()
        // Assert that name input is underlined with a red line
        cy.get('[name="nameEntry"]').should('have.css', 'border-bottom', '2px solid rgb(204, 0, 0)')
        // Assert that errorCard element is visible
        cy.get('div.errorCard').should('be.visible')
        // Assert that error message has the correct text
        cy.get('span.errorMessage').should('contain.text', 'The name field must be between 1 and 30 characters long.')
    })
    it("should hide name error indicators and messages after page refresh", () => {
        // Refresh the page
        cy.reload()
        // Assert that the errorCard element does not exist
        cy.get('div.errorCard').should('not.exist')
        // Click an employee to display info
        cy.get('li').contains('Kylie Verdes').click()
        // Assert that name input is underlined with a red line
        cy.get('[name="nameEntry"]').should('not.have.css', 'border-bottom', '2px solid rgb(204, 0, 0)')
    })
    it("should show errors if phone field are blank", () => {
        // Click an employee to display info
        cy.get('li').contains('Kylie Verdes').click()
        // Clear all inputs
        cy.get('[name="phoneEntry"]').clear()
        // Click Save button
        cy.get('#saveBtn').click()
        // Assert that phone input is underlined with a red line
        cy.get('[name="phoneEntry"]').should('have.css', 'border-bottom', '2px solid rgb(204, 0, 0)')
        // Assert that errorCard element is visible
        cy.get('div.errorCard').should('be.visible')
        // Assert that error message has the correct text
        cy.get('span.errorMessage').should('contain.text', 'The phone number must be 10 digits long.')
    })
    it("should hide phone error indicators and messages after page refresh", () => {
        // Refresh the page
        cy.reload()
        // Assert that the errorCard element does not exist
        cy.get('div.errorCard').should('not.exist')
        // Click an employee to display info
        cy.get('li').contains('Kylie Verdes').click()
        // Assert that phone input is underlined with a red line
        cy.get('[name="phoneEntry"]').should('not.have.css', 'border-bottom', '2px solid rgb(204, 0, 0)')
    })
    it("should show errors if email field are blank", () => {
        // Click an employee to display info
        cy.get('li').contains('Kylie Verdes').click()
        // Clear email input
        cy.get('[name="emailEntry"]').clear()
        // Click Save button
        cy.get('#saveBtn').click()
        // Assert that name input is underlined with a red line
        cy.get('[name="emailEntry"]').should('have.css', 'border-bottom', '2px solid rgb(204, 0, 0)')
        // Assert that errorCard element is visible
        cy.get('div.errorCard').should('be.visible')
        // Assert that error message has the correct text
        cy.get('span.errorMessage').should('contain.text', 'The email field must be between 1 and 30 characters long.')
    })
    it("should hide email error indicators and messages after page refresh", () => {
        // Refresh the page
        cy.reload()
        // Assert that the errorCard element does not exist
        cy.get('div.errorCard').should('not.exist')
        // Click an employee to display info
        cy.get('li').contains('Kylie Verdes').click()
        // Assert that email input is underlined with a red line
        cy.get('[name="emailEntry"]').should('not.have.css', 'border-bottom', '2px solid rgb(204, 0, 0)')
    })
    it("should show errors if title field is blank", () => {
        // Click an employee to display info
        cy.get('li').contains('Kylie Verdes').click()
        // Clear title input
        cy.get('[name="titleEntry"]').clear()
        // Click Save button
        cy.get('#saveBtn').click()
        // Assert that name input is underlined with a red line
        cy.get('[name="titleEntry"]').should('have.css', 'border-bottom', '2px solid rgb(204, 0, 0)')
        // Assert that errorCard element is visible
        cy.get('div.errorCard').should('be.visible')
        // Assert that error message has the correct text
        cy.get('span.errorMessage').should('contain.text', 'The title field must be between 1 and 30 characters long.')
    })
    it("should hide title error indicators and messages after page refresh", () => {
        // Refresh the page
        cy.reload()
        // Assert that the errorCard element does not exist
        cy.get('div.errorCard').should('not.exist')
        // Click an employee to display info
        cy.get('li').contains('Kylie Verdes').click()
         // Assert that title input is underlined with a red line
         cy.get('[name="titleEntry"]').should('not.have.css', 'border-bottom', '2px solid rgb(204, 0, 0)')
    })
})