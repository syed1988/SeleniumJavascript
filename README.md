Overview: This is a very simple selenium-webdriver project using the javascript binding. 
This project implements the page object design principle.

Tools:
   - Selenium Webdriver
   - Mocha
   - Chai

How-to-run:
   - download the project to your system.
   - Ensure the following items are present in the root directory: pages directory, selectors directory, Test directory, config.js file and package.json file.
   - Download Node JS and NPM (if not present in your system)
   - Download and configure Chrome driver to run this test on chrome and download and configure geckodriver to run on firefox browser. By default, it is running on chrome browser. 
   - npm install -g mocha
   - npm install (this installs all dependencies for the project)
   - mocha Test/test.js (to execute tests)