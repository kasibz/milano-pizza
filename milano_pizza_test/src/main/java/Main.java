import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

// Press Shift twice to open the Search Everywhere dialog and type `show whitespaces`,
// then press Enter. You can now see whitespace characters in your code.
public class Main {

    WebDriver driver;

    public void launchBrowser() {
        System.setProperty("webdriver.chrome.driver",
                "/Users/kasibabdullah/Downloads/chromedriver-mac-arm64/chromedriver");
        driver = new ChromeDriver();
        driver.get("http://localhost:5173/");
    }

    public void loginTest() {
        WebElement idInput = driver.findElement(By.id("employeeID"));
        WebElement passInput = driver.findElement(By.id("password"));

        // no compound  classNames
        WebElement submit = driver.findElement(By.className("btn-primary"));
        idInput.sendKeys("1");
        passInput.sendKeys("abdullah");
        submit.click();

        // bad parameters, now what... wait
    }

    public static void main(String[] args) {
        Main obj = new Main();
    }
}
