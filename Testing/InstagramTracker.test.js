const Builder = require('selenium-webdriver');
// const InstagramTracker = require('../Trackers/InstagramTracker.js');


// Setup driver
(async function init() {
    const driver = await new Builder().forBrowser('chrome').build();

}())

testLogin('check for any exceptions when logging in', ()=> {
    try {
        // const tracker = new InstagramTracker(driver, 'fyra.finance', '$N%y1LKKw3bs', ['nuhgooyin']);
        // tracker.login();
    } catch (e) {

    }
});