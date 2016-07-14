# parse-type

[![Build Status](https://travis-ci.org/johnhof/parse-types.svg?branch=master)](https://travis-ci.org/johnhof/parse-types)

Parse types of nested javascript strings

# Usage

```
let parse = require('parse-types');

let result;

// String
result = parse("{"test":"1","another":"false","nope":"tru","float":"0.1","nested":{"property":{"number":"10"}},"array":["of","0",{"various":"10","values":"sad"}]}");

// OR

// Object
result = parse({
  test: '1',
  another: 'false',
  nope: 'tru',
  float: '0.1',
  nested: {
    property: {
      number: '10'
    }
  },
  array: [
    'of',
    '0',
    {
      various: '10',
      values: 'sad'
    }
  ]
});

console.log(result);
/*

{
  "test": 1,
  "another": false,
  "nope": "tru",
  "float": 0.1,
  "nested": {
    "property": {
      "number": 10
    }
  },
  "array": [
    "of",
    0,
    {
      "various": 10,
      "values": "sad"
    }
  ]
}

*/


```

# Authors

- [John Hofrichter](https://github.com/johnhof)
