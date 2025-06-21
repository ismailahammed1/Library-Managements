import { Request, Response } from "express";
import { Borrow } from '../models/Borrow';
import Book from '../models/Book';
    
    export const borrowBook = async (req: Request, res: Response) => {
        try {
            const { bookId, quantity, dueDate } = req.body;

            // Validate book existence
            const book = await Book.findById(bookId);
            if (!book) {
                return res.status(404).json({ message: 'Book not found.' });
            }

            // Create a new borrow entry
            const borrow = new Borrow({
                book: book._id,
                quantity,
                dueDate
            });

            await borrow.save();
            res.status(201).json(borrow);
        } catch (error) {
            res.status(500).json({ message: 'Error borrowing book.', error });
        }
    }