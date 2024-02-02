Feature: Customers

  Scenario: Add a new Customer
    Given User launch chrome browser
    When User open localhost URL "http://localhost:5173/"
    And User enters Id as "1" and password as "Abdullah"
    And Click on Login
    Then User can view Dashboard
    And User enters Phone Number as "123456789" and address as "709 Connell Drive"
    And User clicks on zipcode dropdown
    And Selects "55501"
    And Click on Customer Submit
    Then HomePage alert shows "New Customer Entered! Starting order..."
    And close browser

