import { Request, Response } from "express";
import Book from "../models/Book";

const createBook = async (req: Request, res: Response) => {
  try {
    const book = new Book(req.body);

    await book.save();
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating book.", error });
  }
};
const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;

    const query = filter ? { genre: filter } : {};
    const sortOrder = sort === 'asc' ? 1 : -1;
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sortOrder })
      .limit(parseInt(limit as string))
      .select('-__v');

    res.json({
      success: true,
      message: 'Books retrieved successfully',
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve books',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
const getBookById = async (req: Request, res: Response) => {};
const updateBook = async (req: Request, res: Response) => {};
const deleteBook = async (req: Request, res: Response) => {};
export { createBook, getAllBooks, getBookById, updateBook, deleteBook };
