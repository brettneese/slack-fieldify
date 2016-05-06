/// <reference path='../typings/main.d.ts' />
'use strict';
/**
 * Setting up modules
 */
var _ = require('lodash'), s = require('underscore.string');
/**
 * @description Returns Slack-friendly "fields" from aribirtary JavaScript objects
 * @param  {Object} inputObj
 * @param  {boolean} [False] short? - Whether you want the fields to be long, for verbose data or short, for short data
 * @param  {string} [] prefix? - Prepends things to the output. Mostly used inside the function.
 * @returns {Object} fields - a Slack-ready set of "fields"
 */
function slackFieldify(inputObj, short, prefix) {
    var prefix = prefix ? prefix + '_' : '';
    var short = short ? true : false;
    if (Array.isArray(inputObj) && inputObj.length === 1) {
        inputObj = inputObj[0];
    }
    var result = _.map(_.keys(inputObj), function (key) {
        if (!_.isObject(inputObj[key])) {
            return {
                title: s(prefix + key).humanize().titleize().value(),
                value: inputObj[key],
                short: short
            };
        }
        else {
            return slackFieldify(inputObj[key], short, prefix + key);
        }
    });
    result = _.flatten(result);
    return result;
}
module.exports = slackFieldify;
