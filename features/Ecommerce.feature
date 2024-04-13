Feature: Ecommerce validations

    Scenario: Placing the Order
        Given A login to Ecommerce application with "anshika@gmail.com" and "Iamking@000"
        When Add "zara coat 3" to Cart
        Then Verify "zara coat 3" is displayed in the Cart
        When Enter valid details and Place the order
        Then Verify order is present in the OrderHistory
