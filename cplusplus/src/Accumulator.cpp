#include "Accumulator.hpp"

Accumulator::Accumulator() : type("Accumulator"), name("Unnamed"), value(0) {}

Accumulator::Accumulator(const std::string& type, const std::string& name, int value) : type(type), name(name), value(value) {}

int Accumulator::getValue() const {
    return value;
}

void Accumulator::setValue(int value) {
    this->value = value;
}

std::string Accumulator::getName() const {
    return name;
}
