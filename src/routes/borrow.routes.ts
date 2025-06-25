import express from 'express';
import { borrowbook, getBorrowedBooks } from '../controllers/borrow.controller';

const router = express.Router();

router.post('/', borrowbook ); 
router.get('/', getBorrowedBooks); 



export default router;
