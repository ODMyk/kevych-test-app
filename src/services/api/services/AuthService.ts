/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthResponseDto } from '../models/AuthResponseDto';
import type { UserLoginDto } from '../models/UserLoginDto';
import type { UserRegisterDto } from '../models/UserRegisterDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Register a new user
     * @param requestBody
     * @returns AuthResponseDto User successfully registered and logged in
     * @throws ApiError
     */
    public static authControllerRegister(
        requestBody: UserRegisterDto,
    ): CancelablePromise<AuthResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request (Validation failed or user already exists)`,
            },
        });
    }
    /**
     * Login a user and get JWT
     * @param requestBody
     * @returns AuthResponseDto User successfully logged in
     * @throws ApiError
     */
    public static authControllerLogin(
        requestBody: UserLoginDto,
    ): CancelablePromise<AuthResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized (Invalid credentials)`,
            },
        });
    }
}
