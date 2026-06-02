import jwt from 'jsonwebtoken';
import pool from '../../common/config/db.js';

const auth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No valid token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id;
        console.log('decoded id:', id);
        const result = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
        console.log('user data:', result.rows[0]);
        req.user = result.rows[0];
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export { auth };