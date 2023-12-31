# repovideoslot with selenium & javascript

### Summary

This project consists of a simple node application that presents a login page with the ability to enter login credentials,
add a note, check the note created previously, check the logout and check the login using an incorrect password.

The tests in the project are BDD style tests that are driven by cucumber features and drive the tests using
selenium webdriver.

### Quick Start

1. Install Visual studio code (skip this step if you already have Visual Studio code installed )
2. Install nodejs (skip this step if you already have nodejs installed)
3. Install the driver chrome and set environment variables(skip this step if you already have the driver chrome installed)
4. Clone the project using `git clone https://github.com/jhosedith/repoVideoSlot.git`
5. Install node modules - `npm install`.
6. Install cucumber `npm install @cucumber/cucumber`.
7. To run tests - `npx cucumber-js `.


### Result of the runing test

```
npx cucumber-js                  
>> 
Selenium Manager binary found at windows\selenium-manager.exe
Driver path: 116.0.5845.96\chromedriver.exe
Browser path: Chrome\Application\chrome.exe

DevTools listening on ws://127.0.0.1:60393/devtools/browser/aa4cd486-8380-4eac-95f8-f8500ecb6783
.Desired element appeared!
...Confirm message was not found, continue with the logout
.Attempt 1: Button clicked, but desired element did not appear. Retrying...
Desired element appeared!
....Desired element appeared!
.

4 scenarios (4 passed)
10 steps (10 passed)
1m44.904s (executing steps: 1m44.883s)
```

#### Test code 

##### Page Object Model
In the code that we have, the `loginPage.js` file contains the `LoginPage` class that abstracts away the interactions with the login page.
In the code that we have, the `homePage.js` file contains the `homePage` class that abstracts away the interactions with the home page.

