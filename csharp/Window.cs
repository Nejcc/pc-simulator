using System;
using System.Windows.Forms;

namespace MemoryManagerApp
{
    public partial class Window : Form
    {
        private MemoryManager _memoryManager;

        public Form1()
        {
            InitializeComponent();
            _memoryManager = new MemoryManager();
            RefreshAccumulators();
        }

        private void RefreshAccumulators()
        {
            lstAccumulators.Items.Clear();
            foreach (var accumulator in _memoryManager.Ram)
            {
                lstAccumulators.Items.Add($"{accumulator.Key}: {accumulator.Value.Value}");
            }
        }

        private void btnExecute_Click(object sender, EventArgs e)
        {
            string command = txtCommand.Text.Trim();
            if (!string.IsNullOrEmpty(command))
            {
                string result = _memoryManager.ExecuteCommand(command);
                MessageBox.Show(result);
                RefreshAccumulators();
            }
        }
    }
}
