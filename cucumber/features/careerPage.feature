Feature: EPAM job searching
  As a Job searcher
  I want to browser through EPAM Job offers by various criteria
  So I can find to best fitting offer for me

  Scenario: Search for a job
    Given the EPAM Careers page is opened
    Then the EPAM Careers page should be opened
    When acceptance of Cookies
    And the Search form should be visidle

    When the Location filter box is clicked
    And the country "Hungary" is selected
    And the city "Debrecen" of the country "Hungary" is selected
    Then the selected location should be "Debrecen"
