Feature: User Registration
  Scenario: Register a user with valid information
    Given the registration page is open
    When I enter "test@example.com" as email and "password123" as password
    And I submit the registration form
    Then I should see "User registered successfully"