/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFavoriteDto } from '../models/CreateFavoriteDto';
import type { PaginatedFavoritesResponseDto } from '../models/PaginatedFavoritesResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FavoritesService {
    /**
     * Get a portion of favorite schedules
     * @param page Page number for pagination (starts from 1)
     * @param limit Number of items per page (max 100)
     * @returns PaginatedFavoritesResponseDto Success
     * @throws ApiError
     */
    public static favoritesControllerFindAll(
        page?: number,
        limit?: number,
    ): CancelablePromise<PaginatedFavoritesResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/favorites',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * Add a schedule to favorites
     * @param requestBody
     * @returns any Successful add
     * @throws ApiError
     */
    public static favoritesControllerCreate(
        requestBody: CreateFavoriteDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/favorites',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete a favorite schedule
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static favoritesControllerDelete(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/favorites/{id}',
            path: {
                'id': id,
            },
        });
    }
}
