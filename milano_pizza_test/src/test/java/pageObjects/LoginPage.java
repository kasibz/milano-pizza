package pageObjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
//Page Object Model
public class LoginPage {
    public WebDriver ldriver;

    // construct loginPage and make driver available to entire class
    public LoginPage(WebDriver rdriver) {
        ldriver = rdriver;
        PageFactory.initElements(rdriver, this);
        // pg initializaes elements w/ webdriver
    }

    // selecting Webelements by PageFactory Annotations in Selenium
    @FindBy(id = "employeeID")
    @CacheLookup
    WebElement txtEmployeeId;

    @FindBy(id = "password")
    @CacheLookup
    WebElement txtEmployeePass;

    @FindBy(className = "btn-primary")
    @CacheLookup
    WebElement btnLogin;

    @FindBy(className = "mt-4")
    @CacheLookup
    WebElement divLoginForm;

    // Action methods
    public void setEmployeeId(String id) {
        txtEmployeeId.clear();
        txtEmployeeId.sendKeys(id);
    }

    public void setEmployeePass(String pass) {
        txtEmployeePass.clear();
        txtEmployeePass.sendKeys(pass);
    }

    public void clickLogin() {
        btnLogin.click();
    }

}
