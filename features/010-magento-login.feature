Feature: Magento Login

    @ci @magento @magento-login
    Scenario: Admin login success
        When I log in as admin with correct data
        Then I should login successfully

    @ci @magento @magento-login
    Scenario: Admin login error
        When I log in as admin with incorrect data
        Then I shouldn't login successfully

