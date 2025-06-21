/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserRole } from './UserRole';
export type UserResponseDto = {
    /**
     * Unique identifier of the user
     */
    id: string;
    /**
     * User's email address
     */
    email: string;
    /**
     * User's username
     */
    username?: string;
    /**
     * Array of roles assigned to the user
     */
    roles: Array<UserRole>;
    /**
     * ISO 8601 string representing the creation timestamp
     */
    createdAt: string;
    /**
     * ISO 8601 string representing the last update timestamp
     */
    updatedAt: string;
};

