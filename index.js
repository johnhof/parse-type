'use strict';

let Queue = require('./lib/queue');
let _ = require('lodash');

const ROOT = '__ROOT__';

//
// Helpers
//

let toss = (msg) => {
  let error = Error('message');
  throw error
}

let expect = (condition, msg) => { if (!condition) toss('parse type expects ' + msg); };
let hasDecimal = (str) => ((str || '').indexOf('.') > -1);

let parse = {};
parse.num = (s) => {
  let val = Number(s);
  return (isNaN(val)) ? s : val;
};
parse.bool = (s) => {
  if (s === 'true') return true;
  if (s === 'false') return false;
  return s;
}

let normalizeInput = (obj) => {
  let result = false;
  if (_.isString(obj)) {
    try {
     result = JSON.parse(obj);
   } catch (e) {}
   expect(result, 'input strings to be valid stringified JSON');
  } else {
    result = obj;
  }

  return result;
}

//
// Core
//

module.exports = function (input, options) {
  expect(input, 'input to be defined');
  let object = normalizeInput(input);
  let queue = new Queue();
  let stash = {};
  queue.push({ key: ROOT, value: object });
  while (queue.length) {
    let prop = queue.pop();

    // Recover the reference to the current property
    let keyStr = prop.key;
    let propRef = _.get(object, prop.key);
    if (prop.key === ROOT) {
      keyStr = '';
    } else if (!_.isArray(prop.value)){
      keyStr += '.';
    }

    // Queue sub-properties by array
    if (_.isArray(prop.value)) {
      // iterate values and add prop-value mappings to the queue
      let count = prop.value.length;
      for (let i = 0; i < count; i++) {
        let key = keyStr + '[' + i + ']';
        let val = _.get(object, key);
        if (key && val) queue.push({ key: key, value: val });
      }

    // Queue sub-properties by object
    } else if (_.isPlainObject(prop.value)) {
      // iterate values and add prop-value mappings to the queue
      let keys = Object.keys(prop.value);
      let propNum = keys.length;
      for (let i = 0; i < propNum; i++) {
        let key = keyStr + keys[i];
        let val = _.get(object, key);
        if (key && val) queue.push({ key: key, value: val });
      }

    // Parse strings
    } else if (_.isString(prop.value)) {
      let result;

      result = parse.bool(prop.value);
      if (!_.isString(result)) { _.set(object, prop.key, result); continue; }

      result = hasDecimal(prop.value) ?  parse.num(prop.value) : '';
      if (!_.isString(result)) { _.set(object, prop.key, result); continue; }

      result = parse.num(prop.value);
      if (!_.isString(result)) { _.set(object, prop.key, result); continue; }
    }
  }

  return object;
}
