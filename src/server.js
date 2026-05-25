import express from 'express';
import "dotenv/config";


const app = express();

const PORT = process.env.PORT || 3000;

try {
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
}
 catch (error) {
    console.error('Error starting the server:', error);
}
