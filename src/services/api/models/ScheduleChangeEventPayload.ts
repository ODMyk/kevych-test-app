/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScheduleResponseDto } from './ScheduleResponseDto';
export type ScheduleChangeEventPayload = {
    /**
     * Type of change that occurred to the schedule
     */
    changeType: ScheduleChangeEventPayload.changeType;
    /**
     * Full schedule data for "created" or "updated" events
     */
    schedule?: ScheduleResponseDto;
    /**
     * Only the ID of the schedule for "deleted" events
     */
    scheduleId?: string;
};
export namespace ScheduleChangeEventPayload {
    /**
     * Type of change that occurred to the schedule
     */
    export enum changeType {
        CREATED = 'created',
        UPDATED = 'updated',
        DELETED = 'deleted',
    }
}

