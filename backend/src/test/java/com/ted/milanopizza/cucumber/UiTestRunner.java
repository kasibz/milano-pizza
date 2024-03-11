package com.ted.milanopizza.cucumber;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@RunWith(Cucumber.class)
@CucumberOptions(
        features = "src/test/resources/feature/Pizza.feature",
        glue = "com.ted.milanopizza.cucumber.stepdefinition",
        plugin = {"pretty"}
)

public class UiTestRunner {

}
