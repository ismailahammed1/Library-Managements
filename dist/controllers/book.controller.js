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
exports.deleteBook = exports.updateBook = exports.getABookId = exports.getAllBooks = exports.createBook = void 0;
const Book_1 = __importDefault(require("../models/Book"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = new Book_1.default(req.body);
        yield book.save();
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating book.", error });
    }
});
exports.createBook = createBook;
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "desc", limit = "10", } = req.query;
        const query = filter ? { genre: filter } : {};
        const sortOrder = sort === "asc" ? 1 : -1;
        const books = yield Book_1.default.find(query)
            .sort({ [sortBy]: sortOrder })
            .limit(parseInt(limit));
        res.json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve books",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getAllBooks = getAllBooks;
const getABookId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield Book_1.default.findById(bookId);
        res.json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve book",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getABookId = getABookId;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updateBookData = req.body;
        const book = yield Book_1.default.findByIdAndUpdate(bookId, updateBookData, { new: true, runValidators: true });
        res.status(200).json({
            super: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update book",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteBookData = req.params.bookId;
        const book = yield Book_1.default.findByIdAndDelete(deleteBookData);
        res.status(200).json({
            "success": true,
            "message": "Book deleted successfully",
            "data": null
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete book",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.deleteBook = deleteBook;
