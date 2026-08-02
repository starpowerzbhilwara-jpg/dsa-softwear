const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Static Files Serving: Root aur Public dono folder ko serve karega
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

// Sample Route / Test API
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is healthy' });
});

// All Routes Handler (Fallback to index.html)
app.get('*', (req, res) => {
  const publicIndexPath = path.join(__dirname, 'public', 'index.html');
  const rootIndexPath = path.join(__dirname, 'index.html');

  // Pehle check karega ki public/index.html hai ya nahi, nahi toh root wala index.html serve karega
  if (fs.existsSync(publicIndexPath)) {
    res.sendFile(publicIndexPath);
  } else if (fs.existsSync(rootIndexPath)) {
    res.sendFile(rootIndexPath);
  } else {
    res.status(404).send('index.html file not found on server!');
  }
});

// Render Dynamic Port Binding
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});