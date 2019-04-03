Feature: Magento Https

    Feature Description

    @ci @magento
    Scenario: Https Headers Disable Test
        Given I log in as admin with correct data
        When Admin save selected settings
        Then Configuration should be saved