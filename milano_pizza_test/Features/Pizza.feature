Feature: MilanoPizza Login

  Scenario: Login Dialog box on Home Page
    Given I launch chrome browser
    When I open localhost
    Then I verify the login box in on page
    And close browser
