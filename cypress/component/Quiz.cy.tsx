// import React from "react";
import Quiz from "../../client/src/components/Quiz";

describe("<Quiz />", () => {
    // run this code before each test
    beforeEach(() => {
        // intercept the GET request to /api/questions and respond with the questions.json fixture
        cy.intercept("GET", '/api/questions/random', { fixture: "questions.json" }).as("getQuestions"); 

        // mount the Quiz component
        cy.mount(<Quiz />);
    });

    it("should render the start button", () => {
        cy.contains("button","Start Quiz").should("be.visible");
    })

    it("should start the quiz on button click", () => {
        cy.contains("button","Start Quiz").click();

        // wait for the GET request to /api/questions to complete
        cy.wait("@getQuestions");

        // check if the first question is rendered
        cy.contains("h2", "Test question 1").should("be.visible");
    })

    it("should show the next question after answering the current question", () => {
        cy.contains("button","Start Quiz").click();
        cy.wait("@getQuestions");

        // check if the first question is rendered
        cy.contains("h2", "Test question 1").should("be.visible");

        // click the correct answer
        cy.contains("correct").prev("button").click();

        // check if the next question is rendered
        cy.contains("h2", "Test question 2").should("be.visible");
    });
});