package pageObjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.CacheLookup;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class HomePage {
    public WebDriver ldriver;

    public HomePage(WebDriver rdriver) {
        ldriver = rdriver;
        PageFactory.initElements(rdriver, this);
    }
//    WebElement linkLogout = driver.findElement(By.xpath("//a[@href='/logout']"));
    @FindBy(xpath = "//a[@href='/logout']")
    @CacheLookup
    WebElement linkLogout;

    public void clickLogout() {
        linkLogout.click();
    }
}
