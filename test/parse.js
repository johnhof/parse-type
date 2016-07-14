'use strict';

let mocha = require('mocha')
let expect = require('chai').expect;
let moment = require('moment');

let parse = require('../index');

const TEST_OBJECT = {
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
  ],
  datetime: moment().toISOString()
};
const O = TEST_OBJECT;
const S = JSON.stringify(TEST_OBJECT);

describe('parse', () => {
  describe('base functionality', () => {
    let validateParse = (obj) => {
      expect(obj.test).to.equal(1);
      expect(obj.another).to.be.false;
      expect(obj.nope).to.equal('tru');
      expect(obj.float).to.equal(0.1);
      expect(obj.nested.property.number).to.equal(10);
      expect(obj.array.length).to.equal(3);
      expect(obj.array[0]).to.equal('of');
      expect(obj.array[1]).to.equal(0);
      expect(obj.array[2]).to.be.an('object');
      expect(obj.array[2].various).to.equal(10);
      expect(obj.array[2].values).to.equal('sad');
      expect(obj.datetime).to.be.a('string');
      expect(moment(obj.datetime).isValid()).to.be.true;
    };

    describe('object parsing', () => {
      it('should parse out strings and numbers', () => {
        validateParse(parse(O));
      });
    });
    describe('string parsing', () => {
      it('should parse out strings and numbers', () => {
        validateParse(parse(S));
      });
    });
  });
});
