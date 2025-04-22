const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


const pool = new Pool({
  user: 'postgres',
  password: 's@1998',
  host: 'localhost',
  port: 5432,
  database: 'dashboard_db'
});


app.use(cors());
app.use(bodyParser.json());


app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY file_date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get('/api/user/:username', async (req, res) => {
    const { username } = req.params;
    console.log(req);
    try {
      const result = await pool.query(
        'SELECT username, role, name FROM users WHERE username = $1',
        [username]
      );
  
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
    
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
