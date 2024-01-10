import keys, {By, locateWith, until} from 'selenium-webdriver';
import {Tracker} from "./Tracker.js"

/** My class. */
export class InstagramTracker extends Tracker {
    /** @param {string=} someString */
    constructor(driver, username, password, usersToTrack) {
        super(username, password, usersToTrack);
        this.driver = driver;
        this.baseURL = 'https://www.instagram.com/direct/inbox/';
    }

    async login() {
        try {
            await this.driver.get(this.baseURL);

            // Enter username
            await this.driver.wait(until.elementLocated(By.name("username")), 5000);
            await this.driver.findElement(By.name("username")).sendKeys(this.username);

            // Enter password
            await this.driver.wait(until.elementLocated(By.name("password")), 5000);
            await this.driver.findElement(By.name("password")).sendKeys(this.password);
            await this.driver.findElement(By.name("password")).sendKeys(keys.Key.RETURN);
            return true;

        } catch (e) {
            return false;
        }
    }

    async closePopUps() {
        let morePopups = true;
        let popUpFound = false;

        while (morePopups) {
            try {
                await this.driver.wait(until.elementLocated(By.xpath("//*[text()='Not Now']")), 5000);
                await this.driver.findElement(By.xpath("//*[text()='Not Now']")).click();
                popUpFound = true;
            } catch (NoSuchElementError) {
                try {
                    await this.driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Not now')]")), 5000);
                    await this.driver.findElement(By.xpath("//*[contains(text(),'Not now')]")).click();
                    popUpFound = true;
                } catch (NoSuchElementError) {
                    morePopups = false;
                }
            }
        }
        return popUpFound;
    }

    async scrollByUsers(users) {
        try {
            await this.driver.wait(until.elementLocated(By.xpath("//*[text()='Messages']")), 5000);
            const messagesTitle = await this.driver.findElement(By.xpath("//*[text()='Messages']"));
            const numberOfScrolls = users*72;
            await this.driver.actions().scroll(0, 50, 0, numberOfScrolls, messagesTitle).perform();
            return true;
        } catch (e) {
            return false;
        }
    }

    // This is a private helper function
    async searchMsgDates(userFoundWebElement) {
        // Search by s, m, h, d, w, y
        try {
            await this.driver.wait(until.elementsLocated(By.xpath("//*[boolean(number(substring-before(text(), 'm'))) or number(substring-before(text(), 'm')) = 0]")), 5000);
            const userDate = await this.driver.findElements(locateWith(By.xpath("//*[boolean(number(substring-before(text(), 'm'))) or number(substring-before(text(), 'm')) = 0]")).below(userFoundWebElement));

            console.log("no error in mhdwy");
            console.log(await userDate[0].getText());
        } catch (NoSuchElementError) {
            console.log("error in mhdwy search");
        }
    }

    async recordRecentMsgDates() {
        try {
            for (let i = 0; i < this.usersToTrack.length; i++) {
                let userInfoUpdated = false;
                const currUsername = this.usersToTrack[i];

                while (!userInfoUpdated) {
                    try {
                        await this.driver.wait(until.elementLocated(By.xpath("//*[text()='" + currUsername + "']")), 5000);
                        const userElement = await this.driver.findElement(By.xpath("//*[text()='" + currUsername + "']"));

                        console.log(currUsername)
                        await this.searchMsgDates(userElement);

                    } catch (NoSuchElementError) {
                        console.log("user not found");

                        await this.scrollByUsers(7);

                        console.log("scrolling");
                    }
                }
            }

            return true;
        } catch (e) {
            return false;
        }
    }

}
