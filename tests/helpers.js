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
      console.log(q.toString())
      _.each(DATA_SET, (val) => {
        q.push(val);
        console.log(q.toString())
      });

      _.each(q.toArray(), (item, index) => {
        expect(item).to.equal(DATA_SET[index])
      });
    });

    it('should support pop', () => {
      let q = new Queue();
    });
  });
});
