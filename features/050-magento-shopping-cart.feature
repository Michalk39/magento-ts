Feature: Shopping Cart

   Feature Description

    @ci @magento
   Scenario: Validate Email On Checkout
        Given Shopping cart isn't empty
        And Enter incorrect email
        When Try go to next step
        Then Invalid email error message should be visible