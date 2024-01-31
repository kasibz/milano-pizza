package stepDefinitions;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import pageObjects.LoginPage;

public class PizzaSteps {
    WebDriver driver;
    LoginPage lp;

    @Given("User launch chrome browser")
    public void user_launch_chrome_browser() {
        System.setProperty("webdriver.chrome.driver",
                "/Users/kasibabdullah/Downloads/chromedriver-mac-arm64/chromedriver");
        driver = new ChromeDriver();
        lp = new LoginPage(driver);
    }

    // has to be string
    @When("User open localhost URL {string}")
    public void user_open_localhost(String string) {
        driver.get(string);
    }

    @Then("User verify the login box in on page")
    public void user_verify_the_login_box_in_on_page() {
        boolean status = driver.findElement(By.className("mt-4")).isDisplayed();
        Assert.assertEquals(true ,status);
    }
    // -- scenario 2, can name them whatever as arguments
    @And("User enters Id as {string} and password as {string}")
    public void user_enters_id_as_and_password_as(String id, String pass) {
        lp.setEmployeeId(id);
        lp.setEmployeePass(pass);
    }

    @And("Click on Login")
    public void click_on_login() {
        lp.clickLogin();
    }

    @Then("LoggedIn text on nav should be {string}")
    public void logged_in_text_on_nav_should_be(String loginText) {
        String spanLoginText = driver.findElement(By.tagName("span")).getText();
        if (spanLoginText.contains("Employee login needed to create orders")) {
            driver.close();
            Assert.fail();
        } else {
            Assert.assertEquals(loginText, spanLoginText);
        }

    }

    @When("User clicks on Log out link")
    public void user_click_on_log_out_link() {

    }

    @Then("Page should say {string}")
    public void page_should_say() {

    }

    @When("User clicks on Yes")
    public void user_clicks_on_yes() {

    }

    @And("close browser")
    public void close_browser() {
        driver.close();
    }
}
