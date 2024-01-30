package testRunner;


import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
        features = "/Users/kasibabdullah/Documents/Computer_Science/repos/milano-pizza/milano_pizza_test/Features/Pizza.feature",
        glue = "stepDefinitions"
)


public class TestRunner {

}
