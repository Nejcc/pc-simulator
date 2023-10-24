using System;
using System.Collections.Generic;

namespace MemoryManager
{
    public class MemoryManager
    {
        // ROM and RAM data structures
        public List<string> Rom { get; private set; }
        public Dictionary<int, Accumulator> Ram { get; private set; }
        public Dictionary<string, List<string>> Functions { get; private set; }

        // Constructor
        public MemoryManager()
        {
            Rom = new List<string>();
            Ram = new Dictionary<int, Accumulator>
            {
                {0, new Accumulator("A")},
                {1, new Accumulator("B")},
                {2, new Accumulator("LR")},
                {3, new Accumulator("EB")},
                {4, new Accumulator("PC")},
                {5, new Accumulator("BB")},
                {6, new Accumulator("0")},
                {7, new Accumulator("WD")}
            };
            Functions = new Dictionary<string, List<string>>();
        }

        // Method to execute a command
        public string ExecuteCommand(string command)
        {
            string[] args = command.Split(' ');

            switch (args[0].ToLower())
            {
                case "store":
                    if (args.Length == 3)
                    {
                        int index = int.Parse(args[2]);
                        string data = args[1].Replace(",", ""); // Remove trailing comma, if any
                        if (index >= 0 && index < Rom.Count)
                        {
                            Rom[index] = data;
                        }
                        else if (index == Rom.Count)
                        {
                            Rom.Add(data);
                        }
                        else
                        {
                            return $"Invalid ROM index: {index}";
                        }

                        // Increment the program counter
                        Ram[4].Value++;
                        return $"Stored '{data}' in ROM[{index}]";
                    }
                    break;

                case "load":
                    //  'load' logic here
                    break;

                case "set":
                    //  'set' logic here
                    break;

                case "add":
                    //  'add' logic here
                    break;

                case "subtract":
                    //  'subtract' logic here
                    break;

                case "multiply":
                    //  'multiply' logic here
                    break;

                case "divide":
                    //  'divide' logic here
                    break;

                case "exchange":
                    //  'exchange' logic here
                    break;

                case "define":
                    //  'define' logic here
                    break;

                case "loop":
                    //  'loop' logic here
                    break;

                default:
                    return "Invalid command";
            }

            return "Command executed";
        }

        // Additional methods like 'DefineFunction', 'ExecuteLoop' etc.
    }
}
