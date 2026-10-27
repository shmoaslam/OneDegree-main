const pool = require("../backend/models/db"); // Assuming your db.js is located here

const queryDatabase = async () => {
    try {
        const [rows, fields] = await pool.query('SHOW TABLES'); // Example query
        // console.log('Tables in the database:', rows);
    } catch (err) {
        console.error('Error querying the database:', err.message);
    } finally {
        pool.end(); // Close the connection pool when done
    }
};

queryDatabase();