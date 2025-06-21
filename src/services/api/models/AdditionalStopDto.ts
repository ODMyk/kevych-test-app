/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { City } from './City';
export type AdditionalStopDto = {
    /**
     * Name of the station for the intermediate stop
     */
    stationName: City;
    /**
     * ISO 8601 string representing the arrival time at this specific intermediate stop
     */
    arrivalTime: string;
};

