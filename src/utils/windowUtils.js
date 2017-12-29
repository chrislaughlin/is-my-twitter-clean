import queryString from 'query-string';

export const getQueryStringValue = key => {
    return queryString.parse(location.search)[key];
};

export const buildQueryString = queryString.stringify;