package stepDefinitions;

import org.apache.commons.lang3.RandomStringUtils;
import org.openqa.selenium.WebDriver;
import pageObjects.HomePage;
import pageObjects.LoginPage;

// each scenario starts with logging in
public class BaseSteps {
    public WebDriver driver;
    public LoginPage lp;
    public HomePage hp;


    public static String generateAddress() {
        String streetNumber = RandomStringUtils.randomNumeric(3);
        String streetName = RandomStringUtils.randomAlphabetic(5);
        return String.format("%s %s", streetNumber, streetName);
    }

    public static String generatePhoneNumber() {
        return RandomStringUtils.randomNumeric(10);
    }

}
