const EventEmitter = require('events');
const fs = require('fs');

const eventEmitter = new EventEmitter();

let defaultOptions = { 
	stdout: logOutput = fs.createWriteStream('./out.log'),
	sterr: errOutput = fs.createWriteStream('./err.log')
};


eventEmitter.on('log', data => {
	const currentTime = new Date();

	dateTime = `[${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}]`

	console.log(`${dateTime}: `);
});

module.exports.eventEmitter = eventEmitter;