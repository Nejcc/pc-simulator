#include "Utilities.hpp"
#include <sstream>
#include <cctype>

std::vector<std::string> Utilities::split(const std::string& s, char delimiter) {
    std::vector<std::string> tokens;
    std::string token;
    std::istringstream tokenStream(s);
    while (std::getline(tokenStream, token, delimiter)) {
        tokens.push_back(token);
    }
    return tokens;
}

bool Utilities::isInteger(const std::string& s) {
    for (char c : s) {
        if (!std::isdigit(c)) {
            return false;
        }
    }
    return true;
}

bool Utilities::isFloat(const std::string& s) {
    int dotCount = 0;
    for (char c : s) {
        if (!std::isdigit(c)) {
            if (c == '.' && dotCount == 0) {
                dotCount++;
            } else {
                return false;
            }
        }
    }
    return true;
}

// ... Other utility functions
