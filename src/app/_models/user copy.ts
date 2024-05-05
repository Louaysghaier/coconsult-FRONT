import { Role } from "./Role";

export class User {
    iduser?: number;
    name?: string;
    email?: string;
    username?: string;
    password?: string;
    blocked?: boolean;
    Role?: string;
    token?: string;
    refreshToken?: string;

    address?: string;
    valid?: boolean;
    bannedchatGP?: boolean;
    number?: number;
    image?: string;
}