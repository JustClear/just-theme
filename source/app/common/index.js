//

export function getQuery(name, string = '') {
    let url = decodeURIComponent(location.href),
        query = location.search.substr(1) || url.split('?')[1] || '',
        result = parseQuery(string ? string : query)[name];

    return result ? result : null;
}

export function getHash(name, string = '') {
    let url = decodeURIComponent(location.href),
        query = location.hash.substr(1) || url.split('#')[1] || '',
        result = parseQuery(string ? string : query)[name];

    return result ? result : null;
}

export function parseQuery(query) {
    let result = {},
        param = '',
        params = [],
        str = decodeURIComponent(query);

    if (str) params = str.split('&');

    for (let i = 0; i < params.length; i++) {
        param = params[i].split('=');
        param[0] ? (result[param[0]] = param[1] === undefined ? null : param[1]) : '';
    }

    return result;
}

export function querify(object = {}) {
    let params = '';
    for (let param in object) {
        params += `${param}${object[param] ? '=' + object[param] : (object[param] == '' ? '=' : '')}&`;
    }
    params = params.slice(0, params.length - 1);
    return params;
}

export default {
    getQuery,
    getHash,
    parseQuery,
    querify,
};
