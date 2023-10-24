#ifndef COMMANDEXECUTOR_HPP
#define COMMANDEXECUTOR_HPP

#include <string>
#include <vector>
#include <unordered_map>
#include "Accumulator.hpp"

class CommandExecutor {
public:
    static std::string executeCommand(const std::string& command, std::vector<std::string>& rom, std::unordered_map<int, Accumulator>& ram, int& programCounter);
};

#endif
