namespace MemoryManager
{
    public class Accumulator
    {
        // Properties
        public string Type { get; private set; }
        public string Name { get; private set; }
        public int Value { get; set; }

        // Constructor
        public Accumulator(string name)
        {
            this.Type = "Accumulator";
            this.Name = name;
            this.Value = 0;
        }

        // Method to reset the value
        public void Reset()
        {
            this.Value = 0;
        }

        // Method to display the value (for debugging or console display)
        public override string ToString()
        {
            return $"{Name} ({Type}) : {Value}";
        }
    }
}
