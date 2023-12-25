import {InstagramTracker} from "./Trackers/InstagramTracker.js";
import {Builder} from 'selenium-webdriver';

/**
 * Demonstrates how top-level functions follow the same rules.  This one
 * makes an array.
 * @param {TYPE} arg
 * @return {!Array<TYPE>}
 * @template TYPE
 */
(async function main() {

    // Instantiate InstagramTracker bot
    const driver = await new Builder().forBrowser('chrome').build();
    const igBot = new InstagramTracker(driver, 'fyra.finance', '$N%y1LKKw3bs', ['nuhgooyin']);

    // Tell the bot to login & record msg dates
    await igBot.login();
    // await igBot.closePopUps();
    // await igBot.recordRecentMsgDates();

    // Print the gathered info. and quit
    console.log(igBot.trackedUsers)
    await driver.quit()
}())