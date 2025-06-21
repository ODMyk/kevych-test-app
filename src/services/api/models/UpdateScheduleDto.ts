/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdditionalStopDto } from './AdditionalStopDto';
import type { City } from './City';
import type { TrainType } from './TrainType';
export type UpdateScheduleDto = {
    /**
     * Unique identifier for the train
     */
    trainNumber?: string;
    /**
     * Name of the route
     */
    routeName?: string;
    /**
     * Departure station of the train
     */
    origin?: City;
    /**
     * Final arrival station of the train
     */
    destination?: City;
    /**
     * ISO 8601 string representing the scheduled departure time from the origin
     */
    departureTime?: string;
    /**
     * ISO 8601 string representing the scheduled final arrival time at the destination
     */
    arrivalTime?: string;
    /**
     * List of intermediate stops with their station names and arrival times
     */
    additionalStops?: Array<AdditionalStopDto>;
    /**
     * Type of train
     */
    trainType?: TrainType;
};

