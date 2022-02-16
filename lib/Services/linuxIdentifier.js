const util = require('util');
const { exec } = require('child_process');
const execProm = util.promisify(exec);

const cmd = `ps -o comm= -p "$(($(ps -o ppid= -p "$(($(ps -o sid= -p "$$")))")))"`;

const acceptableTerms = ['konsole', 'guake', 'xterm', 'xfce4-terminal', 'gnome-terminal'];

function getTerminalEmulator() {
    exec(cmd, (err, stdout, stderr) => {
        console.log(stdout);
		if (stdout === 'gnome-terminal-') return 'gnome-terminal'; // For some reason, gnome returns this as it's term.
		
		if (acceptableTerms.includes(stdout)) return stdout; // Theoretically, it works.
        
		return 'Unable to get terminal emulator. Platform may not be supported.';
    }); 
};

module.exports.getTerminalEmulator = getTerminalEmulator;