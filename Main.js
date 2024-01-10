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
    const igBot = new InstagramTracker(driver, 'USERNAME', 'PASSWORD', ['SOMEUSERNAME']);

    // Tell the bot to login & record msg dates
    console.log(await igBot.login());
    console.log(await igBot.closePopUps());
    console.log(await igBot.recordRecentMsgDates());
    //await igBot.closePopUps();

    // Print the gathered info. and quit
    console.log(igBot.trackedUsers)
    await driver.quit()
}())