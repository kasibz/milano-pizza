package com.ted.milanopizza.cucumber.stepdefinition;


import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;
import org.junit.Assert;

public class AddCustomerSteps extends BaseSteps {

    @And("User enters phone number and address")
    public void user_enters_phone_number_and_address() {
        hp.setPhoneNumber(generatePhoneNumber());
        hp.setAddress(generateAddress());
    }

    @And("User clicks on zipcode dropdown")
    public void user_clicks_on_zipcode_dropdown() {
        hp.clickZipcodeDropdwon();
    }

    @And("Selects {string}")
    public void selects_(String zipcode) {
        hp.selectZipcode(zipcode);
    }

    @And("Click on Customer Submit")
    public void click_on_customer_submit() throws InterruptedException {
        hp.clickSubmitCustomer();
        Thread.sleep(500);
    }

    @Then("HomePage alert shows {string}")
    public void homepage_alert_shows_(String registerCustomerMsg) {
        Assert.assertEquals(hp.getRegisterCustomerAlert(), registerCustomerMsg);
    }

}
