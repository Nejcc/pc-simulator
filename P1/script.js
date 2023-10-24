// Initialize ROM
let rom = [];

let programCounter = 0;

// Initialize RAM with accumulators
let ram = {
    0: {
        "type": "Accumulator",
        "name": "A",
        "value": 0,
    },
    1: {
        "type": "Accumulator",
        "name": "B",
        "value": 0,
    },
    2: {
        "type": "Accumulator",
        "name": "LR",
        "value": 0,
    },
    3: {
        "type": "Accumulator",
        "name": "EB",
        "value": 0,
    },
    4: {
        "type": "Accumulator",
        "name": "PC",
        "value": 0,
    },
    5: {
        "type": "Accumulator",
        "name": "BB",
        "value": 0,
    },
    6: {
        "type": "Accumulator",
        "name": "0",
        "value": 0,
    },
    7: {
        "type": "Accumulator",
        "name": "WD",
        "value": 0,
    },
    // Add more accumulators as needed
};

// Function to populate RAM values in the HTML
function populateRamValues() {
    for (const key in ram) {
        if (ram.hasOwnProperty(key)) {
            const ramElement = document.getElementById(`ram_${key}`);
            if (ramElement) {
                ramElement.textContent = ram[key].value;
            }
        }
    }
}
// Call the function to populate RAM values when the page loads
populateRamValues();

// Array to store the lines of commands
let commandLines = [];

// Function to execute commands
function executeCommand(command) {
    const args = command.split(' ');

    if (args[0] === 'store' && args.length === 3) {
        const index = parseInt(args[2]);
        const data = args[1].replace(/,$/, ''); // Remove trailing comma, if any
        rom[index] = data;
        updateRomTable(); // Update the ROM table
        saveRomToLocalStorage(); // Save ROM to localStorage
        programCounter++; // Increment the program counter
        return `Stored '${data}' in ROM[${index}]`;
    } else if (args[0] === 'load' && args.length === 3) {
        const index = parseInt(args[1]);
        const accumulatorIndex = parseInt(args[2]);
        if (rom[index]) {
            if (ram.hasOwnProperty(accumulatorIndex) && ram[accumulatorIndex].type === "Accumulator") {
                // Update accumulator in RAM
                const inputValue = rom[index];
                ram[accumulatorIndex].value = inputValue;
                populateRamValues(); // Update RAM values in the HTML
                programCounter++; // Increment the program counter
                return `Loaded '${inputValue}' from ROM[${index}] to ${ram[accumulatorIndex].name}`;
            } else {
                return `Invalid accumulator index: ${args[2]}`;
            }
        } else {
            return `ROM[${index}] is empty`;
        }
    } else if (args[0] === 'set' && args.length === 3) {
        const index = parseInt(args[1]);
        if (ram.hasOwnProperty(index) && ram[index].type === "Accumulator") {
            const value = parseFloat(args[2]);
            ram[index].value = value;
            // Update ROM with the new value
            rom[index] = value;
            updateRomTable(); // Update the ROM table
            saveRomToLocalStorage(); // Save ROM to localStorage
            populateRamValues(); // Update RAM values in the HTML
            programCounter++; // Increment the program counter
            return `Set ${ram[index].name} to ${value}`;
        } else {
            return `Invalid accumulator index: ${args[1]}`;
        }
    } else if (args[0] === 'add' && args.length === 4) {
        const index1 = parseInt(args[1]);
        const index2 = parseInt(args[2]);
        const resultIndex = parseInt(args[3]);
        if (ram.hasOwnProperty(index1) && ram.hasOwnProperty(index2) && ram.hasOwnProperty(resultIndex)
            && ram[index1].type === "Accumulator" && ram[index2].type === "Accumulator" && ram[resultIndex].type === "Accumulator") {
            // Parse values as integers and then perform addition
            const input1Value = parseInt(ram[index1].value);
            const input2Value = parseInt(ram[index2].value);
            ram[resultIndex].value = input1Value + input2Value;
            populateRamValues(); // Update RAM values in the HTML
            programCounter++; // Increment the program counter
            return `Added ${ram[index1].name} (${input1Value}) and ${ram[index2].name} (${input2Value}) into ${ram[resultIndex].name}`;
        } else {
            return 'Invalid accumulator indices';
        }
    } else if (args[0] === 'subtract' && args.length === 4) {
        const index1 = parseInt(args[1]);
        const index2 = parseInt(args[2]);
        const resultIndex = parseInt(args[3]);
        if (ram.hasOwnProperty(index1) && ram.hasOwnProperty(index2) && ram.hasOwnProperty(resultIndex)
            && ram[index1].type === "Accumulator" && ram[index2].type === "Accumulator" && ram[resultIndex].type === "Accumulator") {
            // Perform subtraction
            ram[resultIndex].value = ram[index1].value - ram[index2].value;
            populateRamValues(); // Update RAM values in the HTML
            programCounter++; // Increment the program counter
            return `Subtracted ${ram[index2].name} (${ram[index2].value}) from ${ram[index1].name} (${ram[index1].value}) into ${ram[resultIndex].name}`;
        } else {
            return 'Invalid accumulator indices';
        }
    } else if (args[0] === 'multiply' && args.length === 4) {
        const index1 = parseInt(args[1]);
        const index2 = parseInt(args[2]);
        const resultIndex = parseInt(args[3]);
        if (ram.hasOwnProperty(index1) && ram.hasOwnProperty(index2) && ram.hasOwnProperty(resultIndex)
            && ram[index1].type === "Accumulator" && ram[index2].type === "Accumulator" && ram[resultIndex].type === "Accumulator") {
            // Perform multiplication
            ram[resultIndex].value = ram[index1].value * ram[index2].value;
            populateRamValues(); // Update RAM values in the HTML
            programCounter++; // Increment the program counter
            return `Multiplied ${ram[index1].name} (${ram[index1].value}) and ${ram[index2].name} (${ram[index2].value}) into ${ram[resultIndex].name}`;
        } else {
            return 'Invalid accumulator indices';
        }
    } else if (args[0] === 'divide' && args.length === 4) {
        const index1 = parseInt(args[1]);
        const index2 = parseInt(args[2]);
        const resultIndex = parseInt(args[3]);
        if (ram.hasOwnProperty(index1) && ram.hasOwnProperty(index2) && ram.hasOwnProperty(resultIndex)
            && ram[index1].type === "Accumulator" && ram[index2].type === "Accumulator" && ram[resultIndex].type === "Accumulator") {
            // Perform division
            if (ram[index2].value !== 0) {
                ram[resultIndex].value = ram[index1].value / ram[index2].value;
                populateRamValues(); // Update RAM values in the HTML
                programCounter++; // Increment the program counter
                return `Divided ${ram[index1].name} (${ram[index1].value}) by ${ram[index2].name} (${ram[index2].value}) into ${ram[resultIndex].name}`;
            } else {
                return 'Division by zero is not allowed';
            }
        } else {
            return 'Invalid accumulator indices';
        }
    } else if (args[0] === 'exchange' && args.length === 3) {
        const index1 = parseInt(args[1]);
        const index2 = parseInt(args[2]);
        if (ram.hasOwnProperty(index1) && ram.hasOwnProperty(index2)
            && ram[index1].type === "Accumulator" && ram[index2].type === "Accumulator") {
            // Exchange values between accumulators
            const temp = ram[index1].value;
            ram[index1].value = ram[index2].value;
            ram[index2].value = temp;
            populateRamValues(); // Update RAM values in the HTML
            programCounter++; // Increment the program counter
            return `Exchanged ${ram[index1].name} (${ram[index1].value}) and ${ram[index2].name} (${ram[index2].value})`;
        } else {
            return 'Invalid accumulator indices';
        }
    }else if (args[0] === 'define' && args.length >= 2) {
        // Define a new function and store it in ROM
        const functionName = args[1];
        const functionCommands = args.slice(2).join('\n');
        defineFunction(functionName, functionCommands);
        return `Defined function ${functionName}`;
    } else if (args[0] === 'loop' && args.length === 3) {
        // Execute a loop
        return executeLoop(command);
    } else {
        // Check for function marker and execute the function
        const marker = `@${args[0]}`;
        if (rom.includes(marker)) {
            const functionIndex = rom.indexOf(marker);
            // Find the end of the function
            const endMarkerIndex = rom.indexOf(`@end${args[0]}`);
            if (endMarkerIndex === -1) {
                return `Function ${args[0]} is not properly defined with @end${args[0]}`;
            }
            // Get the commands of the function
            const functionCommands = rom.slice(functionIndex + 1, endMarkerIndex);
            // Execute the function's commands
            for (const cmd of functionCommands) {
                executeCommand(cmd);
            }
            return `Executed function ${args[0]}`;
        } else {
            return 'Invalid command';
        }
    }
}

// Object to store named functions
const functions = {};

// Function to define and store multi-line commands
function defineFunction(name, commands) {
    functions[name] = commands;
}

function executeLoop(command) {
    const args = command.split(' ');

    if (args[0] === 'loop' && args.length === 3) {
        const functionName = args[1];
        const count = parseInt(args[2]);

        if (functions.hasOwnProperty(functionName)) {
            for (let i = 0; i < count; i++) {
                // Execute the stored function
                const commands = functions[functionName];
                for (const cmd of commands) {
                    executeCommand(cmd);
                }
            }
            return `Executed ${functionName} ${count} times`;
        } else {
            return `Function ${functionName} not found`;
        }
    } else {
        return 'Invalid loop command';
    }
}

// Event listener for the "Run Command" button
document.getElementById('run-command').addEventListener('click', function () {
    const commandTextarea = document.getElementById('command');
    commandLines = commandTextarea.value.split('\n'); // Split commands by lines
    lineIndex = 0; // Reset the line index
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Clear the output area

    // Execute the first command line
    executeNextLine();

    // Update the RAM table after running commands
    updateRamTable();
});

// Function to update ROM table
function updateRomTable() {
    const romTable = document.getElementById('rom-table');
    romTable.innerHTML = '';
    for (let i = 0; i < rom.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${i}</td><td>${rom[i]}</td>`;
        romTable.appendChild(row);
    }
}

// Function to save ROM to localStorage
function saveRomToLocalStorage() {
    localStorage.setItem('rom', JSON.stringify(rom));
}

// Function to load ROM from localStorage
function loadRomFromLocalStorage() {
    const savedRom = localStorage.getItem('rom');
    if (savedRom) {
        rom = JSON.parse(savedRom);
        updateRomTable(); // Update the ROM table after loading
    }
}

// Load ROM from localStorage when the page loads
loadRomFromLocalStorage();

// Function to update the RAM table
function updateRamTable() {
    const ramTable = document.getElementById('ram-table-body');
    ramTable.innerHTML = '';
    for (const key in ram) {
        if (ram.hasOwnProperty(key)) {
            const ramEntry = ram[key];
            const row = document.createElement('tr');
            row.innerHTML = `<td>${key}</td><td>${ramEntry.type}</td><td>${ramEntry.name}</td><td>${ramEntry.value}</td>`;
            ramTable.appendChild(row);
        }
    }
}

// Function to update the raw RAM and ROM data
function updateRawOutput() {
    const outputRawElement = document.getElementById('output-raw');
    if (outputRawElement) {
        outputRawElement.textContent = 'RAM Data:\n';
        for (const key in ram) {
            if (ram.hasOwnProperty(key)) {
                outputRawElement.textContent += `Address ${key}: ${ram[key].value}\n`;
            }
        }
        outputRawElement.textContent += '\nROM Data:\n';
        for (let i = 0; i < rom.length; i++) {
            outputRawElement.textContent += `ROM[${i}]: ${rom[i]}\n`;
        }
    }
}

// Call the function to update raw RAM and ROM data when the page loads
updateRawOutput();

// Add a variable to track the current line index
let lineIndex = 0;

let currentLine = 0;
let isPlaying = false;
let intervalId;

// Function to execute the next command line
function executeNextLine() {
    const commandTextarea = document.getElementById('command');
    const commandLines = commandTextarea.value.split('\n'); // Split commands by lines

    if (currentLine < commandLines.length) {
        const command = commandLines[currentLine].trim();

        if (command !== '') {
            const result = executeCommand(command);

            if (result) {
                // Display the result in the output area
                const outputDiv = document.getElementById('output');
                const resultElement = document.createElement('p');
                resultElement.textContent = result;
                outputDiv.appendChild(resultElement);
            }

            // Update the PC accumulator after each valid command
            ram[4].value++;

            // Increment the current line
            currentLine++;
        }
    } else {
        // All lines have been executed, reset the current line and clear the textarea
        currentLine = 0;
        commandTextarea.value = '';
    }

    // Update the RAM table after running commands
    updateRamTable();

    // Scroll to the bottom of the output div
    const outputDiv = document.getElementById('output');
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

// Function to start playing the script
function playScript() {
    isPlaying = true;
    intervalId = setInterval(executeNextLine, 1000); // Execute the next line every second
}

// Function to pause the script
function pauseScript() {
    isPlaying = false;
    clearInterval(intervalId);
}

// Function to reset the script
function resetScript() {
    currentLine = 0;
    isPlaying = false;
    clearInterval(intervalId);
    const commandTextarea = document.getElementById('command');
    commandTextarea.value = '';
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';
    populateRamValues();
    updateRawOutput();
    resetWatchdog(); // Reset the watchdog timer when the script is reset
}

// Function to reset the watchdog timer
function resetWatchdog() {
    ram[7].value = 0; // Reset the watchdog timer (WD accumulator)
}

// Event listener for the "Next" button
document.getElementById('next-button').addEventListener('click', function () {
    // Execute the next command line manually
    executeNextLine();

    // Clear the textarea if all lines have been executed
    if (lineIndex >= commandLines.length) {
        const commandTextarea = document.getElementById('command');
        commandTextarea.value = '';
    }

    // Update the RAM table after running commands
    updateRamTable();

    // Reset the watchdog timer when a command is manually executed
    resetWatchdog();
});

// Event listener for the "Play" button
document.getElementById('play-button').addEventListener('click', playScript);

// Event listener for the "Pause" button
document.getElementById('pause-button').addEventListener('click', pauseScript);

// Event listener for the "Reset" button
document.getElementById('reset-button').addEventListener('click', resetScript);

function displaySystemMessage(message) {
    const systemMessageDiv = document.getElementById('system-message');
    systemMessageDiv.textContent = message;
}

// Watchdog timer function
function watchdogTimer() {
    if (isPlaying) {
        ram[7].value++; // Increment the watchdog timer (WD accumulator)
        if (ram[7].value >= 40) { // 0.67 seconds (40/60 seconds)
            // Perform WD read or write operation here
            // For example, you can read from a specific memory location:
            // const memoryValue = ram[someMemoryLocation].value;

            // Or you can write to a specific memory location:
            // ram[someMemoryLocation].value = someValue;

            // Reset the watchdog timer after the read or write operation
            ram[7].value = 0;
        }

        if (ram[7].value >= 60) {
            // If the watchdog timer reaches 60 seconds (1 minute), perform a reset
            resetScript();

            // Display a system message when a restart occurs
            displaySystemMessage('System has been restarted due to inactivity.');
        }
    }
}



// Set up a watchdog timer interval to check every second
setInterval(watchdogTimer, 1000);
