Feature: 030 - Magento Login
    
    @ci @magento
    Scenario: Admin login success
        When I enter correct data
        Then I should login successfully

    Scenario: Admin login failed
        When I enter incorrect data
        Then I shouldn't login successfully