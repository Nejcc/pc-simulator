// Define your variables here
let isPoweredOn = false;
let isGroundPowerOn = false;
let ROM = {};
let RAM = {};
let taskQueue = [];
let registers = {
    '0': '0000',
    'A': '0000',
    'B': '0000',
    'LR': '0000',
    'EB': '0000',
    'FB': '0000',
    'PC': '0000',
    'BB': '0000',
    'WD': '0000'
};

// Pre-fill demo commands in the textarea
document.addEventListener('DOMContentLoaded', () => {
    codeEditor.value = "STORE 1 10\nSTORE 2 5\nLD 1 , A\nLD 2 , B\nSUM A B , A\nSTORE A , 1";
});

document.getElementById('powerButton').addEventListener('click', togglePower);
document.getElementById('groundPower').addEventListener('click', toggleGroundPower);
document.getElementById('runProgram').addEventListener('click', runProgram);

function togglePower() {
    isPoweredOn = !isPoweredOn;
    logToTerminal(`Power is now ${isPoweredOn ? 'On' : 'Off'}`);
    if (!isPoweredOn) {
        RAM = {};
        updateRamTable();
    }
}

function toggleGroundPower() {
    isGroundPowerOn = !isGroundPowerOn;
    logToTerminal(`Ground Power is now ${isGroundPowerOn ? 'On' : 'Off'}`);
}

function runProgram() {
    if (isPoweredOn || isGroundPowerOn) {
        registers['PC'] = '0000';
        const program = document.getElementById('codeEditor').value.split('\n');
        program.forEach(line => {
            const tokens = line.split(' ');
            const command = tokens[0];
            const args = tokens.slice(1).join(' ').split(' , ');
            let detail = '';
            switch (command) {
                case 'STORE':
                    const [romAddress, romValue] = args;
                    ROM[romAddress] = romValue; // Store in ROM
                    detail = `Storing ${romValue} at ROM address ${romAddress}`;
                    updateRomTable();
                    break;
                case 'LD':
                    const [ldRomAddress, ldRamRegister] = args;
                    const ldValue = ROM[ldRomAddress]; // Read from ROM
                    RAM[ldRamRegister] = ldValue; // Store in RAM
                    registers[ldRamRegister] = ldValue; // Update register
                    detail = `Loading from ROM ${ldRomAddress} to RAM ${ldRamRegister}`;
                    updateRamTable();
                    updateRegisterTable();
                    break;
                case 'SUM':
                    const [src1, src2, dest] = args;
                    const sum = parseInt(RAM[src1] || '0') + parseInt(RAM[src2] || '0');
                    RAM[dest] = sum.toString(); // Store in RAM
                    registers[dest] = RAM[dest]; // Update register
                    detail = `Summing ${src1} and ${src2} into ${dest}`;
                    updateRamTable();
                    updateRegisterTable();
                    break;
            }
            taskQueue.push({ task: command, detail });
            incrementPC();
        });
        executeTask();
    } else {
        logToTerminal('Cannot run program. Power is off and no ground power.');
    }
}


function incrementPC() {
    const currentPC = parseInt(registers['PC']);
    registers['PC'] = String(currentPC + 1).padStart(4, '0');
    logToTerminal(`[PC Updated]: ${registers['PC']}`);
}

function executeTask() {
    if (taskQueue.length > 0) {
        const { task, detail } = taskQueue.shift();
        const start = Date.now();
        logToTerminal(`[${new Date().toLocaleTimeString()}] [${task}] [PC: ${registers['PC']}] Task Started. ${detail}`);
        setTimeout(() => {
            logToTerminal(`[${new Date().toLocaleTimeString()}] [${task}] [PC: ${registers['PC']}] Task Completed in ${Date.now() - start} ms`);
            incrementPC();
            updateTaskTable();
            updateRomTable();
            updateRamTable();
            updateRegisterTable();
            setTimeout(() => {
                executeTask();
            }, 1000);
        }, 1000);
    }
}

function logToTerminal(message) {
    const terminal = document.getElementById('terminal');
    terminal.innerHTML += `<p>${message}</p>`;
    terminal.scrollTop = terminal.scrollHeight;
}

function updateTaskTable() {
    const taskTableBody = document.getElementById('taskTableBody');
    taskTableBody.innerHTML = '';
    taskQueue.forEach((taskObj, index) => {
        taskTableBody.innerHTML += `<tr><td>${taskObj.task}</td><td>${index === 0 ? 'Running' : 'Queued'}</td></tr>`;
    });
}

function updateRomTable() {
    const romTableBody = document.getElementById('romTableBody');
    romTableBody.innerHTML = '';
    for (const [address, value] of Object.entries(ROM)) {
        romTableBody.innerHTML += `<tr><td>${address}</td><td>${value}</td></tr>`;
    }
}

function updateRamTable() {
    const ramTableBody = document.getElementById('ramTableBody');
    ramTableBody.innerHTML = '';
    for (const [address, value] of Object.entries(RAM)) {
        ramTableBody.innerHTML += `<tr><td>${address}</td><td>${value}</td></tr>`;
    }
}

function updateRegisterTable() {
    const registerTableBody = document.getElementById('registerTableBody');
    registerTableBody.innerHTML = '';
    for (const [register, value] of Object.entries(registers)) {
        registerTableBody.innerHTML += `<tr><td>${register}</td><td>${value}</td></tr>`;
    }
}
