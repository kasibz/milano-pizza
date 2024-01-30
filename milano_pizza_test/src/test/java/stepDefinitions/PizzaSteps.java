package stepDefinitions;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class PizzaSteps {
    WebDriver driver;

    @Given("I launch chrome browser")
    public void i_launch_chrome_browser() {
        System.setProperty("webdriver.chrome.driver",
                "/Users/kasibabdullah/Downloads/chromedriver-mac-arm64/chromedriver");
        driver = new ChromeDriver();
    }

    @When("I open localhost")
    public void i_open_localhost() {
        driver.get("http://localhost:5173/");
    }

    @Then("I verify the login box in on page")
    public void i_verify_the_login_box_in_on_page() {
        boolean status = driver.findElement(By.className("mt-4")).isDisplayed();
        Assert.assertEquals(true ,status);
    }

    @And("close browser")
    public void close_browser() {
        driver.quit();
    }
}
