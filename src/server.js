import express from 'express';
import "dotenv/config";
import cookieParser from 'cookie-parser';
import path from 'path';
import authRoutes from './modules/auth_module/auth.routes.js';

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Mount API routes
app.use('/api/auth', authRoutes);

// Serve static frontend from /client
app.use(express.static(path.join(process.cwd(), 'client')));

try {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.error('Error starting the server:', error);
}
