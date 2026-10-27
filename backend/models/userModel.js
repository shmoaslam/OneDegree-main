const pool = require('./db');

// Check if user exists with the provided email and password_hash
const findUserByEmailAndPassword = async (email, password) => {
    const query = `SELECT * FROM users WHERE email = ? AND password_hash = ?;`;
    const [rows] = await pool.query(query, [email, password]);
    return rows[0]; // return the user data if found, otherwise undefined
};

module.exports = { findUserByEmailAndPassword };
 