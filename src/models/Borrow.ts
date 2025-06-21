import { Schema } from "mongoose";
import mongoose from "mongoose";
import { IBook } from "./Book";

export interface IBorrow {
  book: mongoose.Types.ObjectId | IBook;
  quantity: number;
  dueDate: Date;
}
const BorrowSchema:Schema<IBorrow> = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, 'Book is required.']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required.'],
        min: [1, 'Quantity must be at least 1.'],
        validate: {
        validator: Number.isInteger,
        message: 'Quantity must be an integer.'
        }
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required.']
    }
    }, {
    timestamps: true
})

export const Borrow = mongoose.model<IBorrow>('Borrow', BorrowSchema);
