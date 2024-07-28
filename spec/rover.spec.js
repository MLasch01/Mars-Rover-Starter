const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  test ("constructor sets position and default values for mode and generatorWatts", function() {
  let newPosition = new Rover (98382);
  // let newGeneratorWatts = new Rover (110);
  // let newMode = new Rover ('NORMAL');
  expect (newPosition.position).toBe(98382);
  expect(newPosition.generatorWatts).toBe(110);
  expect(newPosition.mode).toBe('NORMAL');
});

test ("response returned by receiveMessage contains the name of the message", function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message', commands);
  let rover = new Rover (0);
  let finalObj = rover.receiveMessage(message);
  expect(finalObj.message).toBe(message.name);
});

test ("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message', commands);
  let rover = new Rover (0);
  let finalObj = rover.receiveMessage(message);
  expect(commands.length).toBe(finalObj.results.length);
 });

 test ("responds correctly to the status check command", function() {
  let commands = [new Command('STATUS_CHECK')];
  let message = new Message('Test message', commands);
  let rover = new Rover (87382098);
  let finalObj = rover.receiveMessage(message);
  expect(finalObj.results[0]).toStrictEqual({completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 87382098}});
 });

 test ("responds correctly to the mode change command", function() {
  let commands = [new Command('MODE_CHANGE')];
  let message = new Message('Test message', commands);
  let rover = new Rover (87382098);
  let finalObj = rover.receiveMessage(message);
  expect(finalObj.results[0]).toStrictEqual({completed: true});
  });

  test ("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 87373098)];
    let message = new Message('Test message', commands);
    let rover = new Rover (87382098);
    let finalObj = rover.receiveMessage(message);
    expect(finalObj.results[1]).toStrictEqual({completed: false});
  });

  test ("responds with the position for the move command", function() {
    let commands = [new Command('MOVE', 87373098)];
    let message = new Message('Test message', commands);
    let rover = new Rover (87382098);
    let finalObj = rover.receiveMessage(message);
    expect(rover.position).toBe(87373098);
    });

});
