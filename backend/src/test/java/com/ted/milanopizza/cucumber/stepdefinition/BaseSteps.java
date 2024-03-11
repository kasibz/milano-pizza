package com.ted.milanopizza.cucumber.stepdefinition;

import com.ted.milanopizza.cucumber.page.HomePage;
import com.ted.milanopizza.cucumber.page.LoginPage;
import org.apache.commons.lang3.RandomStringUtils;
import org.openqa.selenium.WebDriver;

// each scenario starts with logging in
public class BaseSteps {
    public static WebDriver driver;
    public static LoginPage lp;
    public static HomePage hp;


    public static String generateAddress() {
        String streetNumber = RandomStringUtils.randomNumeric(3);
        String streetName = RandomStringUtils.randomAlphabetic(5);
        return String.format("%s %s", streetNumber, streetName);
    }

    public static String generatePhoneNumber() {
        return RandomStringUtils.randomNumeric(9);
    }

    // random zipcode?

}