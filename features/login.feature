Feature:Login functionality

Scenario: Successful login using email 
    Given Open the login page
    When I enter valid credentials
    Then click the login button

Scenario: Login and write a note followed by a logout
    Then I should write a note
    Then I should logout

Scenario: Login again and make sure to open the note created in scenario 2
    Then I should log in again
    Then I should open the note created 
    Then I should delete the note created
    Then I should log out again

Scenario: Unsuccessful login using email
    Then I should not log in with a correct email and incorrect password
