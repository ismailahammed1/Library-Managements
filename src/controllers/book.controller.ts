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
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "10",
    } = req.query;

    const query = filter ? { genre: filter } : {};
    const sortOrder = sort === "asc" ? 1 : -1;
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sortOrder })
      .limit(parseInt(limit as string))

    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getABookId = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    
    res.json({
      success: true,
      message: "Book retrieved successfully", 
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve book",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};



const updateBook = async (req: Request, res: Response) => {
  try {
     const bookId  = req.params.bookId;

     const updateBookData=req.body;


     
    const book = await Book.findByIdAndUpdate(bookId,updateBookData,{new: true, runValidators: true});
    res.status(200).json({
      super: true,
      message: "Book updated successfully", 
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update book",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

const deleteBook = async (req: Request, res: Response) => {
try {
   const  deleteBookData=req.params.bookId;
  const book=await Book.findByIdAndDelete(deleteBookData);
 
    res.status(200).json({
  "success": true,
  "message": "Book deleted successfully",
  "data": null
    }); 
} catch (error) {
  res.status(500).json({
    success: false,
    message: "Failed to delete book",
    error: error instanceof Error ? error.message : "Unknown error",
  });
} 
};
export { createBook, getAllBooks, getABookId, updateBook, deleteBook };
