Feature: Shopping Cart

   Feature Description

    @ci @magento
   Scenario: Validate Email On Checkout
        Given Shopping cart isn't empty
        And Enter incorrect email
        When Try go next step
        Then Invalid email message should be visible
        And Page should not go to next step