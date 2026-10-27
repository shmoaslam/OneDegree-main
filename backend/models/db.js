const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "148.66.155.235", // Replace with your server's IP or hostname
  user: "onedegreeadmin_postgres", // Use the database username displayed
  password: "Consistency@2024", // Replace with the correct password
  database: "onedegreeadmin_onedegreeeyewear_one_degree_table", // The database name
  port: 3306, // Default MySQL port
});

// Function to check database connection
const checkDBConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully!");
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
};

// Call the function to test the connection
checkDBConnection();

module.exports = pool;
