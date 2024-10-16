export interface User {
    id: number;
    firstName: string;
    lastName: string;
    address?: Address;
}

export interface Address {
    id: number;
    address1: string;
    address2: string;
    city: string;
    zip: string;
    country: string;
}