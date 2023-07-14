/* tslint:disable */
/* eslint-disable */
/**
 * Record API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError } from './base';

/**
 *
 * @export
 * @interface GetRecordById200Response
 */
export interface GetRecordById200Response {
  /**
   *
   * @type {string}
   * @memberof GetRecordById200Response
   */
  id: string;
}

/**
 * RecordsApi - axios parameter creator
 * @export
 */
export const RecordsApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     *
     * @summary get record by id
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getRecordById: async (
      id: string,
      options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists('getRecordById', 'id', id);
      const localVarPath = `/records/{id}`.replace(
        `{${'id'}}`,
        encodeURIComponent(String(id)),
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * RecordsApi - functional programming interface
 * @export
 */
export const RecordsApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = RecordsApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @summary get record by id
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getRecordById(
      id: string,
      options?: AxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<GetRecordById200Response>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getRecordById(
        id,
        options,
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration,
      );
    },
  };
};

/**
 * RecordsApi - factory interface
 * @export
 */
export const RecordsApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  const localVarFp = RecordsApiFp(configuration);
  return {
    /**
     *
     * @summary get record by id
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getRecordById(
      id: string,
      options?: any,
    ): AxiosPromise<GetRecordById200Response> {
      return localVarFp
        .getRecordById(id, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * RecordsApi - object-oriented interface
 * @export
 * @class RecordsApi
 * @extends {BaseAPI}
 */
export class RecordsApi extends BaseAPI {
  /**
   *
   * @summary get record by id
   * @param {string} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RecordsApi
   */
  public getRecordById(id: string, options?: AxiosRequestConfig) {
    return RecordsApiFp(this.configuration)
      .getRecordById(id, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
