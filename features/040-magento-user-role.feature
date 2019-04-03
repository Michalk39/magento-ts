Feature: Create User Role

    Feature Description

    @ci @magento
    Scenario: Create Admin User Role
        Given I log in as admin with correct data
        When User add New Role in User Roles page
        Then New Role should be created
