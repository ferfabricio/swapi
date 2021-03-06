﻿var request = require('request');

exports.request = async function (options) {
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) reject(error)
            else resolve(body)
        })
    })

}

var unirest = require('unirest');
var merge = require('merge');

exports.restCmd = async function (method, options) {
    /*
    options = {};
    options.url = "http://lalala.coll";
    options.headers = {apiKey: "aaaaa"}
    options.query = {field: "aaaaa"}
    options.data = {field: "aaaaa"}
    options.timeout = 5000

    */
    var url, query, headers, timeout, type, data;
    url = options.url;

    if (options.query) query = options.query;

    if (options.data) data = options.data;

    if (options.headers) headers = options.headers;
    else headers = {};

    if (options.timeout) timeout = options.timeout;
    else timeout = 30000;

    if (options.type) type = options.type;
    else type = "json";

    headers = merge(headers, { 'Accept': 'application/json', 'Content-Type': 'application/json' });

    return new Promise((resolve, reject) => {
        var req = unirest[method](url)
                        .headers(headers)
                        .type(type)
                        .timeout(timeout);

        if (query) req.query(query);

        if (data) req.send(data);

        req.end((response) => {
              if (response.error) reject(response)
			  else if (response.statusType > 4) reject(response);
              else resolve(response.body);
             }
           );
    })

};
