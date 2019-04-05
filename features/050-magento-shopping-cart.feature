Feature: Shopping Cart

   Feature Description

   @ci @magento
   Scenario: Validate Email On Checkout
      Given User have non-empty shopping cart
      When He provides an incorrect email address in e-mail field
      Then He should see error message with invalid message information
