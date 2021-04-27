const { EventEmitter } = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on("start", () => {
  console.log("start event!");
});

// This method don't run.
eventEmitter.on('end', () => {
  console.log('end event!');
});

eventEmitter.emit('start');