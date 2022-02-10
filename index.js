const { Console } = require('console');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn, exec } = require('child_process');
const util = require('util');

const { eventEmitter } = require('./lib/listener');

const execProm = util.promisify(exec);

const listenerPath = path.join(__dirname, 'lib', 'listener.js');
const launchCodes = `node ${listenerPath}`;

class ConsoleWindow {
	constructor(options) {
		let defaultOptions = { 
			stdout: fs.createWriteStream('./out.log'),
			sterr: fs.createWriteStream('./err.log')
		};

		if (options !== undefined) {
			defaultOptions = options;
		};

		console.log('Starting new window with the following options:')
		console.log(typeof(defaultOptions));
		console.log(defaultOptions);

		// this will become the terminal instantiator.
		this.mainWindow = new Console(defaultOptions);
	};

	log(message) {
		eventEmitter.emit('log', messsage);
	};

	create () {
		const platform = os.platform();

		switch (platform) {
			case 'darwin':
				exec('osascript', ['-e', `
					if application "Terminal" is running then
						tell application "Terminal"
							# do script without "in window" will open a new window        
							do script "${launchCodes}"
							activate
						end tell
						else
						tell application "Terminal"
							# window 1 is guaranteed to be recently opened window        
							do script "${launchCodes}" in window 1
							activate
						end tell
					end if
				`]); // Thank you, Stack Overflow <3
				break;
			case 'linux': // untested. god help me.
				let result
				(async () => {
					try {
						result = await execProm('basename "/"$(ps -f -p $(cat /proc/$(echo $$)/stat | cut -d \  -f 4) | tail -1 | sed \'s/^.*');
					} catch (err) {
						result = undefined;
					};
				})();

				if (result !== undefined) {
					exec(`${result} -e `);
				};
				break;
			case 'win32':
				exec(`start cmd.exe /K ${launchCodes}`);
				break;
		};
	};
};

module.exports.ConsoleWindow = ConsoleWindow;

