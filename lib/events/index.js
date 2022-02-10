const { log } = require('./events');
const { consoleEmitter } = require('./emitter');

exports.default = () => {
	consoleEmitter.on('log', message => log(message));
	return consoleEmitter;
};