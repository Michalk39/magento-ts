Feature: Create User Role

   Feature Description

   @ci @magento
   Scenario: Create Admin User Role
        Given I log in as admin with 123123q password
        And Navigate to System > Permissions > User Roles
        And Press Add New Role button
        And Fill in all data according to data set
        When Click save role
        Then New Role should be created