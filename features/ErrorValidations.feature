Feature: Ecommerce validations
    @Validation
    @Foo
    Scenario: Placing the Order
        Given A login to Ecommerce2 application with "anshika@gmail.com" and "Iamking@000"
        Then Verify Error message is displayed