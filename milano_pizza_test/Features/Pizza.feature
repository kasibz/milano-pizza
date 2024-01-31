Feature: MilanoPizza Login

  Scenario: Login Dialog box on Home Page
    Given User launch chrome browser
    When User open localhost URL "http://localhost:5173/"
    Then User verify the login box in on page
    And close browser


  Scenario: Successful Login with Valid Credentials
    Given User launch chrome browser
    When User open localhost URL "http://localhost:5173/"
    And User enters Id as "1" and password as "admin"
    And Click on Login
    Then LoggedIn text on nav should be "Logged in as: admin admin"
    When User clicks on Log out link
    Then Page should say "Are you sure you want to log out?"
    When User clicks on Yes
    Then HomePage should say "Employee Login"
    And close browser