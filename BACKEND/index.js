const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const path = require('path');




const app =express();

app.use(express.json());  // For parsing application/json
app.use(express.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded
app.use(cors());

// Serve static files from the Vite build folder
app.use(express.static(path.join(__dirname, 'dist','index.html')));




const config = {
    user: "sa", // SQL Server username
    password: "1234", // SQL Server password
    server: "ANJANI/SQLEXPRESS", // SQL Server hostname or IP
    database: "ANJANI", // Database name
    port: 1433,// Default SQL Server port
    options: {
        trustServerCertificate: true, // Skip SSL validation
        enableArithAbort: true ,// Enable arithmetic error handling
        trustedConnection: false, // Use SQL Server Authentication
        encrypt: false // Disable encryption if server does not support it
    } 
};

async function connectToDatabase() {
    try {
        const pool = await sql.connect(config);
        console.log("Connected to the database!");
        // Execute queries
        await pool.close(); // Close connection when done
    } catch (err) {
        console.error("Database connection failed:", err.message);
    }
}

connectToDatabase();


// GetDAta ---------------------------------------------

app.get('/sa',async(req,res)=>{
    try {
        const pool = await sql.connect(config);
        const data = pool.request().query('select * from ANJANI ORDER BY id  DESC');
        data.then(res1=>{
            return res.json(res1);
        })
    } catch (err) {
        console.log(err);
    }
})
//  POST API
app.post('/CreateUser', async (req, res) => {
    try {
      const { name, email, age } = req.body;  // Destructure the incoming request body
  
      if (!name || !email || !age) {
        return res.status(400).json({ error: 'Name, email, and age are required!' });
      }
  
      // Assuming you're using SQL Server and already have the pool configured
      const pool = await sql.connect(config);
  
      // Insert the data into your database
      await pool.request()
        .input('name', sql.NVarChar, name)
        .input('email', sql.NVarChar, email)
        .input('age', sql.Int, age)
        .query('INSERT INTO anjani (name, email, age) VALUES (@name, @email, @age)');
  
      return res.status(200).json({ message: 'User created successfully!' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to create user' });
    }
  });
 // Fetch user by ID
app.get('/getUser/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM ANJANI WHERE id = @id');
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(result.recordset[0]);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user data' });
    }
  });
  // Update user by ID
app.put('/UpdateUser/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
  
    if (!name || !email || !age) {
      return res.status(400).json({ error: 'All fields (name, email, age) are required' });
    }
  
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('id', sql.Int, id)
        .input('name', sql.NVarChar, name)
        .input('email', sql.NVarChar, email)
        .input('age', sql.Int, age)
        .query(
          `UPDATE ANJANI
           SET name = @name, email = @email, age = @age 
           WHERE id = @id`
        );
  
      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  });
  app.delete("/Delete/:id", async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
  
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input("id", sql.Int, id) // Bind the ID as a parameter
        .query("DELETE FROM ANJANI WHERE id = @id"); // SQL query
  
      if (result.rowsAffected[0] > 0) {
        res.status(200).json({ message: "Item deleted successfully" });
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      res.status(500).json({ error: "Failed to delete item" });
    }
  });
  // // Catch-all route to serve index.html for all SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(3000,()=>{
    console.log("The Server Has Started !");
});
