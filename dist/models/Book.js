"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genre = void 0;
const mongoose_1 = require("mongoose");
// FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY.
var Genre;
(function (Genre) {
    Genre["FICTION"] = "FICTION";
    Genre["NON_FICTION"] = "NON_FICTION";
    Genre["SCIENCE"] = "SCIENCE";
    Genre["HISTORY"] = "HISTORY";
    Genre["BIOGRAPHY"] = "BIOGRAPHY";
    Genre["FANTASY"] = "FANTASY";
})(Genre || (exports.Genre = Genre = {}));
const BookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required.']
    },
    author: {
        type: String,
        required: [true, 'Book author is required.']
    },
    genre: {
        type: String,
        enum: Object.values(Genre),
        required: [true, 'Genre is required.']
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required.'],
        unique: true
    },
    description: {
        type: String
    },
    copies: {
        type: Number,
        required: [true, 'Copies count is required.'],
        min: [0, 'Copies cannot be negative.'],
        validate: {
            validator: Number.isInteger,
            message: 'Copies must be an integer.'
        }
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});
BookSchema.methods.updateAvailability = function () {
    this.available = this.copies > 0;
};
BookSchema.pre('save', function (next) {
    this.available = this.copies > 0;
    next();
});
const Book = (0, mongoose_1.model)("Book", BookSchema);
exports.default = Book;
