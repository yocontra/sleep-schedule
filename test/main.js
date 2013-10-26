var sleep = require('../');
var should = require('should');
require('mocha');

var sleepTime = new Date();
var wakeTime = new Date();

describe('sleep-schedule', function() {
  describe('wakeTimes()', function() {
    it('should provide 6 cycles of times', function(done) {
      var times = sleep.wakeTimes(sleepTime, 6);
      should.exist(times);
      times.length.should.equal(7);
      done();
    });
  });
  describe('wakeTime()', function() {
    it('should provide a time 6 cycles from now', function(done) {
      var time = sleep.wakeTime(sleepTime, 6);
      should.exist(time);
      done();
    });
  });

  describe('sleepTimes()', function() {
    it('should provide 6 cycles of times', function(done) {
      var times = sleep.sleepTimes(wakeTime, 6);
      should.exist(times);
      times.length.should.equal(7);
      done();
    });
  });
  describe('sleepTime()', function() {
    it('should provide a time 6 cycles from now', function(done) {
      var time = sleep.sleepTime(wakeTime, 6);
      should.exist(time);
      done();
    });
  });

});
