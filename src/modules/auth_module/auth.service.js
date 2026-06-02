import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../../common/config/db.js';


const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

const loginService = async (email, password) => {
    // Login logic here

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid password');
    }

    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return { token, refreshToken };

};

const registerService = async (name, email, password) => {
    // Register logic here
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPassword]);
    const user = result.rows[0];
    return user;
};


export {loginService, registerService};