Feature: CMS pages

   Feature Description

    #    @ci @magento
    Scenario: CreateCmsPageEntity
        Given I log in as admin with 123123q password
        And Navigate to Content > Elements > Pages
        And Start to create new CMS Page
        And Fill out fields data according to data set
        When Save CMS Page
        Then Page should be visible in table
        And Page url should be reachable

        @ci @magento
    Scenario: Cms Page Mass Action
        Given Admin creates 2 new cms pages
        When Admin perform mass disable action on the newly created pages
        Then New pagees should have disabled status