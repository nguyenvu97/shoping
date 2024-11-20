export default class Response<T> {
    message: string;
    status_code: number;
    data: T;

    constructor(message: string, status_code: number, data: T) {
        this.message = message;
        this.status_code = status_code;
        this.data = data;
    }
}
