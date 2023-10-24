#ifndef ACCUMULATOR_HPP
#define ACCUMULATOR_HPP

#include <string>

class Accumulator {
private:
    std::string type;
    std::string name;
    int value;

public:
    Accumulator();
    Accumulator(const std::string& type, const std::string& name, int value);

    // Getter and Setter for 'value'
    int getValue() const;
    void setValue(int value);

    // Getter for 'name'
    std::string getName() const;
};

#endif // ACCUMULATOR_HPP
