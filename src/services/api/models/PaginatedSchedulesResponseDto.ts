/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScheduleResponseDto } from './ScheduleResponseDto';
export type PaginatedSchedulesResponseDto = {
    /**
     * Array of train schedule data for the current page
     */
    data: Array<ScheduleResponseDto>;
    /**
     * Current page number
     */
    currentPage: number;
    /**
     * Total number of pages available
     */
    totalPages: number;
    /**
     * Total number of items across all pages
     */
    totalItems: number;
    /**
     * Number of items per page
     */
    limit: number;
};

