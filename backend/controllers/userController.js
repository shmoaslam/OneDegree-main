const { findUserByEmailAndPassword } = require('../models/userModel');

// Handle login request
const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await findUserByEmailAndPassword(email, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.user_id,
                email: user.email,
                name: user.name,
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred' });
    }
};

module.exports = { login };
