import { model, Schema } from "mongoose";

// FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY.
export enum Genre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  SCIENCE = "SCIENCE",
  HISTORY = "HISTORY",
  BIOGRAPHY = "BIOGRAPHY",
  FANTASY = "FANTASY",
}

export interface IBook {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  bookImage: string;
  description?: string;
  copies: number;
  available?: boolean;
}

const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Book title is required."],
    },
    author: {
      type: String,
      required: [true, "Book author is required."],
    },
    genre: {
      type: String,
      enum: Object.values(Genre),
      required: [true, "Genre is required."],
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required."],
      unique: true,
    },
    bookImage: {
      type: String,
      required: [true, "Book image is required."],
      unique: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: [true, "Copies count is required."],
      min: [0, "Copies cannot be negative."],
      validate: {
        validator: Number.isInteger,
        message: "Copies must be an integer.",
      },
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

BookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
};

BookSchema.pre("save", function (next) {
  this.available = this.copies > 0;
  next();
});

const Book = model<IBook>("Book", BookSchema);

export default Book;
