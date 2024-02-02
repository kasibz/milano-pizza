package stepDefinitions;

import org.openqa.selenium.WebDriver;
import pageObjects.HomePage;
import pageObjects.LoginPage;

// each scenario starts with logging in
public class BaseSteps {
    public WebDriver driver;
    public LoginPage lp;
    public HomePage hp;
}
