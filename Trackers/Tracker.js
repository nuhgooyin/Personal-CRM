/** @abstract */
export class Tracker {
    constructor(username, password, usersToTrack) {
        if (this.constructor === Tracker) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this.username = username;
        this.password = password;
        this.usersToTrack = usersToTrack;
        this.trackedUsers = {};
        this.baseURL = '';
    }
    /** @abstract */
    async login() {
        throw new Error("Method 'login()' must be implemented.");
    }

    /** @abstract */
    async recordRecentMsgDates() {
        throw new Error("Method 'recordRecentMsgDates()' must be implemented.");
    }
}