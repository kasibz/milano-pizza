Feature: MilanoPizza Login

  Scenario: Login Dialog box on Home Page
    Given User launch chrome browser
    When User open localhost URL "http://localhost:5173/"
    Then User verify the login box in on page
    And close browser


  Scenario: Successful Login with Valid Credentials
    Given User launch chrome browser
    When User open localhost URL "http://localhost:5173/"
    And User enters Id as "1" and password as "Abdullah"
    And Click on Login
    Then LoggedIn text on nav should be "Logged in as: Kasib Abdullah"
    When User clicks on Log out link
    Then Page should say "Are you sure you want to log out?"
    When User clicks on Yes
    Then HomePage should say "Employee Login"
    And close browser

#    scenario outline will run with multiple variables like different users
  Scenario Outline: Login with Multiple valid accounts
    Given User launch chrome browser
    When User open localhost URL "http://localhost:5173/"
    And User enters Id as "<id>" and password as "<lastName>"
    And Click on Login
    Then LoggedIn text on nav should be "Logged in as: <firstName> <lastName>"
    When User clicks on Log out link
    Then Page should say "Are you sure you want to log out?"
    When User clicks on Yes
    Then HomePage should say "Employee Login"
    And close browser

    Examples:
      | id | firstName | lastName |
      | 1 | Kasib | Abdullah |
      | 2 | Junhan | An |