import { CognitoUserSession } from 'amazon-cognito-identity-js';
export interface AwsAuthData {
    Username: string,
    Password: string
}

export interface CognitoLoginResponse {
    code: string,
    message: string,
    data: CognitoUserSession
}