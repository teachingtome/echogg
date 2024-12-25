import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

let lobbies = new Set();

app.post('/api/lobbies', (req, res) => {
  // Create a new lobby
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Lobby code is required.' });

  lobbies.add(code);
  return res.status(201).json({ success: true, code });
});

app.get('/api/lobbies', (req, res) => {
  // Validate a lobby code
  const { code } = req.query;
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Invalid lobby code.' });
  }

  const exists = lobbies.has(code);
  return res.status(200).json({ exists });
});

//app.use((req, res) => {
//  res.status(405).json({ error: 'Method not allowed.' });
//});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});