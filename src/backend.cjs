const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

const dataFilePath = path.join(__dirname, 'data.txt');

// Asynchronous function to write data to a text file
async function writeData(pseudo, email, score) {
  const dataLine = `Pseudo: ${pseudo}, Email: ${email}, Score: ${score}\n`;
  try {
    await fs.promises.appendFile(dataFilePath, dataLine, 'utf8');
  } catch (err) {
    throw err;
  }
}

// Function to read data from a text file and return as JSON
function readData() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const lines = data.trim().split('\n');
    return lines.map((line) => {
      const [pseudo, email, score] = line
        .split(', ')
        .map((item) => item.split(': ')[1]);
      return { pseudo, email, score: Number(score) };
    });
  } catch (err) {
    throw err;
  }
}

app.options('/score', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers'
  );
  res.end();
});
// POST endpoint to write data
app.post('/score', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers'
  );
  try {
    const { pseudo, email, score } = req.body;
    await writeData(pseudo, email, score);
    setTimeout(() => {
      res.status(200).send('Data written successfully');
    }, 2000);
    if (pseudo === 'jeannot') {
      throw Error('Error writing data');
    }
  } catch (err) {
    res.status(500).send('Error writing data');
  }
});

// GET endpoint to read data
app.get('/score', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers'
  );
  try {
    const data = readData();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send('Error reading data');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
