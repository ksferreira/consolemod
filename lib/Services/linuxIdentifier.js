const util = require('util');
const { exec } = require('child_process');
const execProm = util.promisify(exec);

const cmd = `ps -o comm= -p "$(($(ps -o ppid= -p "$(($(ps -o sid= -p "$$")))")))"`;

function getTerminalEmulator() {
    exec(cmd, (err, stdout, stderr) => {
        console.log(stdout);
        return stdout;
    }); 
};

module.exports.getTerminalEmulator = getTerminalEmulator;