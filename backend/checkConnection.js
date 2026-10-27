// const pool = require("../backend/models/db"); // Assuming your db configuration is in `db.js`

// const checkConnection = async () => {
//     try {
//         const client = await pool.connect();
//         console.log("Database connected successfully!");
//         client.release();
//     } catch (err) {
//         console.error("Error connecting to the database:", err.message);
//     } finally {
//         pool.end(); // Close the pool when done
//     }
// };

// checkConnection();

const pool = require("../backend/models/db"); // Assuming your db.js is located here

const checkConnection = async () => {
    let connection;
    try {
        connection = await pool.getConnection(); // Get a connection from the pool
        // console.log("Database connected successfully!");
    } catch (err) {
        console.error("Error connecting to the database:", err.message);
    } finally {
        if (connection) connection.release(); // Release the connection back to the pool
    }
};


checkConnection();

