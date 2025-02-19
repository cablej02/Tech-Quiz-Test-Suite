// import React from "react";
import Quiz from "../../client/src/components/Quiz";

describe("<Quiz />", () => {
    // run this code before each test
    beforeEach(() => {
        // intercept the GET request to /api/questions and respond with the questions.json fixture
        cy.intercept("GET", '/api/questions', { fixture: "questions.json" }).as("getQuestions"); 
        // mount the Quiz component
        cy.mount(<Quiz />);
    });

    it("should render the start button", () => {
        cy.contains("button","Start Quiz").should("be.visible");
    })

    it("should start the quiz on button click", () => {
        cy.contains("button","Start Quiz").click();
        cy.contains("button","Start Quiz").should("not.exist");

        // wait for the GET request to /api/questions to complete
        cy.wait("@getQuestions");

        // loading text should not be visible after the questions are loaded
        cy.contains("Loading...").should("not.exist");

        // check if the first question is rendered
        cy.get("h2").should("exist");
    })
});