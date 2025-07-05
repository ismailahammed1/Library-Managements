import { Request, Response } from 'express';
import { Borrow } from '../models/Borrow';
import Book from '../models/Book';

const borrowbook = async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    if (!bookId || !quantity || !dueDate) {
      res.status(400).json({
        success: false,
        message: "Missing required fields: book, quantity, or dueDate",
      });
      return;
    }

    const foundBook = await Book.findById(bookId);
    if (!foundBook) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
      return;
    }

    if (foundBook.copies < quantity) {
      res.status(400).json({
        success: false,
        message: "Not enough copies available",
      });
      return;
    }

    const borrow = await Borrow.create({ book: bookId, quantity, dueDate });

    foundBook.copies -= quantity;
    if (foundBook.copies === 0) {
      foundBook.available = false;
    }
    await foundBook.save();

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error borrowing book',
      error,
    });
  }
};

const getBorrowedBooks = async (req: Request, res: Response) => {
  try {
    const borrows = await Borrow.aggregate([
      {
        $lookup: {
          from: "books", // the MongoDB collection name (should match your Book model collection)
          localField: "book",
          foreignField: "_id",
          as: "bookInfo"
        }
      },
      {
        $unwind: "$bookInfo"
      },
      {
        $project: {
          _id: 1,
          quantity: 1,
          dueDate: 1,
          totalQuantity: 1,
          createdAt: 1,
          updatedAt: 1,
          book: {
            _id: "$bookInfo._id",
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
            bookImage: "$bookInfo.bookImage"
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books retrieved successfully",
      data: borrows
    });
  } catch (error) {
    console.error("Error retrieving borrows:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve borrowed books"
    });
  }
};

export { getBorrowedBooks, borrowbook };
