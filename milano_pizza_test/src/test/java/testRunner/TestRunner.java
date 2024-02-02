package testRunner;


import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
        features = "/Users/kasib.abdullah/Documents/repos/milano-pizza/milano_pizza_test/Features/Customers.feature",
        glue = "stepDefinitions",
        plugin = {"pretty"}
)


public class TestRunner {

}
