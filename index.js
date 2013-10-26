function addMinutes(date, mins) {
  return new Date(date.getTime() + (mins*60000));
}

module.exports = sleepy = {
  // Average fall asleep time is 14 minutes
  minutesToSleep: 14,

  // Average cycle to REM is 90 minutes
  cycleMinutes: 90,

  // Average number of sleep cyclers per session is 5-6
  cycles: 5,

  // Return total minutes needed for a session
  sessionMinutes: function(cycles){
    if (!cycles) cycles = sleepy.cycles;
    return sleepy.minutesToSleep+(sleepy.cycleMinutes*cycles);
  },

  // I'm waking up at (date)
  // I want to sleep max (cycles) sleep cycles
  // Returns a list of Dates to start falling asleep at
  sleepTimes: function(date, cycles) {
    if (!date) date = addMinutes(new Date(), sleepy.sessionMinutes());
    if (!cycles) cycles = sleepy.cycles;
    if (cycles <= 0) throw new Error("Fuck off");

    var actualWakeTime = addMinutes(date, sleepy.minutesToSleep);
    var times = [];
    var lastTime;
    for(var i = 0; i <= cycles; i++){
      lastTime = (i === 0) ? actualWakeTime : times[i-1];
      times.push(addMinutes(lastTime, -sleepy.cycleMinutes));
    }
    return times;

  },

  // I'm waking up at (date)
  // I want to sleep exactly (cycles) sleep cycles
  // Returns a Date to start falling asleep at
  sleepTime: function(date, cycles) {
    if (!date) date = new Date();
    if (!cycles) cycles = sleepy.cycles;
    if (cycles <= 0) throw new Error("Fuck off");

    var sessionTime = sleepy.minutesToSleep+(sleepy.cycleMinutes*cycles);
    return addMinutes(date, -sessionTime);
  },

  // I'm going to sleep at (date)
  // I want to sleep max (cycles) sleep cycles
  // Returns a list of Dates to wake up at
  wakeTimes: function(date, cycles) {
    if (!date) date = new Date();
    if (!cycles) cycles = sleepy.cycles;
    if (cycles <= 0) throw new Error("Fuck off");

    var actualSleepTime = addMinutes(date, sleepy.minutesToSleep);
    var times = [];
    var lastTime;
    for(var i = 0; i <= cycles; i++){
      lastTime = (i === 0) ? actualSleepTime : times[i-1];
      times.push(addMinutes(lastTime, sleepy.cycleMinutes));
    }
    return times;
  },

  // I'm going to sleep at (date)
  // I want to sleep exactly (cycles) sleep cycles
  // Returns a Date to wake up at
  wakeTime: function(date, cycles) {
    if (!date) date = new Date();
    if (!cycles) cycles = sleepy.cycles;
    if (cycles <= 0) throw new Error("Fuck off");

    var sessionTime = sleepy.minutesToSleep+(sleepy.cycleMinutes*cycles);
    return addMinutes(date, sessionTime);
  }
};