package stepDefinitions;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import pageObjects.HomePage;
import pageObjects.LoginPage;

public class PizzaSteps extends BaseSteps {

    // need to instantiate page objects and driver
    @Given("User launch chrome browser")
    public void user_launch_chrome_browser() {
        System.setProperty("webdriver.chrome.driver",
                "/Users/kasib.abdullah/Documents/utilities/chromedriver");
        driver = new ChromeDriver();
        lp = new LoginPage(driver);
        hp = new HomePage(driver);
    }

    // has to be string
    @When("User open localhost URL {string}")
    public void user_open_localhost(String string) throws InterruptedException {
        driver.get(string);
        Thread.sleep(1500);
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
    public void click_on_login() throws InterruptedException {
        lp.clickLogin();
        Thread.sleep(1500);
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
    public void user_click_on_log_out_link() throws InterruptedException {
        hp.clickLogout();
        Thread.sleep(1500);
    }

    @Then("Page should say {string}")
    public void page_should_say(String logoutText) {
        String h1LogoutText = driver.findElement(By.tagName("h1")).getText();
        Assert.assertEquals(logoutText, h1LogoutText);
    }

    @When("User clicks on Yes")
    public void user_clicks_on_yes() throws InterruptedException{
        WebElement btnLogoutYes = driver.findElement(By.tagName("button"));
        btnLogoutYes.click();
        Thread.sleep(1500);
    }

    @Then("HomePage should say {string}")
    public void homepage_should_say(String employeeLoginText) {
        String h2LoginText = driver.findElement(By.tagName("h2")).getText();
        Assert.assertEquals(employeeLoginText, h2LoginText);
    }

    @And("close browser")
    public void close_browser() {
        driver.close();
    }
}
