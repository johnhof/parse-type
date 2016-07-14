'use strict';

let mocha = require('mocha')
let expect = require('chai').expect;

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
  ]
};
const O = TEST_OBJECT;
const S = JSON.stringify(TEST_OBJECT);

describe('parse', () => {
  describe('base functionality', () => {
    describe('object parsing', () => {
      it('should parse out strings and numbers', () => {
        let r = parse(O);
        expect(r.test).to.equal(1);
        expect(r.another).to.be.false;
        expect(r.nope).to.equal('tru');
        expect(r.float).to.equal(0.1);
        expect(r.nested.property.number).to.equal(10);
        expect(r.array.length).to.equal(3);
        expect(r.array[0]).to.equal('of');
        expect(r.array[1]).to.equal(0);
        expect(r.array[2]).to.be.an('object');
        expect(r.array[2].various).to.equal(10);
        expect(r.array[2].values).to.equal('sad');
      });
    });
    describe('string parsing', () => {
      it('should parse out strings and numbers', () => {
        let r = parse(S);
        expect(r.test);
        expect(r.test).to.equal(1);
        expect(r.another).to.be.false;
        expect(r.nope).to.equal('tru');
        expect(r.float).to.equal(0.1);
        expect(r.nested.property.number).to.equal(10);
      });
    });
  });
});
