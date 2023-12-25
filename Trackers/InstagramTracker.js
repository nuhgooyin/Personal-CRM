import keys, {By, until} from 'selenium-webdriver';

/** My class. */
export class InstagramTracker {
    /** @param {string=} someString */
    constructor(driver, username, password, usersToTrack) {
        this.driver = driver;
        this.username = username;
        this.password = password;
        this.usersToTrack = usersToTrack;
        this.trackedUsers = {};
        this.baseURL = 'https://www.instagram.com/?hl=en';
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

            console.log("success");

        } catch (e) {
            console.log("failure");
        }
    }

    async closePopUps() {
        try {
            const notifDismissButton = await this.driver.findElement(By.xpath("/html/body/div[3]/div[1]/div/div[2]/div/div/div/div/div[2]/div/div/div[3]/button[2]"));
            await this.driver.wait(until.elementIsVisible(notifDismissButton), 5000);
            await notifDismissButton.click();

        } catch (e) {
            console.log(e);
        }
    }

    async recordRecentMsgDates() {

    }

}
