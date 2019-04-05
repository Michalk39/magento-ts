Feature: Magento Customer Groups

    Feature Description

    @ci @magento @current
    Scenario: VerifyDisabledCustomerGroupFieldTest
        Given I log in as admin with correct data
        And Navigate to Customers > Customer Groups
        When Select system Customer Group specified in data set from grid
        Then Group Name field text is NOT LOGGED IN
        And Group Name field is disabled