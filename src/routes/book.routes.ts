import express from 'express';
import { createBook, deleteBook, getABookId, getAllBooks,  updateBook } from '../controllers/book.controller';

const router = express.Router();

router.post('/', createBook);           
router.get('/', getAllBooks);     
router.get('/:bookId', getABookId);   
router.patch('/:bookId', updateBook);   
router.delete('/:bookId', deleteBook);

export default router;
