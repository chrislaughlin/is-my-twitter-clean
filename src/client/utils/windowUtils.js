/* @flow */
import queryString from 'query-string';

export const getQueryStringValue = (key: string) => {
    return queryString.parse(location.search)[key];
};

export const buildQueryString = queryString.stringify;

export const setWindowLocation = (location: string) => window.location = location;