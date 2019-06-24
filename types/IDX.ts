import { IRequest } from ".";

export interface IDXLoginRequest extends IRequest {
    payload: {
        username: string;
        password: string;
    }
}