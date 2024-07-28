const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
    }

commandMessage (command){
   let commandtype = command.commandType;
   let value = command.value;
   let resultObj = {};
   if (commandtype === "MOVE") {
      if (this.mode == 'LOW_POWER'){
         resultObj = {completed: false};
      }
      else {
         this.position = value;
         resultObj = {completed: true};
      }
      return resultObj;
   }
   else if (commandtype === "STATUS_CHECK") {
      let roverStatus = { mode: this.mode, generatorWatts: this.generatorWatts, position: this.position };
      resultObj = {completed: true, roverStatus: roverStatus};
      return resultObj;
   }
   else if (commandtype === "MODE_CHANGE") {
      this.mode = value;
      resultObj = {completed: true};
      return resultObj;;
   }
   else {
      resultObj = {completed: false};
      return resultObj;;
   }
}
  

receiveMessage (message) {
   let results = [];
   let resultObj = {};
   for (let i = 0; i < message.commands.length; i++){
      let commandi = message.commands[i];
      resultObj = this.commandMessage(commandi);
      results.push(resultObj);
   }
   let finalObj = {message: message.name, results: results};
   return finalObj;
};

};



let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.

let response = rover.receiveMessage(message);
console.log(response.results[1].roverStatus);
console.log(response);

module.exports = Rover;