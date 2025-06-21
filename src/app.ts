import express from 'express';
import cors from 'cors';
import bookRoutes from './routes/book.routes';
import errorHandler from './middleware/errorHandler';
// import borrowRoutes from './routes/borrow.routes'; // Later
const app = express();

app.use(cors());
app.use(express.json()); 



app.use('/api/books', bookRoutes);
// app.use('/api/borrows', borrowRoutes); // Later

app.use(errorHandler);

export default app;
