#ifndef UTILITIES_HPP
#define UTILITIES_HPP

#include <string>
#include <vector>

namespace Utilities {
    std::vector<std::string> split(const std::string& s, char delimiter);
    bool isInteger(const std::string& s);
    bool isFloat(const std::string& s);
    // ... Other utility functions
}

#endif // UTILITIES_HPP
