"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowbook = exports.getBorrowedBooks = void 0;
const Borrow_1 = require("../models/Borrow");
const Book_1 = __importDefault(require("../models/Book"));
const borrowbook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        if (!bookId || !quantity || !dueDate) {
            res.status(400).json({
                success: false,
                message: "Missing required fields: book, quantity, or dueDate",
            });
            return;
        }
        const foundBook = yield Book_1.default.findById(bookId);
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
        const borrow = yield Borrow_1.Borrow.create({ book: bookId, quantity, dueDate });
        foundBook.copies -= quantity;
        if (foundBook.copies === 0) {
            foundBook.available = false;
        }
        yield foundBook.save();
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error borrowing book',
            error,
        });
    }
});
exports.borrowbook = borrowbook;
const getBorrowedBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getBookBorrows = yield Borrow_1.Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' }
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo'
                }
            },
            {
                $unwind: '$bookInfo'
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: '$bookInfo.title',
                        isbn: '$bookInfo.isbn'
                    },
                    totalQuantity: 1,
                }
            }
        ]);
        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: getBookBorrows
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving borrowed books summary',
            error
        });
    }
});
exports.getBorrowedBooks = getBorrowedBooks;
