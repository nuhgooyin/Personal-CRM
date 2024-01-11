import assert from 'assert';
import {InstagramTracker} from "../Trackers/InstagramTracker.js";
import {Builder} from 'selenium-webdriver';

test('check for any exceptions when logging in', async ()=> {
    const driver = new Builder().forBrowser('chrome').build();
    const tracker = new InstagramTracker(driver, 'USERNAME', 'PASSWORD', ['SOMEUSER']);

    for (let i = 0; i < 1; i++) {
        assert (await tracker.login());
    }
});
