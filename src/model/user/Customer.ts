export interface Customer {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    password: string;

}

export class Customer_Decode {
    email: string;
    id: string;
    exp: number;
    iat: number;
    constructor(email: string, id: string, exp: number, iat: number) {
        this.email = email;
        this.id = id;
        this.exp = exp;
        this.iat = iat;
    }

}
