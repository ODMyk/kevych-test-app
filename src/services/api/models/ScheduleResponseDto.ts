/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdditionalStopDto } from './AdditionalStopDto';
import type { City } from './City';
import type { TrainType } from './TrainType';
export type ScheduleResponseDto = {
    /**
     * Unique identifier for the train
     */
    trainNumber: string;
    /**
     * Name of the route
     */
    routeName: string;
    /**
     * Departure station of the train
     */
    origin: City;
    /**
     * Final arrival station of the train
     */
    destination: City;
    /**
     * ISO 8601 string representing the scheduled departure time from the origin
     */
    departureTime: string;
    /**
     * ISO 8601 string representing the scheduled final arrival time at the destination
     */
    arrivalTime: string;
    /**
     * List of intermediate stops with their station names and arrival times
     */
    additionalStops?: Array<AdditionalStopDto>;
    /**
     * Type of train
     */
    trainType: TrainType;
    /**
     * Unique identifier of the schedule
     */
    id: string;
    /**
     * ISO 8601 string representing the creation timestamp of the schedule
     */
    createdAt: string;
    /**
     * ISO 8601 string representing the last update timestamp of the schedule
     */
    updatedAt: string;
    /**
     * Whether the schedule is marked as a favorite by the user
     */
    isFavorite: boolean;
};

