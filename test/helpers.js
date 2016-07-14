'use strict';

let mocha = require('mocha')
let expect = require('chai').expect;
let _ = require('lodash');

let Queue = require('../lib/queue');

const DATA_SET = ['2', '10', '5', '14', '3', '20'];

describe('helpers', () => {
  describe('queue', () => {
    it('should support initialization', () => {
      let q = new Queue();
      expect(q.length).to.equal(0);
      expect(q.head).to.equal(null);
      expect(q.tail).to.equal(null);
    });

    it('should support push', () => {
      let q = new Queue();
      _.each(DATA_SET, (val) => q.push(val));
      _.each(q.toArray(), (item, index) => expect(item).to.equal(DATA_SET[index]));
    });

    it('should support pop', () => {
      let q = new Queue();
      let result = [];
      _.each(DATA_SET, (val) => q.push(val));
      while (q.length) result.push(q.pop());

      _.each(result, (item, index) => expect(item).to.equal(DATA_SET[index]));
    });

    it('should support mixing of push and pop', () => {
      let q = new Queue();
      let result = [];
      expect(q.pop()).to.equal(null);          // Now: EMPTY
      expect(q.push(DATA_SET[0])).to.equal(1); // Now: 2
      expect(q.push(DATA_SET[1])).to.equal(2); // Now: 2 < 10
      expect(q.pop()).to.equal('2');           // Now: 10
      expect(q.push(DATA_SET[2])).to.equal(2); // Now: 10 < 5
      expect(q.push(DATA_SET[3])).to.equal(3); // Now: 10 < 5 < 14
      expect(q.pop()).to.equal('10');          // Now: 5 < 14
      expect(q.pop()).to.equal('5');           // Now: 14
      expect(q.push(DATA_SET[4])).to.equal(2); // Now: 14 < 3
      expect(q.pop()).to.equal('14');          // Now: 3
      expect(q.pop()).to.equal('3');           // Now: EMPTY
      expect(q.pop()).to.equal(null);          // Now: EMPTY
      expect(q.push(DATA_SET[5])).to.equal(1); // Now: 20
      expect(q.push(DATA_SET[3])).to.equal(2); // Now: 10 < 5 < 14
      expect(q.pop()).to.equal('20');          // Now: EMPTY

      _.each(result, (item, index) => expect(item).to.equal(DATA_SET[index]));
    });
  });
});
