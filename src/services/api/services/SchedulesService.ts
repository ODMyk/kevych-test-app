/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { City } from '../models/City';
import type { CreateScheduleDto } from '../models/CreateScheduleDto';
import type { PaginatedSchedulesResponseDto } from '../models/PaginatedSchedulesResponseDto';
import type { ScheduleResponseDto } from '../models/ScheduleResponseDto';
import type { TrainType } from '../models/TrainType';
import type { UpdateScheduleDto } from '../models/UpdateScheduleDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SchedulesService {
    /**
     * Get a portion of schedules
     * @param page Page number for pagination (starts from 1)
     * @param limit Number of items per page (max 100)
     * @param date Filter schedules by a specific departure date (YYYY-MM-DD)
     * @param trainType Filter schedules by train type
     * @param origin Filter schedules by origin station name
     * @param destination Filter schedules by destination station name
     * @returns PaginatedSchedulesResponseDto Success
     * @throws ApiError
     */
    public static schedulesControllerGetMany(
        page?: number,
        limit?: number,
        date?: string,
        trainType?: TrainType,
        origin?: City,
        destination?: City,
    ): CancelablePromise<PaginatedSchedulesResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/schedules',
            query: {
                'page': page,
                'limit': limit,
                'date': date,
                'trainType': trainType,
                'origin': origin,
                'destination': destination,
            },
            errors: {
                400: `Validation failed`,
                401: `Invalid or expired token`,
                403: `User does not have required role`,
            },
        });
    }
    /**
     * Create a schedule
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static schedulesControllerCreate(
        requestBody: CreateScheduleDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/schedules',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation failed`,
                401: `Invalid or expired token`,
                403: `User does not have required role`,
            },
        });
    }
    /**
     * Get a schedule by id
     * @param id The ID of the schedule
     * @returns ScheduleResponseDto Success
     * @throws ApiError
     */
    public static schedulesControllerGetOne(
        id: string,
    ): CancelablePromise<ScheduleResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/schedules/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Invalid or expired token`,
                403: `User does not have required role`,
                404: `Schedule not found`,
            },
        });
    }
    /**
     * Delete a schedule by id
     * @param id The ID of the schedule
     * @returns any Success
     * @throws ApiError
     */
    public static schedulesControllerDelete(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/schedules/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Invalid or expired token`,
                403: `User does not have required role`,
                404: `Schedule not found`,
            },
        });
    }
    /**
     * Update a schedule by id
     * @param id The ID of the schedule
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static schedulesControllerUpdate(
        id: string,
        requestBody: UpdateScheduleDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/schedules/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid or expired token`,
                403: `User does not have required role`,
                404: `Schedule not found`,
            },
        });
    }
}
