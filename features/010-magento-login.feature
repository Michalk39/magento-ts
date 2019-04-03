Feature: Magento Login

    @ci @magento
    Scenario: Admin login success
        When I log in as admin with 123123q password
        Then I should login successfully

    @ci @magento
    Scenario: Admin login error
        When I log in as admin with xxx password
        Then I shouldn't login successfully

