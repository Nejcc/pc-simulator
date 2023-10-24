#include <iostream>
#include <unordered_map>
#include "Accumulator.hpp"
#include "CommandExecutor.hpp"
#include "Utilities.hpp"

int main() {
    // Initialize ROM (Read-Only Memory)
    std::vector<std::string> rom;

    // Initialize RAM (Random-Access Memory)
    std::unordered_map<int, Accumulator> ram;
    ram[0] = Accumulator("Accumulator", "A", 0);
    ram[1] = Accumulator("Accumulator", "B", 0);
    // ... Initialize other accumulators

    // Initialize programCounter
    int programCounter = 0;

    // Load ROM and RAM from data files (if any)
    Utilities::loadRomFromDataFile(rom);
    Utilities::loadRamFromDataFile(ram);

    // Main Command Execution Loop
    std::string command;
    while (true) {
        std::cout << "Enter command (or 'exit' to quit): ";
        std::getline(std::cin, command);

        if (command == "exit") {
            break;
        }

        std::string output = CommandExecutor::executeCommand(command, rom, ram, programCounter);
        std::cout << "Output: " << output << std::endl;

        // Update ROM and RAM data files
        Utilities::saveRomToDataFile(rom);
        Utilities::saveRamToDataFile(ram);
    }

    return 0;
}
