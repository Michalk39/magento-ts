Feature: Create User Role

   Feature Description

    # @ci @magento
    Scenario: Create Admin User Role
        Given I log in as admin with 123123q password
        When User add New Role in User Roles page
        Then New Role should be created

    # @ci @magento
    Scenario: Https Headers Disable Test
        Given I log in as admin with 123123q password
        When Admin save selected settings
        Then Configuration should be saved