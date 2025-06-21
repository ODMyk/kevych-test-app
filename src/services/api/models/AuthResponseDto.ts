/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserResponseDto } from './UserResponseDto';
export type AuthResponseDto = {
    /**
     * JWT Access Token
     */
    accessToken: string;
    /**
     * Authenticated user's public information
     */
    user: UserResponseDto;
};

