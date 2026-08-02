const express = require('express');
const cors = require('cors');
const path = require('path'); // 1. Path module add kiya

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 2. Static files serve karne ke liye public folder link kiya
app.use(express.static(path.join(__dirname, 'public')));

// Sample Route / Test API
// Note: Agar public/index.html majood hai, to browser '/' par usi index.html ko dikhayega
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is healthy' });
});

// 3. Baaki sabhi routes par index.html serve karne ke liye (Frontend Routing Ke Liye)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Render Dynamic Port Binding
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});