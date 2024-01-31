package pageObjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class LoginPage {
    public WebDriver ldriver;

    public LoginPage(WebDriver rdriver) {
        ldriver = rdriver;
        PageFactory.initElements(rdriver, this);
    }

//    WebElement idInput = driver.findElement(By.id("employeeID"));
//    WebElement passInput = driver.findElement(By.id("password"));
//
//    // no compound  classNames
//    WebElement submit = driver.findElement(By.className("btn-primary"));
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
