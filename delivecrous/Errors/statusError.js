export class StatusError {
    requestStatus;
    message;

    constructor(requestStatus, message) {
        this.requestStatus = requestStatus;
        this.message = message;
    }
}
