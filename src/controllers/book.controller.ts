import { Request, Response } from "express";
import Book from "../models/Book";

const createBook = async (req: Request, res: Response) => {
  try {
    const book = new Book(req.body);

    await book.save();
    res
      .status(201)
      .json({
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
        
    } catch (error) {
        
    }
};
const getBookById = async (req: Request, res: Response) => {};
const updateBook = async (req: Request, res: Response) => {};
const deleteBook = async (req: Request, res: Response) => {};
export { createBook, getAllBooks, getBookById, updateBook, deleteBook };
