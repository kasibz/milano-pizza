package pageObjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;

public class HomePage {
    public WebDriver ldriver;

    public HomePage(WebDriver rdriver) {
        ldriver = rdriver;
        PageFactory.initElements(rdriver, this);
    }

//    @FindBy(xpath = "//a[@href='/logout']")
//    @CacheLookup
//    WebElement linkLogout;

    // finding webelements by locator
    By linkLogout = By.xpath("//a[@href='/logout']");
    By txtCustomerPhoneNumber = By.id("telephoneID");
    By txtCustomerAddress = By.id("address");
    By selectZipcode = By.id("zip_code");
    By option55501 = By.xpath("//option[@value='55501']");
    By option55502 = By.xpath("//option[@value='55502']");
    By option55503 = By.xpath("//option[@value='55503']");
    By option55504 = By.xpath("//option[@value='55504']");
    By btnSubmit = By.xpath("//input[@type='submit']");
    By txtRegisterCustomerSuccess = By.xpath("//div[text()='New Customer Entered! Starting order...']");

    // Action methods
    public void clickLogout() {
        ldriver.findElement(linkLogout).click();
    }

    public void setPhoneNumber(String phoneNumber) {
        ldriver.findElement(txtCustomerPhoneNumber).clear();
        ldriver.findElement(txtCustomerPhoneNumber).sendKeys(phoneNumber);
    }

    public void setAddress(String address) {
        ldriver.findElement(txtCustomerAddress).clear();
        ldriver.findElement(txtCustomerAddress).sendKeys(address);
    }

    public void clickZipcodeDropdwon() {
        ldriver.findElement(selectZipcode).click();
    }

    public void selectZipcode(String zipcode) {

        if (zipcode.equals("55501")) {
            ldriver.findElement(option55501).click();
        }
        else if (zipcode.equals("55502")) {
            ldriver.findElement(option55502).click();
        }
        else if (zipcode.equals("55503")) {
            ldriver.findElement(option55503).click();
        }
        else if (zipcode.equals("55504")) {
            ldriver.findElement(option55504).click();
        }
    }

    public void clickSubmitCustomer() {
        ldriver.findElement(btnSubmit).click();
    }

    public String getRegisterCustomerAlert() {
        return ldriver.findElement(txtRegisterCustomerSuccess).getText();
    }
}
