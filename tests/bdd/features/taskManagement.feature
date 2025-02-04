Feature: Task Management
  Scenario: Add a task successfully when logged in
    Given I am logged in as "test@example.com"
    When I add a new task titled "New Task"
    Then the task should be added successfully
