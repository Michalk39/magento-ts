Feature: New Customer Register

   Feature Description

    @ci @magento
   Scenario Outline: New Customer Password Complexity Test
        Given I am on register page
        When I enter password <password>
        Then The message should be <message>

    Examples:
    | password | message |
    | 123123   | Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored. |
    | 123123qa | Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters. |
    | 123123qA |         |
