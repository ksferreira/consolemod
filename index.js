const { Console } = require('console');
const fs = require('fs');
const os = require('os');
const { spawn, exec } = require('child_process');
const util = require('util');

const execProm = util.promisify(exec);

class ConsoleWindow {

	// observe() {}

	constructor(options) {
		// Size?: Window Size
		// Output?: file
		// ErrorOutput?: if present, route errors to this file
		// ColorMode?: 
		// Timestamps? = False
	

		// Make sure we integrate custom and defaults.
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
		this.mainWindow.log(message);
	};

	create () {
		const platform = os.platform();

		switch (platform) {
			case 'darwin':
				exec('osascript', '-e', `tell app 'Terminal' to do "yadd yadda"`);
				break;
			case 'linux': // untested
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
				exec('cmd.exe /K node yadda yadda');
				break;
		};
	};
};

module.exports.ConsoleWindow = ConsoleWindow;

