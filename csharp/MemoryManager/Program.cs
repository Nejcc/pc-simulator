using System;
using System.Collections.Generic;

namespace MemoryManager
{
    class Program
    {
        // Initialize ROM
        static List<string> rom = new List<string>();

        // Initialize RAM with accumulators
        static Dictionary<int, Dictionary<string, dynamic>> ram = new Dictionary<int, Dictionary<string, dynamic>>
        {
            {0, new Dictionary<string, dynamic> {{"type", "Accumulator"}, {"name", "A"}, {"value", 0}}},
            {1, new Dictionary<string, dynamic> {{"type", "Accumulator"}, {"name", "B"}, {"value", 0}}},
            // Add more accumulators as needed
        };

        static int programCounter = 0;

        static void Main(string[] args)
        {
            // Function to populate RAM values in the console
            PopulateRamValues();

            string command;
            do
            {
                Console.WriteLine("Enter a command or 'exit' to quit:");
                command = Console.ReadLine().Trim();
                if (command != "exit")
                {
                    string result = ExecuteCommand(command);
                    Console.WriteLine(result);
                }
            } while (command != "exit");
        }

        static void PopulateRamValues()
        {
            Console.WriteLine("RAM Values:");
            foreach (var entry in ram)
            {
                Console.WriteLine($"Address {entry.Key}: {entry.Value["value"]}");
            }
            Console.WriteLine();
        }

        static string ExecuteCommand(string command)
        {
            string[] args = command.Split(' ');
            string result;

            switch (args[0].ToLower())
            {
                case "store":
                    if (args.Length == 3)
                    {
                        int index = int.Parse(args[2]);
                        string data = args[1].Replace(",", "");
                        if (rom.Count > index)
                        {
                            rom[index] = data;
                        }
                        else
                        {
                            while (rom.Count <= index)
                            {
                                rom.Add(null);
                            }
                            rom[index] = data;
                        }
                        programCounter++;
                        result = $"Stored '{data}' in ROM[{index}]";
                    }
                    else
                    {
                        result = "Invalid arguments for 'store'";
                    }
                    break;

                case "load":
                    if (args.Length == 3)
                    {
                        int romIndex = int.Parse(args[1]);
                        int ramIndex = int.Parse(args[2]);
                        if (rom.Count > romIndex && rom[romIndex] != null)
                        {
                            if (ram.ContainsKey(ramIndex) && ram[ramIndex]["type"] == "Accumulator")
                            {
                                ram[ramIndex]["value"] = rom[romIndex];
                                programCounter++;
                                result = $"Loaded '{rom[romIndex]}' from ROM[{romIndex}] to {ram[ramIndex]["name"]}";
                            }
                            else
                            {
                                result = $"Invalid accumulator index: {args[2]}";
                            }
                        }
                        else
                        {
                            result = $"ROM[{romIndex}] is empty";
                        }
                    }
                    else
                    {
                        result = "Invalid arguments for 'load'";
                    }
                    break;

                case "set":
                    if (args.Length == 3)
                    {
                        int index = int.Parse(args[1]);
                        int value = int.Parse(args[2]);
                        if (ram.ContainsKey(index) && ram[index]["type"] == "Accumulator")
                        {
                            ram[index]["value"] = value;
                            programCounter++;
                            result = $"Set {ram[index]["name"]} to {value}";
                        }
                        else
                        {
                            result = $"Invalid accumulator index: {args[1]}";
                        }
                    }
                    else
                    {
                        result = "Invalid arguments for 'set'";
                    }
                    break;

                // Implement additional cases as needed

                default:
                    result = "Invalid command";
                    break;
            }

            // Update RAM values in the console after each command
            PopulateRamValues();
            return result;
        }

    }
}
