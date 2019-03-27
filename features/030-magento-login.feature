Feature: 030 - Magento Login
    
    @ci @magento
    Scenario: Admin login success
        When I log in as admin with 123123q password
        Then I should login successfully

    @ci @magento
    Scenario: Admin login error
        When I log in as admin with xxx password
        Then I shouldn't login successfully

    @ci @magento
    Scenario: VerifyDisabledCustomerGroupFieldTest
        Given I log in as admin with 123123q password
        And Navigate to Customers > Customer Groups
        When Select system Customer Group specified in data set from grid
        Then Group Name field text is NOT LOGGED IN
        And Group Name field is disabled

    @ci @magento
    Scenario: CreateCmsPageEntity
        Given I log in as admin with 123123q password
        And Navigate to Content > Elements > Pages
        And Start to create new CMS Page
        And Fill out fields data according to data set
        When Save CMS Page
        Then Page should be visible in table
        And Page url should be reachable
