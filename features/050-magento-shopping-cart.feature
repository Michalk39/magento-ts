Feature: Shopping Cart

   Feature Description

   #  @ci @magento
   Scenario: Validate Email On Checkout
        Given Shopping cart isn't empty
        When Enter incorrect email
        Then Invalid email error message should be visible