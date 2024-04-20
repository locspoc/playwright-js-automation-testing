Feature: Ecommerce validations
    @Regression
    Scenario: Placing the Order
        Given A login to Ecommerce application with "anshika@gmail.com" and "Iamking@000"
        When Add "ZARA COAT 3" to Cart
        Then Verify "ZARA COAT 3" is displayed in the Cart
        When Enter valid details and Place the Order
        Then Verify order is present in the OrderHistory
