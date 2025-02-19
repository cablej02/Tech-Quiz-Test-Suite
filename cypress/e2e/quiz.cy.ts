describe('Quiz E2E', () => {
    // load the home page before each test
    beforeEach(() => {
        cy.visit('/')
    })

    it('on start game, should get questions from database and render first question', () => {
        // intercept the GET request to /api/questions/random
        cy.intercept("GET", '/api/questions/random').as("getQuestions");

        //click start quiz button
        cy.contains("button", "Start Quiz").click()

        // wait for the GET request to /api/questions/random to complete
        cy.wait("@getQuestions").then((interception) => {
            expect(interception.response).to.not.be.undefined;
            expect(interception.response!.body).to.be.an("array").and.not.be.empty

            if (interception.response) {
                const firstQuestion = interception.response.body[0]
                expect(firstQuestion).to.have.property("question").and.not.be.empty
                expect(firstQuestion).to.have.property("answers").and.be.an("array").and.not.be.empty

                // check if the first question is rendered
                cy.contains("h2", firstQuestion.question, {timeout: 3000}).should("be.visible");
            }else{
                throw new Error("interception.response is undefined or null");
            }
        })
    })
})